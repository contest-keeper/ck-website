// Apply the saved look and theme before first paint, so the page never flashes the wrong one.
try {
  const l = localStorage.getItem('ck-look');
  const m = localStorage.getItem('ck-mode');
  const d = document.documentElement.dataset;
  d.look = l === 'classic' ? 'classic' : 'modern';
  d.mode = m === 'dark' || m === 'light' ? m : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
} catch {
  document.documentElement.dataset.look = 'modern';
  document.documentElement.dataset.mode = 'light';
}
