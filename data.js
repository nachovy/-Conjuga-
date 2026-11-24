/* =====================================================
   ¡Conjuga! — Spanish Verbs & Sentences Linguistic Data
   Carefully verified A1–A2 dataset for Chinese beginners
   ===================================================== */

const PERSONS = [
  { key: 'yo', label: 'yo', cn: '我', short: 'yo' },
  { key: 'tu', label: 'tú', cn: '你', short: 'tú' },
  { key: 'el', label: 'él / ella / usted', cn: '他 / 她 / 您', short: 'él/ella/Ud.' },
  { key: 'nosotros', label: 'nosotros / nosotras', cn: '我们', short: 'nosotros' },
  { key: 'vosotros', label: 'vosotros / vosotras', cn: '你们', short: 'vosotros' },
  { key: 'ellos', label: 'ellos / ellas / ustedes', cn: '他们 / 她们 / 诸位', short: 'ellos/Uds.' }
];

const TENSE_META = {
  presente: {
    id: 'presente',
    nameZh: '陈述式现在时',
    nameEs: 'Presente',
    level: 'A1',
    tip: '去掉动词原形词尾 -ar / -er / -ir，加上对应人称词尾（最基础、最常用）',
    regularEndings: [
      { person: 'yo（我）', ar: '-o', er: '-o', ir: '-o' },
      { person: 'tú（你）', ar: '-as', er: '-es', ir: '-es' },
      { person: 'él / ella / usted', ar: '-a', er: '-e', ir: '-e' },
      { person: 'nosotros（我们）', ar: '-amos', er: '-emos', ir: '-imos' },
      { person: 'vosotros（你们）', ar: '-áis', er: '-éis', ir: '-ís' },
      { person: 'ellos / ustedes', ar: '-an', er: '-en', ir: '-en' }
    ]
  },
  indefinido: {
    id: 'indefinido',
    nameZh: '简单过去时',
    nameEs: 'Pretérito Indefinido',
    level: 'A2',
    tip: '表示过去已经完成的动作（常与 ayer, anoche, la semana pasada 连用）；-er 与 -ir 规则词尾相同',
    regularEndings: [
      { person: 'yo（我）', ar: '-é', er: '-í', ir: '-í' },
      { person: 'tú（你）', ar: '-aste', er: '-iste', ir: '-iste' },
      { person: 'él / ella / usted', ar: '-ó', er: '-ió', ir: '-ió' },
      { person: 'nosotros（我们）', ar: '-amos', er: '-imos', ir: '-imos' },
      { person: 'vosotros（你们）', ar: '-asteis', er: '-isteis', ir: '-isteis' },
      { person: 'ellos / ustedes', ar: '-aron', er: '-ieron', ir: '-ieron' }
    ]
  },
  imperfecto: {
    id: 'imperfecto',
    nameZh: '过去未完成时',
    nameEs: 'Pretérito Imperfecto',
    level: 'A2',
    tip: '表示过去习惯性动作、背景或状态描写（常与 antes, cuando era niño 连用）；全西语仅有 ser, ir, ver 三个不规则',
    regularEndings: [
      { person: 'yo（我）', ar: '-aba', er: '-ía', ir: '-ía' },
      { person: 'tú（你）', ar: '-abas', er: '-ías', ir: '-ías' },
      { person: 'él / ella / usted', ar: '-aba', er: '-ía', ir: '-ía' },
      { person: 'nosotros（我们）', ar: '-ábamos', er: '-íamos', ir: '-íamos' },
      { person: 'vosotros（你们）', ar: '-abais', er: '-íais', ir: '-íais' },
      { person: 'ellos / ustedes', ar: '-aban', er: '-ían', ir: '-ían' }
    ]
  },
  futuro: {
    id: 'futuro',
    nameZh: '简单将来时',
    nameEs: 'Futuro Simple',
    level: 'A2',
    tip: '规则动词无需去词尾，直接在整个动词原形后加上统一词尾！-ar/-er/-ir 三类完全相同',
    regularEndings: [
      { person: 'yo（我）', ar: '+é', er: '+é', ir: '+é' },
      { person: 'tú（你）', ar: '+ás', er: '+ás', ir: '+ás' },
      { person: 'él / ella / usted', ar: '+á', er: '+á', ir: '+á' },
      { person: 'nosotros（我们）', ar: '+emos', er: '+emos', ir: '+emos' },
      { person: 'vosotros（你们）', ar: '+éis', er: '+éis', ir: '+éis' },
      { person: 'ellos / ustedes', ar: '+án', er: '+án', ir: '+án' }
    ]
  }
};

