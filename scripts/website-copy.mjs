import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';

const content = new URL('../src/data/fluvio/content/', import.meta.url);
const combined = new URL('../website-copy.json', import.meta.url);
const readJson = (file) => JSON.parse(readFileSync(file, 'utf8'));
const formatOptions = await resolveConfig(fileURLToPath(combined));
const writeJson = async (file, value) => {
  const formatted = await format(JSON.stringify(value), { ...formatOptions, parser: 'json' });
  writeFileSync(file, formatted);
};

const records = Object.fromEntries(
  ['site', 'expertise', 'projects', 'team'].map((section) => {
    const files = readdirSync(new URL(section + '/', content))
      .filter((file) => file.endsWith('.json'))
      .sort();
    const entries = files.map((file) => [file.slice(0, -5), readJson(new URL(section + '/' + file, content))]);
    return [section, Object.fromEntries(entries)];
  })
);

function checkCopy(original, edited, path) {
  if (Array.isArray(original)) {
    if (!Array.isArray(edited) || original.length !== edited.length) throw new Error(`Array changed at ${path}`);
    original.forEach((entry, index) => checkCopy(entry, edited[index], `${path}.${index}`));
  } else if (original && typeof original === 'object') {
    if (!edited || typeof edited !== 'object' || Array.isArray(edited)) throw new Error(`Expected object at ${path}`);
    const keys = Object.keys(original);
    if (keys.length !== Object.keys(edited).length) throw new Error(`Fields changed at ${path}`);
    keys.forEach((key) => checkCopy(original[key], edited[key], `${path}.${key}`));
  } else if (typeof original === 'string') {
    if (typeof edited !== 'string' || !edited.trim()) throw new Error(`Expected text at ${path}`);
  } else if (original !== edited) {
    throw new Error(`Non-text value changed at ${path}`);
  }
}

switch (process.argv[2]) {
  case 'export':
    await writeJson(combined, records);
    break;
  case 'import': {
    const edits = readJson(combined);
    checkCopy(records, edits, 'website-copy');
    for (const [section, entries] of Object.entries(edits)) {
      for (const [name, record] of Object.entries(entries)) {
        if (JSON.stringify(records[section][name]) !== JSON.stringify(record)) {
          await writeJson(new URL(`${section}/${name}.json`, content), record);
        }
      }
    }
    break;
  }
  default:
    throw new Error('Choose export or import.');
}
