import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');

test('the release download links to SHA256SUMS and hard-codes no hash', () => {
  assert.match(app, /releases\/latest\/download\/SHA256SUMS|RELEASES\}\/latest\/download\/SHA256SUMS/);
  assert.ok(!/\b[0-9a-f]{64}\b/i.test(app));
});
