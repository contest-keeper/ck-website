import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { rootsOf, BUILD_ONLY, BUNDLED_DEV } from './roots.mjs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

test('every runtime dependency and svelte get a licence entry', () => {
  const roots = rootsOf(pkg);
  for (const name of [...Object.keys(pkg.dependencies), ...BUNDLED_DEV]) assert.ok(roots.includes(name), name);
});

test('an unclassified new devDependency fails instead of being dropped', () => {
  assert.throws(() => rootsOf({ ...pkg, devDependencies: { ...pkg.devDependencies, 'some-new-lib': '1' } }), /some-new-lib/);
});

test('the classification lists name no package that left package.json', () => {
  const all = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  for (const name of [...BUILD_ONLY, ...BUNDLED_DEV]) assert.ok(all.includes(name), `stale: ${name}`);
});
