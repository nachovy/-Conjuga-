/* =====================================================
   ¡Conjuga! — Application Logic & Interactive Engine
   ===================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'conjuga_app_state_v1';

  // -------------------- Persistent State --------------------
  function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function loadPersisted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) throw new Error('empty');
      const parsed = JSON.parse(raw);
      if (parsed.todayKey !== getTodayKey()) {
        parsed.todayKey = getTodayKey();
        parsed.todayCount = 0;
      }
      return {
        todayKey: parsed.todayKey || getTodayKey(),
        todayCount: parsed.todayCount || 0,
        bestStreak: parsed.bestStreak || 0,
        totalAnswered: parsed.totalAnswered || 0,
        totalCorrect: parsed.totalCorrect || 0,
        mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : []
      };
    } catch {
      return {
        todayKey: getTodayKey(),
        todayCount: 0,
        bestStreak: 0,
        totalAnswered: 0,
        totalCorrect: 0,
        mistakes: []
      };
    }
  }

  let persisted = loadPersisted();

  function savePersisted() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
    } catch {
      // Ignore storage quota errors
    }
  }

  // -------------------- App Config & Session State --------------------
  const config = {
    mode: 'mixed', // 'mixed' | 'sentence' | 'direct'
    tenses: ['presente'],
    verbScope: 'common', // 'common' | 'all'
    category: 'all', // 'all' | 'regular' | 'stem' | 'irregular' | 'reflexive'
    inputMode: 'typing', // 'typing' | 'choice'
    count: 12,
    showTranslation: true,
    strictAccent: false
  };

  let session = {
    active: false,
    isMistakeSession: false,
    questions: [],
    index: 0,
    answered: false,
    correctCount: 0,
    streak: 0,
    maxStreak: 0,
    wrongItems: [],
    showTransOverride: null,
    currentChoices: []
  };

  let refState = {
    search: '',
    scope: 'all',
    tense: 'presente',
    category: 'all'
  };

  // -------------------- DOM References --------------------
  const $ = (id) => document.getElementById(id);

  const views = {
    home: $('viewHome'),
    practice: $('viewPractice'),
    summary: $('viewSummary'),
    reference: $('viewReference'),
    mistakes: $('viewMistakes')
  };

  // -------------------- Utility Functions --------------------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function stripAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function normalizeInput(str) {
    return str.trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  let toastTimer = null;
  function showToast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.classList.remove('show');
    }, 2400);
  }

  function speakSpanish(text) {
    if (!('speechSynthesis' in window)) {
      showToast('当前浏览器不支持语音朗读');
      return;
    }
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'es-ES';
      utter.rate = 0.88;
      const voices = window.speechSynthesis.getVoices();
      const esVoice =
        voices.find((v) => v.lang === 'es-ES') ||
        voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('es'));
      if (esVoice) utter.voice = esVoice;
      window.speechSynthesis.speak(utter);
    } catch {
      showToast('无法播放语音');
    }
  }

  // -------------------- View Switching --------------------
  function switchView(name) {
    Object.entries(views).forEach(([k, el]) => {
      el.classList.toggle('active', k === name);
    });
    document.querySelectorAll('.nav-pill').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.view === name);
    });

    if (name === 'home') {
      renderHomeStats();
      updatePoolSummary();
    } else if (name === 'reference') {
      renderReferenceView();
    } else if (name === 'mistakes') {
      renderMistakesView();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // -------------------- Home Stats & Pool Summary --------------------
  function renderHomeStats() {
    $('statToday').textContent = persisted.todayCount;
    $('statStreak').textContent = persisted.bestStreak;
    $('statAccuracy').textContent =
      persisted.totalAnswered > 0
        ? `${Math.round((persisted.totalCorrect / persisted.totalAnswered) * 100)}%`
        : '--';

    const badge = $('mistakeCountBadge');
    const count = persisted.mistakes.length;
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  function verbMatchesScope(verb, scope) {
    return scope === 'all' || verb.tier === 'common';
  }

  function updateScopeOptionLabels() {
    const allVerbs = Object.values(VERBS);
    const commonCount = allVerbs.filter((v) => v.tier === 'common').length;
    $('scopeCommonCount').textContent = `${commonCount} 个 A1 核心高频词`;
    $('scopeAllCount').textContent = `${allVerbs.length} 个全量进阶词库`;
  }

  function getMatchingSentences() {
    return SENTENCES.filter((s) => {
      const verb = VERBS[s.verb];
      if (!verb) return false;
      const scopeMatch = verbMatchesScope(verb, config.verbScope);
      const tenseMatch = config.tenses.includes(s.tense);
      const catMatch = config.category === 'all' || verb.category === config.category;
      return scopeMatch && tenseMatch && catMatch;
    });
  }

  function getMatchingVerbs() {
    return Object.values(VERBS).filter(
      (v) =>
        verbMatchesScope(v, config.verbScope) &&
        (config.category === 'all' || v.category === config.category)
    );
  }

  function updatePoolSummary() {
    const sentences = getMatchingSentences();
    const verbs = getMatchingVerbs();
    const directCount = verbs.length * config.tenses.length * 6;
    const scopeName = config.verbScope === 'common' ? '常用动词' : '大量动词';
    const summaryEl = $('poolSummary');

    if (config.mode === 'sentence') {
      summaryEl.innerHTML = `【${scopeName}】当前匹配 <strong>${verbs.length}</strong> 个动词、<strong>${sentences.length}</strong> 道地道句子填空题`;
    } else if (config.mode === 'direct') {
      summaryEl.innerHTML = `【${scopeName}】当前覆盖 <strong>${verbs.length}</strong> 个动词，共 <strong>${directCount}</strong> 个变位速问组合`;
    } else {
      summaryEl.innerHTML = `【${scopeName}】覆盖 <strong>${verbs.length}</strong> 个动词（<strong>${sentences.length}</strong> 道填空 + <strong>${directCount}</strong> 项速问）`;
    }
  }

  // -------------------- Question Builders --------------------
  function makeSentenceQuestion(s) {
    const verbObj = VERBS[s.verb];
    const answer = verbObj.conjugations[s.tense][s.personIndex];
    return {
      key: `sent:${s.id}`,
      type: 'sentence',
      sentenceId: s.id,
      verb: s.verb,
      tense: s.tense,
      personIndex: s.personIndex,
      sentence: s.sentence,
      zh: s.zh,
      subjectHint: s.subjectHint,
      note: s.note,
      answer
    };
  }

  function makeDirectQuestion(verbKey, tense, personIndex) {
    const verbObj = VERBS[verbKey];
    const answer = verbObj.conjugations[tense][personIndex];
    const person = PERSONS[personIndex];
    const tenseInfo = TENSE_META[tense];
    return {
      key: `dir:${verbKey}:${tense}:${personIndex}`,
      type: 'direct',
      verb: verbKey,
      tense,
      personIndex,
      note: `${verbObj.infinitive}（${verbObj.meaning}）在${tenseInfo.nameZh}中对应 ${person.label} 为 ${answer}。${verbObj.tip}`,
      answer
    };
  }

  function buildQuestionQueue() {
    const targetCount = config.count;
    const matchedSentences = shuffle(getMatchingSentences());
    const matchedVerbs = getMatchingVerbs();

    // Weighted person pool (slightly fewer vosotros for beginners, still represented)
    const weightedPersons = [0, 0, 1, 1, 2, 2, 3, 3, 4, 5, 5];

    const pickDirectQuestions = (needed, existingKeys) => {
      const list = [];
      let guard = 0;
      while (list.length < needed && guard < 400) {
        guard++;
        const v = matchedVerbs[Math.floor(Math.random() * matchedVerbs.length)];
        const t = config.tenses[Math.floor(Math.random() * config.tenses.length)];
        const p = weightedPersons[Math.floor(Math.random() * weightedPersons.length)];
        const key = `dir:${v.infinitive}:${t}:${p}`;
        if (!existingKeys.has(key)) {
          existingKeys.add(key);
          list.push(makeDirectQuestion(v.infinitive, t, p));
        }
      }
      return list;
    };

    if (config.mode === 'sentence') {
      return matchedSentences.slice(0, targetCount).map(makeSentenceQuestion);
    }

    if (config.mode === 'direct') {
      return pickDirectQuestions(targetCount, new Set());
    }

    // Mixed mode: ~75% sentence fill-in-the-blank + ~25% direct conjugation
    const desiredSentences = Math.max(1, Math.round(targetCount * 0.75));
    const chosenSentences = matchedSentences
      .slice(0, Math.min(desiredSentences, matchedSentences.length))
      .map(makeSentenceQuestion);

    const remaining = Math.max(1, targetCount - chosenSentences.length);
    const usedKeys = new Set(
      chosenSentences.map((q) => `dir:${q.verb}:${q.tense}:${q.personIndex}`)
    );
    const chosenDirect = pickDirectQuestions(remaining, usedKeys);

    // Interleave nicely so direct questions are spaced among sentence questions
    return shuffle([...chosenSentences, ...chosenDirect]);
  }

  function generateDistractors(question) {
    const verbObj = VERBS[question.verb];
    const correct = question.answer;
    const candidates = new Set();

    // 1. Other persons of the same verb in the same tense (most educational distractors!)
    const sameTenseForms = verbObj.conjugations[question.tense];
    shuffle(sameTenseForms).forEach((f) => {
      if (f !== correct) candidates.add(f);
    });

    // 2. Same person in other tenses (if we need more)
    Object.keys(verbObj.conjugations).forEach((t) => {
      if (t !== question.tense) {
        const form = verbObj.conjugations[t][question.personIndex];
        if (form !== correct) candidates.add(form);
      }
    });

    const distractors = Array.from(candidates).slice(0, 3);
    return shuffle([correct, ...distractors]);
  }

  // -------------------- Start & Render Session --------------------
  function startSession(customQuestions = null, isMistakeSession = false) {
    const queue = customQuestions || buildQuestionQueue();
    if (!queue.length) {
      showToast('当前筛选条件下暂无题目，请放宽时态或动词范围');
      return;
    }

    session = {
      active: true,
      isMistakeSession,
      questions: queue,
      index: 0,
      answered: false,
      correctCount: 0,
      streak: 0,
      maxStreak: 0,
      wrongItems: [],
      showTransOverride: null,
      currentChoices: []
    };

    switchView('practice');
    syncSessionModeButton();
    renderCurrentQuestion();
  }

  function syncSessionModeButton() {
    const isTyping = config.inputMode === 'typing';
    $('sessionModeIcon').textContent = isTyping ? '🔘' : '⌨️';
    $('sessionModeLabel').textContent = isTyping ? '切为选择' : '切为拼写';
  }

  function renderCurrentQuestion() {
    const q = session.questions[session.index];
    const verbObj = VERBS[q.verb];
    const tenseInfo = TENSE_META[q.tense];
    const person = PERSONS[q.personIndex];

    session.answered = false;
    session.showTransOverride = null;

    // Progress bar
    const total = session.questions.length;
    $('progressText').textContent = `第 ${session.index + 1} / ${total} 题`;
    $('progressFill').style.width = `${(session.index / total) * 100}%`;
    $('liveStreakPill').textContent = `🔥 连对 ${session.streak}`;

    // Badges
    const typeBadge = $('qTypeBadge');
    if (q.type === 'sentence') {
      typeBadge.textContent = '句子填空';
      typeBadge.classList.remove('direct');
    } else {
      typeBadge.textContent = '变位速问';
      typeBadge.classList.add('direct');
    }
    $('qTenseBadge').textContent = `${tenseInfo.nameZh} · ${tenseInfo.nameEs}`;
    $('qCatBadge').textContent = verbObj.badge;

    // Prompt blocks
    const sentBlock = $('sentencePromptBlock');
    const directBlock = $('directPromptBlock');
    const toggleTransBtn = $('btnToggleTransInCard');

    if (q.type === 'sentence') {
      sentBlock.hidden = false;
      directBlock.hidden = true;
      toggleTransBtn.hidden = false;

      const htmlSentence = escapeHtml(q.sentence).replace(
        '___',
        '<span class="sentence-blank" id="inlineBlank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
      );
      $('sentenceDisplay').innerHTML = htmlSentence;
      $('cueInfinitive').textContent = verbObj.infinitive;
      $('cueMeaning').textContent = verbObj.meaning;
      $('cueSubject').textContent = q.subjectHint || '';

      updateTranslationVisibility(q);
    } else {
      sentBlock.hidden = true;
      directBlock.hidden = false;
      toggleTransBtn.hidden = true;

      $('directInfinitive').textContent = verbObj.infinitive;
      $('directMeaning').textContent = verbObj.meaning;
      $('directPerson').textContent = person.label;
      $('directPersonCn').textContent = `（${person.cn}）`;
      $('directTenseSub').textContent = `${tenseInfo.nameZh} · ${tenseInfo.nameEs}`;
    }

    // Reset hint & feedback
    $('hintBox').hidden = true;
    $('hintBox').textContent = '';
    $('feedbackPanel').hidden = true;
    $('feedbackPanel').classList.remove('is-correct', 'is-wrong');
    $('paradigmDetails').open = false;

    // Render answer area
    renderAnswerInputArea(q);
  }

  function updateTranslationVisibility(q) {
    const show =
      session.showTransOverride !== null ? session.showTransOverride : config.showTranslation;
    const transEl = $('sentenceTranslation');
    const btn = $('btnToggleTransInCard');
    if (show) {
      transEl.textContent = `“${q.zh}”`;
      transEl.hidden = false;
      btn.textContent = '👁️ 隐藏译文';
    } else {
      transEl.hidden = true;
      btn.textContent = '👁️ 显示译文';
    }
  }

  function renderAnswerInputArea(q) {
    const typingArea = $('typingArea');
    const choiceArea = $('choiceArea');
    const inputEl = $('answerInput');
    const submitBtn = $('btnSubmitAnswer');

    if (config.inputMode === 'typing') {
      typingArea.hidden = false;
      choiceArea.hidden = true;
      inputEl.value = '';
      inputEl.disabled = false;
      submitBtn.disabled = false;
      inputEl.classList.remove('is-correct', 'is-wrong');
      setTimeout(() => inputEl.focus(), 40);
    } else {
      typingArea.hidden = true;
      choiceArea.hidden = false;
      session.currentChoices = generateDistractors(q);
      const grid = $('choiceGrid');
      grid.innerHTML = session.currentChoices
        .map(
          (opt, idx) => `
          <button type="button" class="choice-btn" data-choice-idx="${idx}" data-value="${escapeHtml(opt)}">
            <span class="choice-key">${idx + 1}</span>
            <span>${escapeHtml(opt)}</span>
          </button>
        `
        )
        .join('');
    }
  }

  // -------------------- Checking Answers --------------------
  function evaluateAnswer(userRaw) {
    if (session.answered) return;
    const q = session.questions[session.index];
    const cleaned = normalizeInput(userRaw);
    if (!cleaned) {
      showToast('请先输入你的答案哦');
      $('answerInput').focus();
      return;
    }

    const expected = normalizeInput(q.answer);
    const exactMatch = cleaned === expected;
    const accentFreeMatch = stripAccents(cleaned) === stripAccents(expected);

    let isCorrect = false;
    let accentWarning = false;

    if (exactMatch) {
      isCorrect = true;
    } else if (accentFreeMatch && !config.strictAccent) {
      isCorrect = true;
      accentWarning = true;
    } else {
      isCorrect = false;
    }

    session.answered = true;
    persisted.todayCount += 1;
    persisted.totalAnswered += 1;

    if (isCorrect) {
      session.correctCount += 1;
      session.streak += 1;
      if (session.streak > session.maxStreak) session.maxStreak = session.streak;
      if (session.streak > persisted.bestStreak) persisted.bestStreak = session.streak;
      persisted.totalCorrect += 1;

      // If practicing from Mistake Notebook, remove mastered item
      if (session.isMistakeSession) {
        removeMistakeByKey(q.key);
      }
    } else {
      session.streak = 0;
      session.wrongItems.push({ question: q, userAnswer: userRaw.trim() });
      recordMistake(q);
    }

    savePersisted();
    renderHomeStats();

    // Visual update on progress & streak
    $('liveStreakPill').textContent = `🔥 连对 ${session.streak}`;
    $('progressFill').style.width = `${((session.index + 1) / session.questions.length) * 100}%`;

    // Update inline blank in sentence
    const blank = $('inlineBlank');
    if (blank) {
      blank.textContent = q.answer;
      blank.classList.add(isCorrect ? 'filled-correct' : 'filled-wrong');
    }

    // Update typing or choice controls
    if (config.inputMode === 'typing') {
      const inputEl = $('answerInput');
      inputEl.disabled = true;
      $('btnSubmitAnswer').disabled = true;
      inputEl.classList.add(isCorrect ? 'is-correct' : 'is-wrong');
    } else {
      document.querySelectorAll('.choice-btn').forEach((btn) => {
        btn.disabled = true;
        const val = normalizeInput(btn.dataset.value);
        if (val === expected) {
          btn.classList.add('correct');
        } else if (val === cleaned && !isCorrect) {
          btn.classList.add('wrong');
        }
      });
    }

    // Gentle shake card on wrong
    if (!isCorrect) {
      const card = $('questionCard');
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
    }

    renderFeedback(q, isCorrect, accentWarning, accentFreeMatch && config.strictAccent);
  }

  function renderFeedback(q, isCorrect, accentWarning, strictAccentFail) {
    const panel = $('feedbackPanel');
    const verbObj = VERBS[q.verb];
    const tenseInfo = TENSE_META[q.tense];

    panel.hidden = false;
    panel.classList.toggle('is-correct', isCorrect);
    panel.classList.toggle('is-wrong', !isCorrect);

    $('feedbackIcon').textContent = isCorrect ? '✓' : '✕';

    if (isCorrect && accentWarning) {
      $('feedbackTitle').textContent = '回答正确！（注意重音符号）';
      $('feedbackSubtitle').innerHTML = `标准写法为 <strong>${escapeHtml(q.answer)}</strong>，记得加上重音符号哦`;
    } else if (isCorrect) {
      const cheers = ['¡Muy bien! 回答正确', '¡Exacto! 完全正确', '¡Genial! 变位精准', '¡Perfecto! 漂亮'];
      $('feedbackTitle').textContent = cheers[session.index % cheers.length];
      $('feedbackSubtitle').innerHTML = `${verbObj.infinitive}（${PERSONS[q.personIndex].short}）→ <strong>${escapeHtml(q.answer)}</strong>`;
    } else if (strictAccentFail) {
      $('feedbackTitle').textContent = '差一点点！重音符号有误';
      $('feedbackSubtitle').innerHTML = `正确答案是 <strong>${escapeHtml(q.answer)}</strong>（已自动加入错题本）`;
    } else {
      $('feedbackTitle').textContent = '没关系，记住这次变位！';
      $('feedbackSubtitle').innerHTML = `正确答案是 <strong>${escapeHtml(q.answer)}</strong>（已自动加入错题本）`;
    }

    // Full sentence display
    const fbSentBox = $('feedbackSentenceBox');
    if (q.type === 'sentence') {
      fbSentBox.hidden = false;
      const fullMarked = escapeHtml(q.sentence).replace(
        '___',
        `<mark>${escapeHtml(q.answer)}</mark>`
      );
      $('fbSentenceEs').innerHTML = fullMarked;
      $('fbSentenceZh').textContent = q.zh;
    } else {
      fbSentBox.hidden = true;
    }

    // Grammar rule explanation
    $('feedbackRule').textContent = `💡 解析：${q.note}`;

    // Full 6-person paradigm
    $('paradigmTitle').textContent = `${verbObj.infinitive} · ${tenseInfo.nameZh}`;
    const forms = verbObj.conjugations[q.tense];
    $('paradigmGrid').innerHTML = forms
      .map(
        (form, idx) => `
        <div class="paradigm-cell ${idx === q.personIndex ? 'highlight' : ''}">
          <span class="paradigm-pron">${PERSONS[idx].short}（${PERSONS[idx].cn}）</span>
          <span class="paradigm-form">${escapeHtml(form)}</span>
        </div>
      `
      )
      .join('');

    // Next button label
    const isLast = session.index === session.questions.length - 1;
    $('btnNextQuestion').innerHTML = isLast
      ? '<span>查看成绩单</span><span>→</span>'
      : '<span>下一题</span><span>→</span>';
  }

  function nextQuestion() {
    if (session.index < session.questions.length - 1) {
      session.index += 1;
      renderCurrentQuestion();
    } else {
      finishSession();
    }
  }

  function finishSession() {
    session.active = false;
    const total = session.questions.length;
    const pct = Math.round((session.correctCount / total) * 100);

    let medal = '🌱';
    let headline = '继续加油，熟能生巧！';
    let sub = '错题已自动收录到错题本，复习一遍会牢记很多。';

    if (pct === 100) {
      medal = '🏆';
      headline = '¡Excelente! 全部答对！';
      sub = '太棒了，这组动词变位你已经完全掌握！';
    } else if (pct >= 80) {
      medal = '🎉';
      headline = '¡Muy bien! 表现出色！';
      sub = '西语语感越来越好了，巩固一下个别易错点就完美了。';
    } else if (pct >= 60) {
      medal = '✨';
      headline = '¡Buen trabajo! 稳步进步中';
      sub = '大部分变位已经很熟悉了，再复习一下刚才的错题吧。';
    }

    $('summaryMedal').textContent = medal;
    $('summaryHeadline').textContent = headline;
    $('summarySub').textContent = sub;
    $('sumScore').textContent = `${pct}%`;
    $('sumCorrect').textContent = `${session.correctCount} / ${total}`;
    $('sumStreak').textContent = session.maxStreak;

    const reviewBlock = $('summaryReviewBlock');
    const reviewList = $('summaryReviewList');
    const retryBtn = $('btnRetryMistakes');

    if (session.wrongItems.length > 0) {
      reviewBlock.hidden = false;
      retryBtn.hidden = false;
      reviewList.innerHTML = session.wrongItems
        .map(({ question: q, userAnswer }) => {
          const v = VERBS[q.verb];
          const p = PERSONS[q.personIndex];
          const t = TENSE_META[q.tense];
          const promptText =
            q.type === 'sentence'
              ? q.sentence.replace('___', `[ ${q.answer} ]`)
              : `${v.infinitive}（${v.meaning}）· ${t.nameZh} · ${p.short}`;
          return `
            <div class="review-item">
              <div class="review-item-top">
                <strong>${escapeHtml(v.infinitive)} · ${escapeHtml(v.meaning)}</strong>
                <div>
                  <span class="review-item-user">${escapeHtml(userAnswer)}</span>
                  <span class="review-item-ans">→ ${escapeHtml(q.answer)}</span>
                </div>
              </div>
              <div>${escapeHtml(promptText)}</div>
            </div>
          `;
        })
        .join('');
    } else {
      reviewBlock.hidden = true;
      retryBtn.hidden = true;
    }

    switchView('summary');
  }

  // -------------------- Hint Builder --------------------
  function showHint() {
    const q = session.questions[session.index];
    const verbObj = VERBS[q.verb];
    const person = PERSONS[q.personIndex];
    const ans = q.answer;
    const firstLetters = ans.includes(' ')
      ? `${ans.split(' ')[0]} ${ans.split(' ')[1].slice(0, 2)}...`
      : `${ans.slice(0, Math.min(2, ans.length))}...`;

    const hintEl = $('hintBox');
    hintEl.innerHTML = `
      人称：<strong>${person.label}（${person.cn}）</strong> ｜
      开头提示：<strong>${escapeHtml(firstLetters)}</strong> ｜
      规律：${escapeHtml(verbObj.tip)}
    `;
    hintEl.hidden = false;
  }

  // -------------------- Mistake Notebook --------------------
  function recordMistake(q) {
    const existing = persisted.mistakes.find((m) => m.key === q.key);
    if (existing) {
      existing.wrongCount = (existing.wrongCount || 1) + 1;
      existing.updatedAt = Date.now();
    } else {
      persisted.mistakes.unshift({
        key: q.key,
        type: q.type,
        sentenceId: q.sentenceId || null,
        verb: q.verb,
        tense: q.tense,
        personIndex: q.personIndex,
        wrongCount: 1,
        updatedAt: Date.now()
      });
    }
  }

  function removeMistakeByKey(key) {
    const before = persisted.mistakes.length;
    persisted.mistakes = persisted.mistakes.filter((m) => m.key !== key);
    if (persisted.mistakes.length < before) {
      savePersisted();
      renderHomeStats();
      showToast('已掌握！该题已从错题本移出 ✨');
    }
  }

  function hydrateMistakeToQuestion(m) {
    if (m.type === 'sentence' && m.sentenceId) {
      const s = SENTENCES.find((item) => item.id === m.sentenceId);
      if (s) return makeSentenceQuestion(s);
    }
    if (VERBS[m.verb]) {
      return makeDirectQuestion(m.verb, m.tense, m.personIndex);
    }
    return null;
  }

  function renderMistakesView() {
    const listEl = $('mistakesList');
    const emptyEl = $('mistakesEmpty');
    const practiceBtn = $('btnPracticeMistakes');
    const clearBtn = $('btnClearMistakes');

    const items = persisted.mistakes
      .map((m) => ({ meta: m, q: hydrateMistakeToQuestion(m) }))
      .filter((x) => x.q !== null);

    const hasItems = items.length > 0;
    emptyEl.hidden = hasItems;
    listEl.hidden = !hasItems;
    practiceBtn.disabled = !hasItems;
    clearBtn.disabled = !hasItems;

    if (!hasItems) return;

    listEl.innerHTML = items
      .map(({ meta, q }) => {
        const v = VERBS[q.verb];
        const t = TENSE_META[q.tense];
        const p = PERSONS[q.personIndex];
        const promptHtml =
          q.type === 'sentence'
            ? escapeHtml(q.sentence).replace('___', `<u>${escapeHtml(q.answer)}</u>`)
            : `${escapeHtml(v.infinitive)}（${escapeHtml(v.meaning)}） → ${escapeHtml(p.label)}`;

        return `
          <div class="mistake-card">
            <div>
              <div class="mistake-meta">
                <span class="q-type-badge ${q.type === 'direct' ? 'direct' : ''}">${q.type === 'sentence' ? '句子填空' : '变位速问'}</span>
                <span class="q-tense-badge">${t.nameZh}</span>
                <span class="q-cat-badge">${v.infinitive} · ${v.meaning}</span>
                <span class="q-cat-badge">错 ${meta.wrongCount} 次</span>
              </div>
              <div class="mistake-prompt">${promptHtml}</div>
              <div class="mistake-answer">正确变位：${escapeHtml(q.answer)}（${p.short}）</div>
              <div class="mistake-rule">${escapeHtml(q.note)}</div>
            </div>
            <button class="btn btn-ghost" data-remove-mistake="${escapeHtml(meta.key)}">已掌握</button>
          </div>
        `;
      })
      .join('');
  }

  // -------------------- Reference Cheat Sheet --------------------
  function renderReferenceView() {
    const tenseInfo = TENSE_META[refState.tense];
    $('rulesTenseName').textContent = `${tenseInfo.nameZh} (${tenseInfo.nameEs})`;
    $('rulesTenseTip').textContent = tenseInfo.tip;

    // Regular endings table
    $('rulesTable').innerHTML = `
      <thead>
        <tr>
          <th>人称</th>
          <th>-ar 动词（如 hablar）</th>
          <th>-er 动词（如 comer）</th>
          <th>-ir 动词（如 vivir）</th>
        </tr>
      </thead>
      <tbody>
        ${tenseInfo.regularEndings
          .map(
            (r) => `
          <tr>
            <td>${r.person}</td>
            <td><strong>${r.ar}</strong></td>
            <td><strong>${r.er}</strong></td>
            <td><strong>${r.ir}</strong></td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    `;

    // Filter verb cards
    const kw = refState.search.trim().toLowerCase();
    const list = Object.values(VERBS).filter((v) => {
      const scopeOk = verbMatchesScope(v, refState.scope);
      const catOk = refState.category === 'all' || v.category === refState.category;
      const kwOk =
        !kw ||
        v.infinitive.toLowerCase().includes(kw) ||
        v.meaning.toLowerCase().includes(kw);
      return scopeOk && catOk && kwOk;
    });

    const grid = $('verbRefGrid');
    if (!list.length) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><p>没有找到匹配的动词，试试搜索 hablar、ir 或“吃”吧。</p></div>`;
      return;
    }

    grid.innerHTML = list
      .map((v) => {
        const forms = v.conjugations[refState.tense];
        const tierLabel = v.tier === 'common' ? '常用' : '扩展';
        return `
          <div class="verb-ref-card">
            <div class="verb-ref-top">
              <div>
                <div class="verb-ref-title">
                  <strong>${escapeHtml(v.infinitive)}</strong>
                  <span>${escapeHtml(v.meaning)}</span>
                </div>
                <div class="verb-ref-badges">
                  <span class="tier-pill ${v.tier}">${tierLabel}</span>
                  <span class="q-cat-badge">${escapeHtml(v.badge)}</span>
                </div>
              </div>
              <button class="audio-mini" data-speak-verb="${escapeHtml(v.infinitive)}" title="朗读原形">🔊</button>
            </div>
            <p class="verb-ref-note">${escapeHtml(v.tip)}</p>
            <div class="verb-mini-table">
              ${forms
                .map(
                  (f, idx) => `
                <div class="verb-mini-row">
                  <span class="p">${PERSONS[idx].short}</span>
                  <span class="f">${escapeHtml(f)}</span>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        `;
      })
      .join('');
  }

  // -------------------- Event Listeners --------------------
  function bindEvents() {
    // Top navigation
    $('brandHome').addEventListener('click', () => switchView('home'));
    document.querySelectorAll('.nav-pill').forEach((btn) => {
      btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    // Mode cards
    $('modeSelector').addEventListener('click', (e) => {
      const card = e.target.closest('.mode-card');
      if (!card) return;
      config.mode = card.dataset.mode;
      document.querySelectorAll('#modeSelector .mode-card').forEach((c) => {
        c.classList.toggle('selected', c === card);
      });
      updatePoolSummary();
    });

    // Tense chips (multi-select, keep at least 1)
    $('tenseSelector').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const t = chip.dataset.tense;
      if (config.tenses.includes(t)) {
        if (config.tenses.length === 1) {
          showToast('至少需要保留一个练习时态哦');
          return;
        }
        config.tenses = config.tenses.filter((x) => x !== t);
        chip.classList.remove('selected');
      } else {
        config.tenses.push(t);
        chip.classList.add('selected');
      }
      updatePoolSummary();
    });

    // Verb scope chips (common vs all)
    $('verbScopeSelector').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      config.verbScope = chip.dataset.scope;
      document.querySelectorAll('#verbScopeSelector .chip').forEach((c) => {
        c.classList.toggle('selected', c === chip);
      });
      updatePoolSummary();
    });

    // Category chips
    $('categorySelector').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      config.category = chip.dataset.cat;
      document.querySelectorAll('#categorySelector .chip').forEach((c) => {
        c.classList.toggle('selected', c === chip);
      });
      updatePoolSummary();
    });

    // Input mode segmented control
    $('inputModeSelector').addEventListener('click', (e) => {
      const btn = e.target.closest('.seg-btn');
      if (!btn) return;
      config.inputMode = btn.dataset.input;
      document.querySelectorAll('#inputModeSelector .seg-btn').forEach((b) => {
        b.classList.toggle('selected', b === btn);
      });
    });

    // Count segmented control
    $('countSelector').addEventListener('click', (e) => {
      const btn = e.target.closest('.seg-btn');
      if (!btn) return;
      config.count = Number(btn.dataset.count);
      document.querySelectorAll('#countSelector .seg-btn').forEach((b) => {
        b.classList.toggle('selected', b === btn);
      });
    });

    // Toggles
    $('toggleShowTranslation').addEventListener('change', (e) => {
      config.showTranslation = e.target.checked;
    });
    $('toggleStrictAccent').addEventListener('change', (e) => {
      config.strictAccent = e.target.checked;
    });

    // Start buttons
    $('btnStartQuick').addEventListener('click', () => startSession());
    $('btnStartCustom').addEventListener('click', () => startSession());

    // Rules modal
    const modal = $('rulesModal');
    $('btnOpenRules').addEventListener('click', () => (modal.hidden = false));
    $('btnCloseRulesModal').addEventListener('click', () => (modal.hidden = true));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.hidden = true;
    });
    $('btnModalStart').addEventListener('click', () => {
      modal.hidden = true;
      startSession();
    });

    // Practice controls
    $('btnExitPractice').addEventListener('click', () => {
      session.active = false;
      switchView('home');
    });

    $('btnToggleInputInSession').addEventListener('click', () => {
      if (session.answered) {
        showToast('请先进入下一题后再切换作答模式');
        return;
      }
      config.inputMode = config.inputMode === 'typing' ? 'choice' : 'typing';
      document.querySelectorAll('#inputModeSelector .seg-btn').forEach((b) => {
        b.classList.toggle('selected', b.dataset.input === config.inputMode);
      });
      syncSessionModeButton();
      renderAnswerInputArea(session.questions[session.index]);
    });

    $('btnSubmitAnswer').addEventListener('click', () => {
      evaluateAnswer($('answerInput').value);
    });

    $('btnNextQuestion').addEventListener('click', nextQuestion);
    $('btnShowHint').addEventListener('click', showHint);

    $('btnToggleTransInCard').addEventListener('click', () => {
      const q = session.questions[session.index];
      const current =
        session.showTransOverride !== null ? session.showTransOverride : config.showTranslation;
      session.showTransOverride = !current;
      updateTranslationVisibility(q);
    });

    // Accent bar buttons (insert at cursor position!)
    document.querySelectorAll('.accent-key').forEach((btn) => {
      btn.addEventListener('click', () => {
        const input = $('answerInput');
        if (input.disabled) return;
        const ch = btn.dataset.char;
        const start = input.selectionStart ?? input.value.length;
        const end = input.selectionEnd ?? input.value.length;
        input.value = input.value.slice(0, start) + ch + input.value.slice(end);
        input.focus();
        input.setSelectionRange(start + ch.length, start + ch.length);
      });
    });

    // Choice buttons click
    $('choiceGrid').addEventListener('click', (e) => {
      const btn = e.target.closest('.choice-btn');
      if (!btn || btn.disabled) return;
      evaluateAnswer(btn.dataset.value);
    });

    // Audio buttons
    $('btnSpeakPrompt').addEventListener('click', () => {
      const q = session.questions[session.index];
      if (q.type === 'sentence' && session.answered) {
        speakSpanish(q.sentence.replace('___', q.answer));
      } else {
        speakSpanish(VERBS[q.verb].infinitive);
      }
    });

    $('btnSpeakFull').addEventListener('click', () => {
      const q = session.questions[session.index];
      if (q && q.type === 'sentence') {
        speakSpanish(q.sentence.replace('___', q.answer));
      }
    });

    // Global keyboard shortcuts during practice
    document.addEventListener('keydown', (e) => {
      if (!session.active) return;

      if (e.key === 'Enter') {
        e.preventDefault();
        if (session.answered) {
          nextQuestion();
        } else if (config.inputMode === 'typing') {
          evaluateAnswer($('answerInput').value);
        }
        return;
      }

      if (!session.answered && config.inputMode === 'choice') {
        const idx = Number(e.key) - 1;
        if (idx >= 0 && idx < 4 && session.currentChoices[idx]) {
          e.preventDefault();
          evaluateAnswer(session.currentChoices[idx]);
        }
      }
    });

    // Summary actions
    $('btnPracticeAgain').addEventListener('click', () => startSession());
    $('btnRetryMistakes').addEventListener('click', () => {
      const retryQueue = session.wrongItems.map((x) => x.question);
      startSession(retryQueue, true);
    });
    $('btnBackHome').addEventListener('click', () => switchView('home'));

    // Reference view controls
    $('refSearch').addEventListener('input', (e) => {
      refState.search = e.target.value;
      renderReferenceView();
    });
    $('refScopeSelect').addEventListener('change', (e) => {
      refState.scope = e.target.value;
      renderReferenceView();
    });
    $('refTenseSelect').addEventListener('change', (e) => {
      refState.tense = e.target.value;
      renderReferenceView();
    });
    $('refCategoryFilter').addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      refState.category = chip.dataset.cat;
      document.querySelectorAll('#refCategoryFilter .chip').forEach((c) => {
        c.classList.toggle('selected', c === chip);
      });
      renderReferenceView();
    });
    $('verbRefGrid').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-speak-verb]');
      if (btn) speakSpanish(btn.dataset.speakVerb);
    });

    // Mistakes view controls
    $('btnGoPracticeFromEmpty').addEventListener('click', () => switchView('home'));
    $('btnPracticeMistakes').addEventListener('click', () => {
      const queue = persisted.mistakes
        .map(hydrateMistakeToQuestion)
        .filter((x) => x !== null);
      startSession(shuffle(queue), true);
    });
    $('btnClearMistakes').addEventListener('click', () => {
      persisted.mistakes = [];
      savePersisted();
      renderHomeStats();
      renderMistakesView();
      showToast('错题本已清空');
    });
    $('mistakesList').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-remove-mistake]');
      if (!btn) return;
      removeMistakeByKey(btn.dataset.removeMistake);
      renderMistakesView();
    });
  }

  // -------------------- Initialize --------------------
  bindEvents();
  updateScopeOptionLabels();
  renderHomeStats();
  updatePoolSummary();
})();
