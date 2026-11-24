#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const requiredFiles = ['index.html', 'styles.css', 'data.js', 'app.js'];

const errors = [];

for (const file of requiredFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) {
    errors.push(`Missing required file: ${file}`);
  }
}

if (errors.length) {
  console.error('Validation failed:\n' + errors.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}

// 1. Validate data.js structure & linguistic dataset integrity
const dataCode = fs.readFileSync(path.join(root, 'data.js'), 'utf8');
const ctx = {};
vm.createContext(ctx);
vm.runInContext(
  dataCode +
    '; this.PERSONS = PERSONS; this.TENSE_META = TENSE_META; this.VERBS = VERBS; this.SENTENCES = SENTENCES;',
  ctx
);

const tenses = Object.keys(ctx.TENSE_META);
const verbs = Object.values(ctx.VERBS);

if (!Array.isArray(ctx.PERSONS) || ctx.PERSONS.length !== 6) {
  errors.push('PERSONS must contain exactly 6 entries.');
}

for (const v of verbs) {
  if (v.tier !== 'common' && v.tier !== 'extended') {
    errors.push(`Verb "${v.infinitive}" has invalid tier "${v.tier}".`);
  }
  for (const t of tenses) {
    const forms = v.conjugations && v.conjugations[t];
    if (!Array.isArray(forms) || forms.length !== 6) {
      errors.push(`Verb "${v.infinitive}" missing 6 conjugations for tense "${t}".`);
    } else if (forms.some((f) => typeof f !== 'string' || !f.trim())) {
      errors.push(`Verb "${v.infinitive}" has an empty form in tense "${t}".`);
    }
  }
}

const sentenceIds = new Set();
for (const s of ctx.SENTENCES) {
  if (sentenceIds.has(s.id)) {
    errors.push(`Duplicate sentence id: ${s.id}`);
  }
  sentenceIds.add(s.id);

  if (!ctx.VERBS[s.verb]) {
    errors.push(`Sentence "${s.id}" references unknown verb "${s.verb}".`);
  }
  if (!ctx.TENSE_META[s.tense]) {
    errors.push(`Sentence "${s.id}" references unknown tense "${s.tense}".`);
  }
  if (typeof s.personIndex !== 'number' || s.personIndex < 0 || s.personIndex > 5) {
    errors.push(`Sentence "${s.id}" has invalid personIndex: ${s.personIndex}`);
  }
  const blankCount = (s.sentence.match(/___/g) || []).length;
  if (blankCount !== 1) {
    errors.push(`Sentence "${s.id}" must contain exactly one "___" blank (found ${blankCount}).`);
  }
}

// 2. Validate all DOM IDs referenced in app.js exist in index.html
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const htmlIds = new Set([...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]));
const jsIds = [...appJs.matchAll(/\$\('([^']+)'\)/g)].map((m) => m[1]);
const dynamicIds = new Set(['inlineBlank']);

for (const id of new Set(jsIds)) {
  if (!htmlIds.has(id) && !dynamicIds.has(id)) {
    errors.push(`app.js references missing HTML id: "${id}"`);
  }
}

if (errors.length) {
  console.error('Validation failed:\n' + errors.map((e) => ` - ${e}`).join('\n'));
  process.exit(1);
}

const commonVerbs = verbs.filter((v) => v.tier === 'common').length;
const extendedVerbs = verbs.filter((v) => v.tier === 'extended').length;

console.log(
  `Validation passed: ${verbs.length} verbs (${commonVerbs} common + ${extendedVerbs} extended), ${ctx.SENTENCES.length} sentences, ${new Set(jsIds).size} DOM bindings verified.`
);
