import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const app = readFileSync(new URL('../src/App.svelte', import.meta.url), 'utf8');
const csp = html.match(/http-equiv="Content-Security-Policy"\s+content="([^"]+)"/)?.[1];

test('the page carries a CSP with no inline allowance', () => {
  assert.ok(csp, 'missing CSP meta tag');
  assert.ok(!/unsafe-inline|unsafe-eval/.test(csp));
});

test('connect-src allows every host the page fetches from', () => {
  const connect = csp.match(/connect-src ([^;]+)/)[1].split(' ');
  const hosts = [...app.matchAll(/'(https:\/\/[^'/]+)[^']*'/g)].map((m) => m[1]);
  // links to github.com are navigation, not fetches; only the API host is fetched
  const fetched = hosts.filter((h) => app.includes(`'${h}`) && /api\./.test(h));
  assert.ok(fetched.length > 0);
  for (const h of fetched) assert.ok(connect.includes(h), `${h} blocked by connect-src`);
});
