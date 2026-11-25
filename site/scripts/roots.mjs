// Which packages end up in the built site, taken from package.json so a new dependency cannot be forgotten.
// Build tools are not shipped; svelte is a devDependency but its runtime is bundled into the page.
export const BUILD_ONLY = ['vite', '@sveltejs/vite-plugin-svelte'];
export const BUNDLED_DEV = ['svelte'];

export function rootsOf(pkg) {
  // Fails the build when a new devDependency has not been classified, instead of silently dropping its licence.
  const unknown = Object.keys(pkg.devDependencies ?? {}).filter((n) => !BUILD_ONLY.includes(n) && !BUNDLED_DEV.includes(n));
  if (unknown.length) throw new Error(`Classify in scripts/roots.mjs (shipped or build-only): ${unknown.join(', ')}`);
  return [...Object.keys(pkg.dependencies ?? {}), ...BUNDLED_DEV];
}
