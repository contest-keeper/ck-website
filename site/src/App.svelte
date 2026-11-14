<script>
  import { onMount } from 'svelte';
  import logo from './logo.svg';

  // Change these in one place.
  const HOLDER = 'Robert Popa';
  const YEARS = '2026';
  const RELEASES = 'https://github.com/contest-keeper/ck-forge/releases';
  // The installer keeps this name in every release, so this link always gives the newest one.
  const INSTALLER = `${RELEASES}/latest/download/keeper-forge-setup-x64.exe`;

  let release = $state('Latest release');
  // Until a release exists the button opens the releases page instead of a missing file.
  let download = $state(RELEASES);

  onMount(async () => {
    try {
      const res = await fetch('https://api.github.com/repos/contest-keeper/ck-forge/releases/latest', {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) return;
      const tag = (await res.json()).tag_name;
      if (typeof tag === 'string' && /^[\w.+-]{1,24}$/.test(tag)) {
        release = `Latest release ${tag}`;
        download = INSTALLER;
      }
    } catch {
      /* keep the plain text */
    }
  });
</script>

<div class="ck">
  <input type="checkbox" id="th" aria-label="Old look" />

  <div class="glow" aria-hidden="true"></div>

  <header>
    <span class="brand">Contest Keeper</span>
    <span class="tools">
      <label class="sw" for="th">
        <span class="n">New</span><span class="trk"><i></i></span><span class="o">Old</span>
      </label>
      <a class="gh" href="https://github.com/contest-keeper" aria-label="Contest Keeper on GitHub">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" /></svg>
      </a>
    </span>
  </header>

  <main>
    <section class="pg">
      <div class="fl appicon" aria-hidden="true"><img src={logo} alt="" /></div>
      <h1 class="rv rv2">Contest Keeper<span class="cur" aria-hidden="true">_</span></h1>
      <p class="rv rv3 sub">Build contest computers on USB sticks, and watch every one from your Hub</p>
      <div class="rv rv4 cta">
        <a class="bt" href={download}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true"><path d="M12 3v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" /><path d="M8.5 10.5 12 13.9l3.5-3.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /><path d="M5 17.5v2.5h14V17.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
          Download Forge
        </a>
        <span class="meta first"><span class="dot"></span>{release} &middot; free and open source</span>
        <span class="meta faint">Requires Windows 10 or newer &middot; <a href="{RELEASES}/latest">checksums and verification</a></span>
      </div>
    </section>
  </main>

  <footer>Copyright &copy; {YEARS} {HOLDER}</footer>
</div>