const VERBS = {
  // ===== Regular -ar =====
  hablar: {
    infinitive: 'hablar',
    meaning: '说，讲',
    category: 'regular',
    badge: '-ar 规则动词',
    tip: '最典型的 -ar 规则动词，去掉 -ar 后加上对应人称词尾即可。',
    conjugations: {
      presente: ['hablo', 'hablas', 'habla', 'hablamos', 'habláis', 'hablan'],
      indefinido: ['hablé', 'hablaste', 'habló', 'hablamos', 'hablasteis', 'hablaron'],
      imperfecto: ['hablaba', 'hablabas', 'hablaba', 'hablábamos', 'hablabais', 'hablaban'],
      futuro: ['hablaré', 'hablarás', 'hablará', 'hablaremos', 'hablaréis', 'hablarán']
    }
  },
  estudiar: {
    infinitive: 'estudiar',
    meaning: '学习，研读',
    category: 'regular',
    badge: '-ar 规则动词',
    tip: '-ar 规则动词，词干为 estudi-，各人称词尾与 hablar 一致。',
    conjugations: {
      presente: ['estudio', 'estudias', 'estudia', 'estudiamos', 'estudiáis', 'estudian'],
      indefinido: ['estudié', 'estudiaste', 'estudió', 'estudiamos', 'estudiasteis', 'estudiaron'],
      imperfecto: ['estudiaba', 'estudiabas', 'estudiaba', 'estudiábamos', 'estudiabais', 'estudiaban'],
      futuro: ['estudiaré', 'estudiarás', 'estudiará', 'estudiaremos', 'estudiaréis', 'estudiarán']
    }
  },
  trabajar: {
    infinitive: 'trabajar',
    meaning: '工作',
    category: 'regular',
    badge: '-ar 规则动词',
    tip: '-ar 规则动词，词干为 trabaj-，注意字母 j 读作喉音 /x/。',
    conjugations: {
      presente: ['trabajo', 'trabajas', 'trabaja', 'trabajamos', 'trabajáis', 'trabajan'],
      indefinido: ['trabajé', 'trabajaste', 'trabajó', 'trabajamos', 'trabajasteis', 'trabajaron'],
      imperfecto: ['trabajaba', 'trabajabas', 'trabajaba', 'trabajábamos', 'trabajabais', 'trabajaban'],
      futuro: ['trabajaré', 'trabajarás', 'trabajará', 'trabajaremos', 'trabajaréis', 'trabajarán']
    }
  },
  comprar: {
    infinitive: 'comprar',
    meaning: '买，购买',
    category: 'regular',
    badge: '-ar 规则动词',
    tip: '-ar 规则动词，词干为 compr-，日常购物高频词。',
    conjugations: {
      presente: ['compro', 'compras', 'compra', 'compramos', 'compráis', 'compran'],
      indefinido: ['compré', 'compraste', 'compró', 'compramos', 'comprasteis', 'compraron'],
      imperfecto: ['compraba', 'comprabas', 'compraba', 'comprábamos', 'comprabais', 'compraban'],
      futuro: ['compraré', 'comprarás', 'comprará', 'compraremos', 'compraréis', 'comprarán']
    }
  },
  escuchar: {
    infinitive: 'escuchar',
    meaning: '听，聆听',
    category: 'regular',
    badge: '-ar 规则动词',
    tip: '-ar 规则动词，词干为 escuch-，后面可直接跟宾语（如 escuchar música）。',
    conjugations: {
      presente: ['escucho', 'escuchas', 'escucha', 'escuchamos', 'escucháis', 'escuchan'],
      indefinido: ['escuché', 'escuchaste', 'escuchó', 'escuchamos', 'escuchasteis', 'escucharon'],
      imperfecto: ['escuchaba', 'escuchabas', 'escuchaba', 'escuchábamos', 'escuchabais', 'escuchaban'],
      futuro: ['escucharé', 'escucharás', 'escuchará', 'escucharemos', 'escucharéis', 'escucharán']
    }
  },
  viajar: {
    infinitive: 'viajar',
    meaning: '旅行',
    category: 'regular',
    badge: '-ar 规则动词',
    tip: '-ar 规则动词，词干为 viaj-，完全规则。',
    conjugations: {
      presente: ['viajo', 'viajas', 'viaja', 'viajamos', 'viajáis', 'viajan'],
      indefinido: ['viajé', 'viajaste', 'viajó', 'viajamos', 'viajasteis', 'viajaron'],
      imperfecto: ['viajaba', 'viajabas', 'viajaba', 'viajábamos', 'viajabais', 'viajaban'],
      futuro: ['viajaré', 'viajarás', 'viajará', 'viajaremos', 'viajaréis', 'viajarán']
    }
  },
  cocinar: {
    infinitive: 'cocinar',
    meaning: '做饭，烹饪',
    category: 'regular',
    badge: '-ar 规则动词',
    tip: '-ar 规则动词，词干为 cocin-。',
    conjugations: {
      presente: ['cocino', 'cocinas', 'cocina', 'cocinamos', 'cocináis', 'cocinan'],
      indefinido: ['cociné', 'cocinaste', 'cocinó', 'cocinamos', 'cocinasteis', 'cocinaron'],
      imperfecto: ['cocinaba', 'cocinabas', 'cocinaba', 'cocinábamos', 'cocinabais', 'cocinaban'],
      futuro: ['cocinaré', 'cocinarás', 'cocinará', 'cocinaremos', 'cocinaréis', 'cocinarán']
    }
  },
  tomar: {
    infinitive: 'tomar',
    meaning: '喝，吃，乘坐，拿',
    category: 'regular',
    badge: '-ar 规则动词',
    tip: '-ar 规则动词，西语万能动词之一（tomar café 喝咖啡，tomar el metro 坐地铁）。',
    conjugations: {
      presente: ['tomo', 'tomas', 'toma', 'tomamos', 'tomáis', 'toman'],
      indefinido: ['tomé', 'tomaste', 'tomó', 'tomamos', 'tomasteis', 'tomaron'],
      imperfecto: ['tomaba', 'tomabas', 'tomaba', 'tomábamos', 'tomabais', 'tomaban'],
      futuro: ['tomaré', 'tomarás', 'tomará', 'tomaremos', 'tomaréis', 'tomarán']
    }
  },

  // ===== Regular -er =====
  comer: {
    infinitive: 'comer',
    meaning: '吃，吃午饭',
    category: 'regular',
    badge: '-er 规则动词',
    tip: '最典型的 -er 规则动词，现在时词尾为 -o, -es, -e, -emos, -éis, -en。',
    conjugations: {
      presente: ['como', 'comes', 'come', 'comemos', 'coméis', 'comen'],
      indefinido: ['comí', 'comiste', 'comió', 'comimos', 'comisteis', 'comieron'],
      imperfecto: ['comía', 'comías', 'comía', 'comíamos', 'comíais', 'comían'],
      futuro: ['comeré', 'comerás', 'comerá', 'comeremos', 'comeréis', 'comerán']
    }
  },
  beber: {
    infinitive: 'beber',
    meaning: '喝，饮用',
    category: 'regular',
    badge: '-er 规则动词',
    tip: '-er 规则动词，词干为 beb-，变位规律与 comer 完全一致。',
    conjugations: {
      presente: ['bebo', 'bebes', 'bebe', 'bebemos', 'bebéis', 'beben'],
      indefinido: ['bebí', 'bebiste', 'bebió', 'bebimos', 'bebisteis', 'bebieron'],
      imperfecto: ['bebía', 'bebías', 'bebía', 'bebíamos', 'bebíais', 'bebían'],
      futuro: ['beberé', 'beberás', 'beberá', 'beberemos', 'beberéis', 'beberán']
    }
  },
  aprender: {
    infinitive: 'aprender',
    meaning: '学习，学会',
    category: 'regular',
    badge: '-er 规则动词',
    tip: '-er 规则动词，强调“学会某项技能”，常搭配介词 a（aprender a conducir）。',
    conjugations: {
      presente: ['aprendo', 'aprendes', 'aprende', 'aprendemos', 'aprendéis', 'aprenden'],
      indefinido: ['aprendí', 'aprendiste', 'aprendió', 'aprendimos', 'aprendisteis', 'aprendieron'],
      imperfecto: ['aprendía', 'aprendías', 'aprendía', 'aprendíamos', 'aprendíais', 'aprendían'],
      futuro: ['aprenderé', 'aprenderás', 'aprenderá', 'aprenderemos', 'aprenderéis', 'aprenderán']
    }
  },
  leer: {
    infinitive: 'leer',
    meaning: '读，阅读',
    category: 'regular',
    badge: '-er 动词（过去时拼写变化）',
    tip: '现在时完全规则（leo, lees...）；简单过去时第三人称 i 变为 y（leyó, leyeron）。',
    conjugations: {
      presente: ['leo', 'lees', 'lee', 'leemos', 'leéis', 'leen'],
      indefinido: ['leí', 'leíste', 'leyó', 'leímos', 'leísteis', 'leyeron'],
      imperfecto: ['leía', 'leías', 'leía', 'leíamos', 'leíais', 'leían'],
      futuro: ['leeré', 'leerás', 'leerá', 'leeremos', 'leeréis', 'leerán']
    }
  },

  // ===== Regular -ir =====
  vivir: {
    infinitive: 'vivir',
    meaning: '居住，生活',
    category: 'regular',
    badge: '-ir 规则动词',
    tip: '最典型的 -ir 规则动词。注意现在时仅 nosotros (-imos) 和 vosotros (-ís) 与 -er 不同。',
    conjugations: {
      presente: ['vivo', 'vives', 'vive', 'vivimos', 'vivís', 'viven'],
      indefinido: ['viví', 'viviste', 'vivió', 'vivimos', 'vivisteis', 'vivieron'],
      imperfecto: ['vivía', 'vivías', 'vivía', 'vivíamos', 'vivíais', 'vivían'],
      futuro: ['viviré', 'vivirás', 'vivirá', 'viviremos', 'viviréis', 'vivirán']
    }
  },
  escribir: {
    infinitive: 'escribir',
    meaning: '写，书写',
    category: 'regular',
    badge: '-ir 规则动词',
    tip: '-ir 规则动词，词干为 escrib-，各人称词尾与 vivir 相同。',
    conjugations: {
      presente: ['escribo', 'escribes', 'escribe', 'escribimos', 'escribís', 'escriben'],
      indefinido: ['escribí', 'escribiste', 'escribió', 'escribimos', 'escribisteis', 'escribieron'],
      imperfecto: ['escribía', 'escribías', 'escribía', 'escribíamos', 'escribíais', 'escribían'],
      futuro: ['escribiré', 'escribirás', 'escribirá', 'escribiremos', 'escribiréis', 'escribirán']
    }
  },
  abrir: {
    infinitive: 'abrir',
    meaning: '打开，开门',
    category: 'regular',
    badge: '-ir 规则动词',
    tip: '-ir 规则动词，词干为 abr-。',
    conjugations: {
      presente: ['abro', 'abres', 'abre', 'abrimos', 'abrís', 'abren'],
      indefinido: ['abrí', 'abriste', 'abrió', 'abrimos', 'abristeis', 'abrieron'],
      imperfecto: ['abría', 'abrías', 'abría', 'abríamos', 'abríais', 'abrían'],
      futuro: ['abriré', 'abrirás', 'abrirá', 'abriremos', 'abriréis', 'abrirán']
    }
  },

  // ===== Stem-changing verbs =====
  querer: {
    infinitive: 'querer',
    meaning: '想要，爱',
    category: 'stem',
    badge: '词干变化 e→ie',
    tip: '现在时 e→ie（nosotros/vosotros 不变：queremos）；过去时词干 quis-；将来时双 r：querr-。',
    conjugations: {
      presente: ['quiero', 'quieres', 'quiere', 'queremos', 'queréis', 'quieren'],
      indefinido: ['quise', 'quisiste', 'quiso', 'quisimos', 'quisisteis', 'quisieron'],
      imperfecto: ['quería', 'querías', 'quería', 'queríamos', 'queríais', 'querían'],
      futuro: ['querré', 'querrás', 'querrá', 'querremos', 'querréis', 'querrán']
    }
  },
  poder: {
    infinitive: 'poder',
    meaning: '能够，可以',
    category: 'stem',
    badge: '词干变化 o→ue',
    tip: '现在时 o→ue（podemos 不变）；简单过去时词干 pud-；将来时去 e：podr-。',
    conjugations: {
      presente: ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
      indefinido: ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron'],
      imperfecto: ['podía', 'podías', 'podía', 'podíamos', 'podíais', 'podían'],
      futuro: ['podré', 'podrás', 'podrá', 'podremos', 'podréis', 'podrán']
    }
  },
  dormir: {
    infinitive: 'dormir',
    meaning: '睡觉',
    category: 'stem',
    badge: '词干变化 o→ue',
    tip: '现在时 o→ue（dormimos 不变）；简单过去时第三人称 o→u（durmió, durmieron）。',
    conjugations: {
      presente: ['duermo', 'duermes', 'duerme', 'dormimos', 'dormís', 'duermen'],
      indefinido: ['dormí', 'dormiste', 'durmió', 'dormimos', 'dormisteis', 'durmieron'],
      imperfecto: ['dormía', 'dormías', 'dormía', 'dormíamos', 'dormíais', 'dormían'],
      futuro: ['dormiré', 'dormirás', 'dormirá', 'dormiremos', 'dormiréis', 'dormirán']
    }
  },
  empezar: {
    infinitive: 'empezar',
    meaning: '开始',
    category: 'stem',
    badge: '词干变化 e→ie',
    tip: '现在时 e→ie（empezamos 不变）；简单过去时 yo 拼写变化 z→c（empecé）。',
    conjugations: {
      presente: ['empiezo', 'empiezas', 'empieza', 'empezamos', 'empezáis', 'empiezan'],
      indefinido: ['empecé', 'empezaste', 'empezó', 'empezamos', 'empezasteis', 'empezaron'],
      imperfecto: ['empezaba', 'empezabas', 'empezaba', 'empezábamos', 'empezabais', 'empezaban'],
      futuro: ['empezaré', 'empezarás', 'empezará', 'empezaremos', 'empezaréis', 'empezarán']
    }
  },
  pedir: {
    infinitive: 'pedir',
    meaning: '点餐，请求，要',
    category: 'stem',
    badge: '词干变化 e→i',
    tip: '现在时 e→i（pedimos 不变）；简单过去时第三人称 e→i（pidió, pidieron）。',
    conjugations: {
      presente: ['pido', 'pides', 'pide', 'pedimos', 'pedís', 'piden'],
      indefinido: ['pedí', 'pediste', 'pidió', 'pedimos', 'pedisteis', 'pidieron'],
      imperfecto: ['pedía', 'pedías', 'pedía', 'pedíamos', 'pedíais', 'pedían'],
      futuro: ['pediré', 'pedirás', 'pedirá', 'pediremos', 'pediréis', 'pedirán']
    }
  },
  jugar: {
    infinitive: 'jugar',
    meaning: '玩，做（球类运动）',
    category: 'stem',
    badge: '词干变化 u→ue',
    tip: '全西语唯一的 u→ue 动词！现在时 jugar→juego（jugamos 不变）；过去时 yo 为 jugué。',
    conjugations: {
      presente: ['juego', 'juegas', 'juega', 'jugamos', 'jugáis', 'juegan'],
      indefinido: ['jugué', 'jugaste', 'jugó', 'jugamos', 'jugasteis', 'jugaron'],
      imperfecto: ['jugaba', 'jugabas', 'jugaba', 'jugábamos', 'jugabais', 'jugaban'],
      futuro: ['jugaré', 'jugarás', 'jugará', 'jugaremos', 'jugaréis', 'jugarán']
    }
  },
  volver: {
    infinitive: 'volver',
    meaning: '返回，回来',
    category: 'stem',
    badge: '词干变化 o→ue',
    tip: '现在时 o→ue（volvemos 不变），其余三个时态均规则！',
    conjugations: {
      presente: ['vuelvo', 'vuelves', 'vuelve', 'volvemos', 'volvéis', 'vuelven'],
      indefinido: ['volví', 'volviste', 'volvió', 'volvimos', 'volvisteis', 'volvieron'],
      imperfecto: ['volvía', 'volvías', 'volvía', 'volvíamos', 'volvíais', 'volvían'],
      futuro: ['volveré', 'volverás', 'volverá', 'volveremos', 'volveréis', 'volverán']
    }
  },

  // ===== High-frequency Irregular verbs =====
  ser: {
    infinitive: 'ser',
    meaning: '是（本质、身份、时间）',
    category: 'irregular',
    badge: '高频不规则',
    tip: '核心基础动词！表示身份、国籍、职业、性格与时间。过去时与 ir 变位完全相同（fui...）。',
    conjugations: {
      presente: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
      indefinido: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      imperfecto: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
      futuro: ['seré', 'serás', 'será', 'seremos', 'seréis', 'serán']
    }
  },
  estar: {
    infinitive: 'estar',
    meaning: '在，处于（位置、状态）',
    category: 'irregular',
    badge: '高频不规则',
    tip: '表示位置、情绪和暂时状态。注意现在时 estás, está, estáis, están 均带重音！',
    conjugations: {
      presente: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
      indefinido: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron'],
      imperfecto: ['estaba', 'estabas', 'estaba', 'estábamos', 'estabais', 'estaban'],
      futuro: ['estaré', 'estarás', 'estará', 'estaremos', 'estaréis', 'estarán']
    }
  },
  ir: {
    infinitive: 'ir',
    meaning: '去，前往',
    category: 'irregular',
    badge: '高频不规则',
    tip: '现在时以 v- 开头（voy, vas, va...）；未完成时为 iba...；常构成 ir + a + 动词原形（将要做）。',
    conjugations: {
      presente: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
      indefinido: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
      imperfecto: ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
      futuro: ['iré', 'irás', 'irá', 'iremos', 'iréis', 'irán']
    }
  },
  tener: {
    infinitive: 'tener',
    meaning: '有，拥有（也表年龄/状态）',
    category: 'irregular',
    badge: '高频不规则',
    tip: '现在时 yo 为 tengo，其余靴形 e→ie（tienes, tiene, tienen）；过去时词干 tuv-；将来时 tendr-。',
    conjugations: {
      presente: ['tengo', 'tienes', 'tiene', 'tenemos', 'tenéis', 'tienen'],
      indefinido: ['tuve', 'tuviste', 'tuvo', 'tuvimos', 'tuvisteis', 'tuvieron'],
      imperfecto: ['tenía', 'tenías', 'tenía', 'teníamos', 'teníais', 'tenían'],
      futuro: ['tendré', 'tendrás', 'tendrá', 'tendremos', 'tendréis', 'tendrán']
    }
  },
  hacer: {
    infinitive: 'hacer',
    meaning: '做，制作（也表天气）',
    category: 'irregular',
    badge: '高频不规则',
    tip: '现在时仅 yo 不规则（hago）；过去时词干 hic-（第三人称 hizo）；将来时 har-。',
    conjugations: {
      presente: ['hago', 'haces', 'hace', 'hacemos', 'hacéis', 'hacen'],
      indefinido: ['hice', 'hiciste', 'hizo', 'hicimos', 'hicisteis', 'hicieron'],
      imperfecto: ['hacía', 'hacías', 'hacía', 'hacíamos', 'hacíais', 'hacían'],
      futuro: ['haré', 'harás', 'hará', 'haremos', 'haréis', 'harán']
    }
  },
  venir: {
    infinitive: 'venir',
    meaning: '来，来到',
    category: 'irregular',
    badge: '高频不规则',
    tip: '与 tener 非常像！现在时 yo 为 vengo，其余靴形 e→ie（vienes...）；将来时 vendr-。',
    conjugations: {
      presente: ['vengo', 'vienes', 'viene', 'venimos', 'venís', 'vienen'],
      indefinido: ['vine', 'viniste', 'vino', 'vinimos', 'vinisteis', 'vinieron'],
      imperfecto: ['venía', 'venías', 'venía', 'veníamos', 'veníais', 'venían'],
      futuro: ['vendré', 'vendrás', 'vendrá', 'vendremos', 'vendréis', 'vendrán']
    }
  },
  decir: {
    infinitive: 'decir',
    meaning: '说，告诉',
    category: 'irregular',
    badge: '高频不规则',
    tip: '现在时 yo 为 digo，靴形 e→i（dices, dice, dicen）；过去时 dij-；将来时 dir-。',
    conjugations: {
      presente: ['digo', 'dices', 'dice', 'decimos', 'decís', 'dicen'],
      indefinido: ['dije', 'dijiste', 'dijo', 'dijimos', 'dijisteis', 'dijeron'],
      imperfecto: ['decía', 'decías', 'decía', 'decíamos', 'decíais', 'decían'],
      futuro: ['diré', 'dirás', 'dirá', 'diremos', 'diréis', 'dirán']
    }
  },
  saber: {
    infinitive: 'saber',
    meaning: '知道，会（技能）',
    category: 'irregular',
    badge: '高频不规则',
    tip: '现在时仅 yo 特殊（sé，带重音以区别于代词 se）；过去时 sup-；将来时 sabr-。',
    conjugations: {
      presente: ['sé', 'sabes', 'sabe', 'sabemos', 'sabéis', 'saben'],
      indefinido: ['supe', 'supiste', 'supo', 'supimos', 'supisteis', 'supieron'],
      imperfecto: ['sabía', 'sabías', 'sabía', 'sabíamos', 'sabíais', 'sabían'],
      futuro: ['sabré', 'sabrás', 'sabrá', 'sabremos', 'sabréis', 'sabrán']
    }
  },
  salir: {
    infinitive: 'salir',
    meaning: '出去，离开，出发',
    category: 'irregular',
    badge: '高频不规则',
    tip: '现在时仅 yo 为 salgo（-go 动词），其余完全规则；将来时词干 saldr-。',
    conjugations: {
      presente: ['salgo', 'sales', 'sale', 'salimos', 'salís', 'salen'],
      indefinido: ['salí', 'saliste', 'salió', 'salimos', 'salisteis', 'salieron'],
      imperfecto: ['salía', 'salías', 'salía', 'salíamos', 'salíais', 'salían'],
      futuro: ['saldré', 'saldrás', 'saldrá', 'saldremos', 'saldréis', 'saldrán']
    }
  },
  ver: {
    infinitive: 'ver',
    meaning: '看，看见，观看',
    category: 'irregular',
    badge: '高频不规则',
    tip: '现在时 yo 为 veo；过去未完成时保留 e（veía...）；过去时单音节 vi/vio 不加重音。',
    conjugations: {
      presente: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
      indefinido: ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
      imperfecto: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
      futuro: ['veré', 'verás', 'verá', 'veremos', 'veréis', 'verán']
    }
  },
  dar: {
    infinitive: 'dar',
    meaning: '给，给予',
    category: 'irregular',
    badge: '高频不规则',
    tip: '现在时 yo 为 doy，其余按 -ar 变位（vosotros 为 dais 无重音）；过去时按 -er/-ir 词尾变（di, diste, dio...）。',
    conjugations: {
      presente: ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
      indefinido: ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
      imperfecto: ['daba', 'dabas', 'daba', 'dábamos', 'dabais', 'daban'],
      futuro: ['daré', 'darás', 'dará', 'daremos', 'daréis', 'darán']
    }
  },

  // ===== Reflexive verbs =====
  llamarse: {
    infinitive: 'llamarse',
    meaning: '名叫，被称为',
    category: 'reflexive',
    badge: '自复动词 (-se)',
    tip: '自复动词需在变位动词前加上对应自复代词：me, te, se, nos, os, se。',
    conjugations: {
      presente: ['me llamo', 'te llamas', 'se llama', 'nos llamamos', 'os llamáis', 'se llaman'],
      indefinido: ['me llamé', 'te llamaste', 'se llamó', 'nos llamamos', 'os llamasteis', 'se llamaron'],
      imperfecto: ['me llamaba', 'te llamabas', 'se llamaba', 'nos llamábamos', 'os llamabais', 'se llamaban'],
      futuro: ['me llamaré', 'te llamarás', 'se llamará', 'nos llamaremos', 'os llamaréis', 'se llamarán']
    }
  },
  levantarse: {
    infinitive: 'levantarse',
    meaning: '起床，站起来',
    category: 'reflexive',
    badge: '自复动词 (-se)',
    tip: '日常作息高频自复动词：自复代词（me/te/se/nos/os/se）+ levantar 的规则变位。',
    conjugations: {
      presente: ['me levanto', 'te levantas', 'se levanta', 'nos levantamos', 'os levantáis', 'se levantan'],
      indefinido: ['me levanté', 'te levantaste', 'se levantó', 'nos levantamos', 'os levantasteis', 'se levantaron'],
      imperfecto: ['me levantaba', 'te levantabas', 'se levantaba', 'nos levantábamos', 'os levantabais', 'se levantaban'],
      futuro: ['me levantaré', 'te levantarás', 'se levantará', 'nos levantaremos', 'os levantaréis', 'se levantarán']
    }
  },
  acostarse: {
    infinitive: 'acostarse',
    meaning: '上床睡觉，躺下',
    category: 'reflexive',
    badge: '自复动词 + o→ue',
    tip: '既是自复动词（加 me/te/se...），现在时又有 o→ue 词干变化（me acuesto，但 nos acostamos）。',
    conjugations: {
      presente: ['me acuesto', 'te acuestas', 'se acuesta', 'nos acostamos', 'os acostáis', 'se acuestan'],
      indefinido: ['me acosté', 'te acostaste', 'se acostó', 'nos acostamos', 'os acostasteis', 'se acostaron'],
      imperfecto: ['me acostaba', 'te acostabas', 'se acostaba', 'nos acostábamos', 'os acostabais', 'se acostaban'],
      futuro: ['me acostaré', 'te acostarás', 'se acostará', 'nos acostaremos', 'os acostaréis', 'se acostarán']
    }
  }
};

