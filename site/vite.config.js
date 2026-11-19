import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  if (env.VITE_FORGE_CHANNEL === 'dev' && !env.VITE_HUB_URL?.trim()) {
    throw new Error('Set VITE_HUB_URL (HUB_URL in the develop workflow) for the develop site.');
  }

  return {
    base: './',
    plugins: [svelte()],
  };
});