// =====================================================
// SENTENCE FILL-IN-THE-BLANK BANK (100+ curated sentences)
// =====================================================
const SENTENCES = [
  // ---------- PRESENTE: Regular -ar ----------
  {
    id: 'p_hablar_1',
    verb: 'hablar',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Yo ___ español un poco, pero practico todos los días.',
    zh: '我会说一点西班牙语，但我每天都在练习。',
    subjectHint: '主语：yo（我）',
    note: 'hablar 是 -ar 规则动词，yo 去掉 -ar 加 -o → hablo。'
  },
  {
    id: 'p_hablar_2',
    verb: 'hablar',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿___ tú inglés o francés?',
    zh: '你会说英语还是法语？',
    subjectHint: '主语：tú（你）',
    note: '-ar 规则动词在 tú 人称加 -as → hablas（句首小写或大写均可识别）。'
  },
  {
    id: 'p_hablar_3',
    verb: 'hablar',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Nosotros ___ por teléfono cada domingo.',
    zh: '我们每个星期天都通电话。',
    subjectHint: '主语：nosotros（我们）',
    note: '-ar 规则动词在 nosotros 人称加 -amos → hablamos。'
  },
  {
    id: 'p_estudiar_1',
    verb: 'estudiar',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Por la noche ___ vocabulario nuevo en mi habitación.',
    zh: '晚上我在房间里学习新词汇。',
    subjectHint: '隐含主语：yo（由 mi 可知是“我”）',
    note: 'estudiar 去掉 -ar 加 -o → estudio。'
  },
  {
    id: 'p_estudiar_2',
    verb: 'estudiar',
    tense: 'presente',
    personIndex: 2,
    sentence: 'Elena ___ medicina en la universidad de Madrid.',
    zh: '埃莱娜在马德里大学学习医学。',
    subjectHint: '主语：Elena（她 = ella）',
    note: '第三人称单数 ella 对应 -ar 词尾 -a → estudia。'
  },
  {
    id: 'p_estudiar_3',
    verb: 'estudiar',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Mis compañeros ___ juntos en la biblioteca.',
    zh: '我的同学们一起在图书馆学习。',
    subjectHint: '主语：mis compañeros（他们 = ellos）',
    note: '复数第三人称 ellos 对应 -ar 词尾 -an → estudian。'
  },
  {
    id: 'p_trabajar_1',
    verb: 'trabajar',
    tense: 'presente',
    personIndex: 2,
    sentence: 'Mi padre ___ en un hospital cerca de casa.',
    zh: '我爸爸在离家很近的一家医院工作。',
    subjectHint: '主语：mi padre（他 = él）',
    note: 'trabajar 第三人称单数 él 去掉 -ar 加 -a → trabaja。'
  },
  {
    id: 'p_trabajar_2',
    verb: 'trabajar',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿Dónde ___ tú ahora?',
    zh: '你现在在哪里工作？',
    subjectHint: '主语：tú（你）',
    note: 'trabajar 对应 tú 加 -as → trabajas。'
  },
  {
    id: 'p_comprar_1',
    verb: 'comprar',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Los sábados nosotros ___ fruta fresca en el mercado.',
    zh: '每周六我们在集市买新鲜水果。',
    subjectHint: '主语：nosotros（我们）',
    note: 'comprar 对应 nosotros 加 -amos → compramos。'
  },
  {
    id: 'p_comprar_2',
    verb: 'comprar',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Siempre ___ pan caliente en esta panadería.',
    zh: '我总是在这家面包店买热面包。',
    subjectHint: '主语：yo（我）',
    note: 'comprar 对应 yo 加 -o → compro。'
  },
  {
    id: 'p_escuchar_1',
    verb: 'escuchar',
    tense: 'presente',
    personIndex: 2,
    sentence: 'Sofía ___ música clásica mientras lee.',
    zh: '索菲亚看书的时候听古典音乐。',
    subjectHint: '主语：Sofía（她 = ella）',
    note: 'escuchar 对应 ella 加 -a → escucha。'
  },
  {
    id: 'p_viajar_1',
    verb: 'viajar',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Mis abuelos ___ a la playa todos los veranos.',
    zh: '我的祖父母每年夏天都去海边旅行。',
    subjectHint: '主语：mis abuelos（他们 = ellos）',
    note: 'viajar 对应 ellos 加 -an → viajan。'
  },
  {
    id: 'p_cocinar_1',
    verb: 'cocinar',
    tense: 'presente',
    personIndex: 1,
    sentence: '¡Qué rico huele! ¿Qué ___ hoy?',
    zh: '好香啊！你今天做什么菜？',
    subjectHint: '主语：tú（你）',
    note: 'cocinar 对应 tú 加 -as → cocinas。'
  },
  {
    id: 'p_tomar_1',
    verb: 'tomar',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Cada mañana yo ___ un café con leche.',
    zh: '每天早上我都喝一杯牛奶咖啡。',
    subjectHint: '主语：yo（我）',
    note: 'tomar 对应 yo 加 -o → tomo。'
  },
  {
    id: 'p_tomar_2',
    verb: 'tomar',
    tense: 'presente',
    personIndex: 4,
    sentence: '¿Vosotros ___ el autobús para ir al centro?',
    zh: '你们坐公交车去市中心吗？',
    subjectHint: '主语：vosotros（你们）',
    note: '-ar 规则动词 vosotros 词尾为 -áis（别忘重音 á）→ tomáis。'
  },

  // ---------- PRESENTE: Regular -er & -ir ----------
  {
    id: 'p_comer_1',
    verb: 'comer',
    tense: 'presente',
    personIndex: 3,
    sentence: 'En España nosotros ___ a las dos de la tarde.',
    zh: '在西班牙，我们下午两点吃午饭。',
    subjectHint: '主语：nosotros（我们）',
    note: 'comer 是 -er 规则动词，nosotros 加 -emos → comemos。'
  },
  {
    id: 'p_comer_2',
    verb: 'comer',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Los niños ___ verduras sin problema.',
    zh: '孩子们吃蔬菜完全没问题。',
    subjectHint: '主语：los niños（他们 = ellos）',
    note: '-er 动词 ellos 词尾为 -en → comen。'
  },
  {
    id: 'p_beber_1',
    verb: 'beber',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Yo no ___ refrescos, prefiero el agua.',
    zh: '我不喝汽水，我更喜欢水。',
    subjectHint: '主语：yo（我）',
    note: 'beber 对应 yo 去掉 -er 加 -o → bebo。'
  },
  {
    id: 'p_beber_2',
    verb: 'beber',
    tense: 'presente',
    personIndex: 2,
    sentence: '¿Usted ___ té verde o té negro?',
    zh: '您喝绿茶还是红茶？',
    subjectHint: '主语：usted（您，按第三人称单数变位）',
    note: '敬称 usted 使用第三人称单数变位，-er 加 -e → bebe。'
  },
  {
    id: 'p_aprender_1',
    verb: 'aprender',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Nosotras ___ muchas palabras nuevas en clase.',
    zh: '我们在课堂上学到很多新单词。',
    subjectHint: '主语：nosotras（我们）',
    note: 'aprender 对应 nosotras 加 -emos → aprendemos。'
  },
  {
    id: 'p_leer_1',
    verb: 'leer',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿Qué libro ___ tú ahora mismo?',
    zh: '你现在正在看什么书？',
    subjectHint: '主语：tú（你）',
    note: 'leer 现在时完全规则，词干 le- 加 -es → lees。'
  },
  {
    id: 'p_leer_2',
    verb: 'leer',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Antes de dormir, siempre ___ diez páginas.',
    zh: '睡觉前，我总是读十页书。',
    subjectHint: '主语：yo（我）',
    note: 'leer 词干 le- 加 -o → leo。'
  },
  {
    id: 'p_vivir_1',
    verb: 'vivir',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Yo ___ en un apartamento pequeño pero muy luminoso.',
    zh: '我住在一套小巧但非常明亮的公寓里。',
    subjectHint: '主语：yo（我）',
    note: 'vivir 是 -ir 规则动词，yo 加 -o → vivo。'
  },
  {
    id: 'p_vivir_2',
    verb: 'vivir',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Mi familia y yo ___ cerca del parque.',
    zh: '我和我的家人住在公园附近。',
    subjectHint: '主语：mi familia y yo（= nosotros 我们）',
    note: '-ir 动词 nosotros 词尾是 -imos（注意不是 -emos）→ vivimos。'
  },
  {
    id: 'p_vivir_3',
    verb: 'vivir',
    tense: 'presente',
    personIndex: 4,
    sentence: '¿En qué barrio ___ vosotros?',
    zh: '你们住在哪个街区？',
    subjectHint: '主语：vosotros（你们）',
    note: '-ir 动词 vosotros 词尾为 -ís（带重音）→ vivís。'
  },
  {
    id: 'p_escribir_1',
    verb: 'escribir',
    tense: 'presente',
    personIndex: 2,
    sentence: 'Carlos ___ un correo electrónico a su profesora.',
    zh: '卡洛斯给他的女老师写一封电子邮件。',
    subjectHint: '主语：Carlos（他 = él）',
    note: 'escribir 对应 él 加 -e → escribe。'
  },
  {
    id: 'p_escribir_2',
    verb: 'escribir',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Ellas ___ en su diario todas las noches.',
    zh: '她们每天晚上都写日记。',
    subjectHint: '主语：ellas（她们）',
    note: 'escribir 对应 ellas 加 -en → escriben。'
  },
  {
    id: 'p_abrir_1',
    verb: 'abrir',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Las tiendas ___ a las diez de la mañana.',
    zh: '商店早上十点开门。',
    subjectHint: '主语：las tiendas（它们 = ellas）',
    note: 'abrir 对应复数第三人称加 -en → abren。'
  },

  // ---------- PRESENTE: Stem-changing ----------
  {
    id: 'p_querer_1',
    verb: 'querer',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Yo ___ visitar Barcelona el próximo año.',
    zh: '我想明年去巴塞罗那旅游。',
    subjectHint: '主语：yo（我）',
    note: 'querer 在现在时发生 e→ie 变化：yo → quiero。'
  },
  {
    id: 'p_querer_2',
    verb: 'querer',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿___ tú un vaso de agua fría?',
    zh: '你想要一杯冰水吗？',
    subjectHint: '主语：tú（你）',
    note: 'querer 发生 e→ie 变化：tú → quieres。'
  },
  {
    id: 'p_querer_3',
    verb: 'querer',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Nosotros ___ aprender a cocinar paella.',
    zh: '我们想学做西班牙海鲜饭。',
    subjectHint: '主语：nosotros（我们）',
    note: '注意！靴形变化在 nosotros 不变词干，保持 e → queremos。'
  },
  {
    id: 'p_poder_1',
    verb: 'poder',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿___ ayudarme con esta maleta, por favor?',
    zh: '请问你能帮我拿一下这个行李箱吗？',
    subjectHint: '主语：tú（你）',
    note: 'poder 现在时 o→ue：tú → puedes。'
  },
  {
    id: 'p_poder_2',
    verb: 'poder',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Hoy nosotros no ___ salir porque llueve mucho.',
    zh: '今天我们不能出门，因为雨下得很大。',
    subjectHint: '主语：nosotros（我们）',
    note: 'nosotros 不发生 o→ue 变化，仍为 podemos！'
  },
  {
    id: 'p_dormir_1',
    verb: 'dormir',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Normalmente yo ___ ocho horas cada noche.',
    zh: '通常我每晚睡八个小时。',
    subjectHint: '主语：yo（我）',
    note: 'dormir 现在时 o→ue：yo → duermo。'
  },
  {
    id: 'p_dormir_2',
    verb: 'dormir',
    tense: 'presente',
    personIndex: 2,
    sentence: 'El gato ___ en el sofá toda la tarde.',
    zh: '小猫整个下午都在沙发上睡觉。',
    subjectHint: '主语：el gato（它 = él）',
    note: 'dormir 第三人称单数 o→ue → duerme。'
  },
  {
    id: 'p_empezar_1',
    verb: 'empezar',
    tense: 'presente',
    personIndex: 2,
    sentence: 'La clase de español ___ a las nueve en punto.',
    zh: '西班牙语课九点整开始。',
    subjectHint: '主语：la clase（它 = ella）',
    note: 'empezar 现在时 e→ie：第三人称单数 → empieza。'
  },
  {
    id: 'p_pedir_1',
    verb: 'pedir',
    tense: 'presente',
    personIndex: 0,
    sentence: 'En este restaurante siempre ___ tapas y gazpacho.',
    zh: '在这家餐厅我总是点小吃和冷汤。',
    subjectHint: '主语：yo（我）',
    note: 'pedir 现在时 e→i：yo → pido。'
  },
  {
    id: 'p_pedir_2',
    verb: 'pedir',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Ellos siempre ___ café después de comer.',
    zh: '他们饭后总是点咖啡。',
    subjectHint: '主语：ellos（他们）',
    note: 'pedir 第三人称复数 e→i → piden。'
  },
  {
    id: 'p_jugar_1',
    verb: 'jugar',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Mis hermanos ___ al fútbol en el parque.',
    zh: '我的兄弟们在公园里踢足球。',
    subjectHint: '主语：mis hermanos（他们 = ellos）',
    note: 'jugar 是独特的 u→ue 词干变化动词：ellos → juegan。'
  },
  {
    id: 'p_jugar_2',
    verb: 'jugar',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Los viernes nosotros ___ a las cartas.',
    zh: '每周五我们一起打牌。',
    subjectHint: '主语：nosotros（我们）',
    note: 'nosotros 不发生 u→ue 变化 → jugamos。'
  },
  {
    id: 'p_volver_1',
    verb: 'volver',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Yo ___ a casa a las seis de la tarde.',
    zh: '我下午六点回家。',
    subjectHint: '主语：yo（我）',
    note: 'volver 现在时 o→ue：yo → vuelvo。'
  },

  // ---------- PRESENTE: High-frequency Irregular ----------
  {
    id: 'p_ser_1',
    verb: 'ser',
    tense: 'presente',
    personIndex: 0,
    sentence: '¡Hola! Yo ___ estudiante de español.',
    zh: '你好！我是一名西班牙语学生。',
    subjectHint: '主语：yo（我）',
    note: '表示身份职业用 ser，yo 的变位是不规则的 soy。'
  },
  {
    id: 'p_ser_2',
    verb: 'ser',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿De dónde ___ tú?',
    zh: '你是哪里人？',
    subjectHint: '主语：tú（你）',
    note: '询问国籍/来源用 ser，tú 对应 eres。'
  },
  {
    id: 'p_ser_3',
    verb: 'ser',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Ana y yo ___ muy buenas amigas.',
    zh: '安娜和我是非常好的朋友。',
    subjectHint: '主语：Ana y yo（= nosotras 我们）',
    note: 'ser 在 nosotros/nosotras 人称为 somos。'
  },
  {
    id: 'p_ser_4',
    verb: 'ser',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Estos zapatos ___ muy cómodos.',
    zh: '这双鞋非常舒服。',
    subjectHint: '主语：estos zapatos（复数 = ellos）',
    note: 'ser 第三人称复数为 son。'
  },
  {
    id: 'p_estar_1',
    verb: 'estar',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Hoy ___ muy contento porque hace sol.',
    zh: '今天我很开心，因为阳光明媚。',
    subjectHint: '主语：yo（我）',
    note: '表达情绪状态用 estar，yo 的变位是 estoy。'
  },
  {
    id: 'p_estar_2',
    verb: 'estar',
    tense: 'presente',
    personIndex: 2,
    sentence: 'Perdón, ¿dónde ___ la estación de tren?',
    zh: '打扰一下，火车站在哪里？',
    subjectHint: '主语：la estación（它 = ella）',
    note: '表示地点位置用 estar，第三人称单数为 está（注意重音 á）。'
  },
  {
    id: 'p_estar_3',
    verb: 'estar',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿Cómo ___ hoy, amigo?',
    zh: '朋友，你今天怎么样？',
    subjectHint: '主语：tú（你）',
    note: 'estar 对应 tú 为 estás（带重音 á）。'
  },
  {
    id: 'p_estar_4',
    verb: 'estar',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Mis llaves ___ encima de la mesa.',
    zh: '我的钥匙在桌子上。',
    subjectHint: '主语：mis llaves（复数 = ellas）',
    note: 'estar 第三人称复数为 están（带重音 á）。'
  },
  {
    id: 'p_ir_1',
    verb: 'ir',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Ahora ___ al supermercado a comprar leche.',
    zh: '我现在去超市买牛奶。',
    subjectHint: '主语：yo（我）',
    note: 'ir 是完全不规则动词，yo 变为 voy。'
  },
  {
    id: 'p_ir_2',
    verb: 'ir',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Este fin de semana nosotros ___ a la montaña.',
    zh: '这个周末我们去爬山。',
    subjectHint: '主语：nosotros（我们）',
    note: 'ir 对应 nosotros 为 vamos（也是“走吧！”的意思）。'
  },
  {
    id: 'p_ir_3',
    verb: 'ir',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Los turistas ___ al Museo del Prado.',
    zh: '游客们去普拉多博物馆。',
    subjectHint: '主语：los turistas（他们 = ellos）',
    note: 'ir 第三人称复数为 van。'
  },
  {
    id: 'p_tener_1',
    verb: 'tener',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Yo ___ dos perros muy simpáticos.',
    zh: '我有两只非常可爱的狗。',
    subjectHint: '主语：yo（我）',
    note: 'tener 在 yo 变为 tengo（高频 -go 动词）。'
  },
  {
    id: 'p_tener_2',
    verb: 'tener',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿Cuántos años ___ tú?',
    zh: '你今年几岁了？',
    subjectHint: '主语：tú（你）',
    note: '西语用 tener 表示年龄，tú 发生 e→ie 变化 → tienes。'
  },
  {
    id: 'p_tener_3',
    verb: 'tener',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Nosotros ___ mucha hambre después de caminar.',
    zh: '散完步后我们非常饿。',
    subjectHint: '主语：nosotros（我们）',
    note: 'tener hambre 表示“饿”；nosotros 不变词干 → tenemos。'
  },
  {
    id: 'p_hacer_1',
    verb: 'hacer',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Yo ___ ejercicio tres veces por semana.',
    zh: '我每周锻炼三次。',
    subjectHint: '主语：yo（我）',
    note: 'hacer 仅在 yo 不规则，变为 hago。'
  },
  {
    id: 'p_hacer_2',
    verb: 'hacer',
    tense: 'presente',
    personIndex: 2,
    sentence: 'Hoy ___ muy buen tiempo en Valencia.',
    zh: '今天瓦伦西亚的天气非常好。',
    subjectHint: '主语：无人称天气表达（用第三人称单数）',
    note: '描述天气常用 hacer 的第三人称单数：hace buen tiempo / hace frío。'
  },
  {
    id: 'p_venir_1',
    verb: 'venir',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Yo ___ a esta cafetería todos los martes.',
    zh: '我每周二都来这家咖啡馆。',
    subjectHint: '主语：yo（我）',
    note: 'venir 与 tener 同类，yo 变为 vengo。'
  },
  {
    id: 'p_venir_2',
    verb: 'venir',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿___ tú a mi fiesta el sábado?',
    zh: '周六你来参加我的派对吗？',
    subjectHint: '主语：tú（你）',
    note: 'venir 对应 tú 发生 e→ie 变化 → vienes。'
  },
  {
    id: 'p_decir_1',
    verb: 'decir',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Siempre te ___ la verdad.',
    zh: '我总是跟你说实话。',
    subjectHint: '主语：yo（我）',
    note: 'decir 在 yo 变为 digo。'
  },
  {
    id: 'p_decir_2',
    verb: 'decir',
    tense: 'presente',
    personIndex: 2,
    sentence: 'Mi abuela siempre ___ que la salud es lo más importante.',
    zh: '我奶奶总是说健康是最重要的。',
    subjectHint: '主语：mi abuela（她 = ella）',
    note: 'decir 在第三人称单数 e→i → dice。'
  },
  {
    id: 'p_saber_1',
    verb: 'saber',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Lo siento, pero yo no ___ dónde está el banco.',
    zh: '抱歉，我不知道银行在哪里。',
    subjectHint: '主语：yo（我）',
    note: 'saber 在 yo 非常特殊：sé（记得带重音符号 é）。'
  },
  {
    id: 'p_saber_2',
    verb: 'saber',
    tense: 'presente',
    personIndex: 1,
    sentence: '¿___ tú tocar la guitarra?',
    zh: '你会弹吉他吗？',
    subjectHint: '主语：tú（你）',
    note: 'saber 除 yo 外其余人称均规则，tú → sabes。'
  },
  {
    id: 'p_salir_1',
    verb: 'salir',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Normalmente ___ del trabajo a las cinco.',
    zh: '我通常五点下班。',
    subjectHint: '主语：yo（我）',
    note: 'salir 在 yo 为 salgo（-go 动词），其余规则。'
  },
  {
    id: 'p_ver_1',
    verb: 'ver',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Los fines de semana ___ películas en español.',
    zh: '周末我看西班牙语电影。',
    subjectHint: '主语：yo（我）',
    note: 'ver 在 yo 保留词干字母 e → veo。'
  },
  {
    id: 'p_dar_1',
    verb: 'dar',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Cada mañana le ___ comida a mi perro.',
    zh: '每天早上我都给我的狗喂食。',
    subjectHint: '主语：yo（我）',
    note: 'dar 在 yo 变为 doy（与 soy, estoy, voy 并称四大 -oy 动词）。'
  },

  // ---------- PRESENTE: Reflexive ----------
  {
    id: 'p_llamarse_1',
    verb: 'llamarse',
    tense: 'presente',
    personIndex: 0,
    sentence: '¡Hola! ___ Lucía, ¿y tú?',
    zh: '你好！我叫露西亚，你呢？',
    subjectHint: '主语：yo（我，自复代词 me）',
    note: '自复动词 llamarse 对应 yo 需加自复代词 me → me llamo。'
  },
  {
    id: 'p_llamarse_2',
    verb: 'llamarse',
    tense: 'presente',
    personIndex: 2,
    sentence: '¿Cómo ___ tu mejor amigo?',
    zh: '你最好的朋友叫什么名字？',
    subjectHint: '主语：tu mejor amigo（他 = él，自复代词 se）',
    note: '第三人称单数自复代词为 se → se llama。'
  },
  {
    id: 'p_levantarse_1',
    verb: 'levantarse',
    tense: 'presente',
    personIndex: 0,
    sentence: 'De lunes a viernes ___ a las siete de la mañana.',
    zh: '周一到周五我早上七点起床。',
    subjectHint: '主语：yo（我，自复代词 me）',
    note: 'levantarse 对应 yo 为 me levanto。'
  },
  {
    id: 'p_levantarse_2',
    verb: 'levantarse',
    tense: 'presente',
    personIndex: 3,
    sentence: 'Los domingos nosotros ___ muy tarde.',
    zh: '星期天我们起得很晚。',
    subjectHint: '主语：nosotros（我们，自复代词 nos）',
    note: 'levantarse 对应 nosotros 为 nos levantamos。'
  },
  {
    id: 'p_acostarse_1',
    verb: 'acostarse',
    tense: 'presente',
    personIndex: 0,
    sentence: 'Cuando estoy cansado, ___ antes de las diez.',
    zh: '我累的时候，十点前就上床睡觉。',
    subjectHint: '主语：yo（我，自复代词 me + o→ue）',
    note: 'acostarse 同时需要自复代词 me 和 o→ue 变化 → me acuesto。'
  },
  {
    id: 'p_acostarse_2',
    verb: 'acostarse',
    tense: 'presente',
    personIndex: 5,
    sentence: 'Los niños ___ temprano durante la semana.',
    zh: '工作日孩子们早早上床睡觉。',
    subjectHint: '主语：los niños（他们 = ellos，自复代词 se + o→ue）',
    note: '第三人称复数自复代词 se + acuestan → se acuestan。'
  },

  // ---------- INDEFINIDO (简单过去时) ----------
  {
    id: 'i_hablar_1',
    verb: 'hablar',
    tense: 'indefinido',
    personIndex: 0,
    sentence: 'Ayer ___ con mi profesora sobre el examen.',
    zh: '昨天我和我的老师聊了考试的事。',
    subjectHint: '主语：yo（由 mi 可知是“我”）',
    note: '-ar 动词简单过去时 yo 加 -é（带重音）→ hablé。'
  },
  {
    id: 'i_comprar_1',
    verb: 'comprar',
    tense: 'indefinido',
    personIndex: 2,
    sentence: 'La semana pasada María ___ una bicicleta nueva.',
    zh: '上周玛丽亚买了一辆新自行车。',
    subjectHint: '主语：María（她 = ella）',
    note: '-ar 动词简单过去时第三人称单数加 -ó（带重音）→ compró。'
  },
  {
    id: 'i_viajar_1',
    verb: 'viajar',
    tense: 'indefinido',
    personIndex: 5,
    sentence: 'El año pasado ellos ___ a México.',
    zh: '去年他们去墨西哥旅行了。',
    subjectHint: '主语：ellos（他们）',
    note: '-ar 动词简单过去时 ellos 加 -aron → viajaron。'
  },
  {
    id: 'i_comer_1',
    verb: 'comer',
    tense: 'indefinido',
    personIndex: 3,
    sentence: 'Anoche nosotros ___ en un restaurante peruano.',
    zh: '昨晚我们在一家秘鲁餐厅吃了饭。',
    subjectHint: '主语：nosotros（我们）',
    note: '-er/-ir 动词简单过去时 nosotros 加 -imos → comimos。'
  },
  {
    id: 'i_beber_1',
    verb: 'beber',
    tense: 'indefinido',
    personIndex: 1,
    sentence: '¿Qué ___ tú en la fiesta anoche?',
    zh: '昨晚派对上你喝了什么？',
    subjectHint: '主语：tú（你）',
    note: '-er/-ir 动词简单过去时 tú 加 -iste → bebiste。'
  },
  {
    id: 'i_vivir_1',
    verb: 'vivir',
    tense: 'indefinido',
    personIndex: 0,
    sentence: 'Yo ___ en Sevilla durante dos años.',
    zh: '我在塞维利亚住过两年。',
    subjectHint: '主语：yo（我）',
    note: '-ir 动词简单过去时 yo 加 -í（带重音）→ viví。'
  },
  {
    id: 'i_escribir_1',
    verb: 'escribir',
    tense: 'indefinido',
    personIndex: 2,
    sentence: 'Cervantes ___ «Don Quijote».',
    zh: '塞万提斯写了《堂吉诃德》。',
    subjectHint: '主语：Cervantes（他 = él）',
    note: '-ir 动词简单过去时第三人称单数加 -ió → escribió。'
  },
  {
    id: 'i_leer_1',
    verb: 'leer',
    tense: 'indefinido',
    personIndex: 2,
    sentence: 'Ayer Laura ___ toda la novela en un día.',
    zh: '昨天劳拉一天就把整本小说看完了。',
    subjectHint: '主语：Laura（她 = ella）',
    note: 'leer 在简单过去时第三人称将 i 变为 y → leyó。'
  },
  {
    id: 'i_ir_1',
    verb: 'ir',
    tense: 'indefinido',
    personIndex: 0,
    sentence: 'El domingo pasado ___ al cine con mis amigos.',
    zh: '上周日我和朋友们去看了电影。',
    subjectHint: '主语：yo（我）',
    note: 'ir（与 ser）的简单过去时完全不规则：yo → fui（单音节不加重音）。'
  },
  {
    id: 'i_ser_1',
    verb: 'ser',
    tense: 'indefinido',
    personIndex: 2,
    sentence: 'El concierto de anoche ___ increíble.',
    zh: '昨晚的音乐会太棒了。',
    subjectHint: '主语：el concierto（它 = él）',
    note: 'ser 简单过去时第三人称单数为 fue（无重音）。'
  },
  {
    id: 'i_tener_1',
    verb: 'tener',
    tense: 'indefinido',
    personIndex: 0,
    sentence: 'Ayer ___ muchísimo trabajo en la oficina.',
    zh: '昨天我在办公室有超级多的工作。',
    subjectHint: '主语：yo（我）',
    note: 'tener 简单过去时不规则词干为 tuv-，yo 加 -e（无重音）→ tuve。'
  },
  {
    id: 'i_hacer_1',
    verb: 'hacer',
    tense: 'indefinido',
    personIndex: 2,
    sentence: 'Mi madre ___ una tarta deliciosa para mi cumpleaños.',
    zh: '我妈妈为我的生日做了一个美味的蛋糕。',
    subjectHint: '主语：mi madre（她 = ella）',
    note: 'hacer 简单过去时第三人称单数 c 变 z（保持发音）→ hizo。'
  },
  {
    id: 'i_estar_1',
    verb: 'estar',
    tense: 'indefinido',
    personIndex: 3,
    sentence: 'En julio nosotros ___ una semana en Granada.',
    zh: '七月我们在格拉纳达待了一周。',
    subjectHint: '主语：nosotros（我们）',
    note: 'estar 简单过去时词干 estuv-，nosotros → estuvimos。'
  },
  {
    id: 'i_dormir_1',
    verb: 'dormir',
    tense: 'indefinido',
    personIndex: 2,
    sentence: 'El bebé ___ muy bien toda la noche.',
    zh: '宝宝一整晚睡得非常香。',
    subjectHint: '主语：el bebé（他 = él）',
    note: 'dormir 简单过去时第三人称 o→u → durmió。'
  },
  {
    id: 'i_empezar_1',
    verb: 'empezar',
    tense: 'indefinido',
    personIndex: 0,
    sentence: 'Hace tres meses ___ a estudiar español.',
    zh: '三个月前我开始学西班牙语。',
    subjectHint: '主语：yo（我）',
    note: 'empezar 在简单过去时 yo 为保持发音 z→c → empecé。'
  },
  {
    id: 'i_levantarse_1',
    verb: 'levantarse',
    tense: 'indefinido',
    personIndex: 0,
    sentence: 'Hoy ___ a las seis porque tenía un vuelo.',
    zh: '今天我六点就起床了，因为要赶飞机。',
    subjectHint: '主语：yo（我，自复代词 me）',
    note: 'levantarse 简单过去时 yo：me levanté。'
  },

  // ---------- IMPERFECTO (过去未完成时) ----------
  {
    id: 'm_hablar_1',
    verb: 'hablar',
    tense: 'imperfecto',
    personIndex: 3,
    sentence: 'Antes nosotros ___ todos los días, pero ahora vivimos lejos.',
    zh: '以前我们每天都聊天，但现在住得远了。',
    subjectHint: '主语：nosotros（我们）',
    note: '-ar 动词过去未完成时 nosotros 为 -ábamos（唯一带重音的 -ar 形式）→ hablábamos。'
  },
  {
    id: 'm_jugar_1',
    verb: 'jugar',
    tense: 'imperfecto',
    personIndex: 0,
    sentence: 'Cuando era niño, ___ en la calle con mis vecinos.',
    zh: '我小时候常和邻居们在街上玩。',
    subjectHint: '主语：yo（由 mis 可知是“我”）',
    note: 'jugar 在过去未完成时完全规则！词干 jug- 加 -aba → jugaba。'
  },
  {
    id: 'm_vivir_1',
    verb: 'vivir',
    tense: 'imperfecto',
    personIndex: 2,
    sentence: 'De joven, mi abuelo ___ en un pueblo pequeño.',
    zh: '年轻时，我爷爷住在一个小镇上。',
    subjectHint: '主语：mi abuelo（他 = él）',
    note: '-er/-ir 动词过去未完成时统一加 -ía（均有重音 í）→ vivía。'
  },
  {
    id: 'm_comer_1',
    verb: 'comer',
    tense: 'imperfecto',
    personIndex: 5,
    sentence: 'De pequeños, ellos siempre ___ helado en verano.',
    zh: '小时候，他们夏天总是吃冰淇淋。',
    subjectHint: '主语：ellos（他们）',
    note: 'comer 过去未完成时 ellos 加 -ían → comían。'
  },
  {
    id: 'm_ser_1',
    verb: 'ser',
    tense: 'imperfecto',
    personIndex: 0,
    sentence: 'Cuando yo ___ pequeño, quería ser astronauta.',
    zh: '当我还是小孩子的时候，我想当宇航员。',
    subjectHint: '主语：yo（我）',
    note: 'ser 是过去未完成时仅有的三大不规则动词之一：yo → era。'
  },
  {
    id: 'm_ir_1',
    verb: 'ir',
    tense: 'imperfecto',
    personIndex: 3,
    sentence: 'Todos los veranos nosotros ___ a casa de los abuelos.',
    zh: '每年夏天我们都会去祖父母家。',
    subjectHint: '主语：nosotros（我们）',
    note: 'ir 过去未完成时不规则：nosotros → íbamos（带重音 í）。'
  },
  {
    id: 'm_ver_1',
    verb: 'ver',
    tense: 'imperfecto',
    personIndex: 1,
    sentence: '¿___ tú dibujos animados después del colegio?',
    zh: '以前放学后你看动画片吗？',
    subjectHint: '主语：tú（你）',
    note: 'ver 是三大不规则之一，保留 e：tú → veías。'
  },
  {
    id: 'm_tener_1',
    verb: 'tener',
    tense: 'imperfecto',
    personIndex: 0,
    sentence: 'Antes ___ el pelo muy largo.',
    zh: '我以前留着很长的头发。',
    subjectHint: '主语：yo（我）',
    note: 'tener 在过去未完成时完全规则！→ tenía。'
  },
  {
    id: 'm_levantarse_1',
    verb: 'levantarse',
    tense: 'imperfecto',
    personIndex: 2,
    sentence: 'Mi padre siempre ___ antes del amanecer.',
    zh: '我爸爸以前总是在天亮前起床。',
    subjectHint: '主语：mi padre（他 = él，自复代词 se）',
    note: 'levantarse 过去未完成时第三人称单数 → se levantaba。'
  },

  // ---------- FUTURO (简单将来时) ----------
  {
    id: 'f_hablar_1',
    verb: 'hablar',
    tense: 'futuro',
    personIndex: 3,
    sentence: 'Mañana nosotros ___ con el director.',
    zh: '明天我们会和主管谈谈。',
    subjectHint: '主语：nosotros（我们）',
    note: '简单将来时直接在原形后加词尾，nosotros 加 -emos（唯一无重音）→ hablaremos。'
  },
  {
    id: 'f_viajar_1',
    verb: 'viajar',
    tense: 'futuro',
    personIndex: 0,
    sentence: 'El próximo verano ___ por toda Andalucía.',
    zh: '明年夏天我将环游整个安达卢西亚。',
    subjectHint: '主语：yo（我）',
    note: '原形 viajar 直接加 -é → viajaré。'
  },
  {
    id: 'f_comer_1',
    verb: 'comer',
    tense: 'futuro',
    personIndex: 1,
    sentence: '¿A qué hora ___ tú mañana?',
    zh: '你明天几点吃午饭？',
    subjectHint: '主语：tú（你）',
    note: '原形 comer 直接加 -ás → comerás。'
  },
  {
    id: 'f_vivir_1',
    verb: 'vivir',
    tense: 'futuro',
    personIndex: 5,
    sentence: 'El año que viene ellos ___ cerca del mar.',
    zh: '明年他们将住在海边。',
    subjectHint: '主语：ellos（他们）',
    note: '原形 vivir 直接加 -án → vivirán。'
  },
  {
    id: 'f_tener_1',
    verb: 'tener',
    tense: 'futuro',
    personIndex: 0,
    sentence: 'La semana que viene ___ más tiempo libre.',
    zh: '下周我会有更多空闲时间。',
    subjectHint: '主语：yo（我）',
    note: 'tener 将来时词干不规则变为 tendr-，加 -é → tendré。'
  },
  {
    id: 'f_hacer_1',
    verb: 'hacer',
    tense: 'futuro',
    personIndex: 2,
    sentence: 'Según las noticias, mañana ___ mucho calor.',
    zh: '据新闻说，明天会非常热。',
    subjectHint: '主语：无人称天气表达（第三人称单数）',
    note: 'hacer 将来时词干变为 har-，第三人称单数加 -á → hará。'
  },
  {
    id: 'f_poder_1',
    verb: 'poder',
    tense: 'futuro',
    personIndex: 3,
    sentence: 'Con práctica, nosotros ___ hablar español con fluidez.',
    zh: '只要多加练习，我们一定能流利地说西班牙语。',
    subjectHint: '主语：nosotros（我们）',
    note: 'poder 将来时去 e 变 podr-，nosotros 加 -emos → podremos。'
  },
  {
    id: 'f_ir_1',
    verb: 'ir',
    tense: 'futuro',
    personIndex: 0,
    sentence: 'Esta tarde ___ a la librería contigo.',
    zh: '今天下午我和你一起去书店。',
    subjectHint: '主语：yo（我）',
    note: 'ir 在将来时反而完全规则！原形 ir + é → iré。'
  },
  {
    id: 'f_ser_1',
    verb: 'ser',
    tense: 'futuro',
    personIndex: 2,
    sentence: 'Estoy seguro de que el viaje ___ inolvidable.',
    zh: '我相信这次旅行将会令人难忘。',
    subjectHint: '主语：el viaje（它 = él）',
    note: 'ser 在将来时完全规则：ser + á → será。'
  },
  {
    id: 'f_salir_1',
    verb: 'salir',
    tense: 'futuro',
    personIndex: 5,
    sentence: 'Los trenes ___ puntualísimos mañana por la mañana.',
    zh: '明天早上火车将会非常准点发车。',
    subjectHint: '主语：los trenes（它们 = ellos）',
    note: 'salir 将来时词干变为 saldr-，ellos 加 -án → saldrán。'
  }
];
