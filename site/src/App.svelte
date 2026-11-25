<script>
  import { onMount } from 'svelte';
  import logo from './logo.svg';

  // Change these in one place.
  const HOLDER = 'Robert Popa';
  const YEARS = '2026';
  const RELEASES = 'https://github.com/contest-keeper/ck-forge/releases';
  // The develop site links to the latest develop build through the Hub, which sends visitors to a short-lived
  // link on private Azure storage (the forge pipeline puts the file there); the real site offers the latest
  // release on GitHub. The channel is set when the site is built.
  const DEV = import.meta.env.VITE_FORGE_CHANNEL === 'dev';
  const API = DEV
    ? '/downloads/forge/latest.json'
    : 'https://api.github.com/repos/contest-keeper/ck-forge/releases/latest';
  const HUB = import.meta.env.VITE_HUB_URL?.trim().replace(/\/+$/, '');
  // The installer keeps this name in every release, so this link always gives the newest one.
  const INSTALLER = DEV
    ? `${HUB}/download/forge`
    : `${RELEASES}/latest/download/keeper-forge-setup-x64.exe`;

  let licences;
  let licencesOpen = $state(false);

  function closeLicences() {
    if (!licencesOpen) return;
    licences.open = false;
    licences.querySelector('summary').focus();
  }

  function onKeydown(event) {
    if (event.key === 'Escape') closeLicences();
  }

  function onPointerdown(event) {
    if (licencesOpen && !licences.contains(event.target)) licences.open = false;
  }

  // The macOS build keeps this name in every release, like the Windows installer does.
  const MAC_ASSET = 'keeper-forge-macos-universal.dmg';

  let release = $state('Latest release');
  // Until a release exists the buttons open the releases page instead of a missing file. The macOS button
  // stays on that page until a release really carries a macOS file: the develop channel has none, and
  // not every release has one.
  let download = $state(RELEASES);
  let downloadMac = $state(RELEASES);

  onMount(async () => {
    try {
      const res = await fetch(API, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) return;
      const json = await res.json();
      const tag = DEV ? json.version : json.tag_name;
      if (typeof tag === 'string' && /^[\w .+-]{1,40}$/.test(tag)) {
        release = DEV ? `Develop build ${tag}` : `Latest release ${tag}`;
        download = INSTALLER;
        if (!DEV && json.assets?.some((asset) => asset?.name === MAC_ASSET)) {
          downloadMac = `${RELEASES}/latest/download/${MAC_ASSET}`;
        }
      }
    } catch {
      /* keep the plain text */
    }
  });
</script>

<svelte:window onkeydown={onKeydown} onpointerdown={onPointerdown} />

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
        <div class="osgrid">
          <div class="os">
            <a class="bt" href={download}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M0 3.449 9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.8" /></svg>
              Download for Windows
            </a>
            <span class="meta faint">Windows 10 or newer, 64-bit</span>
          </div>
          <div class="os">
            <a class="bt" href={downloadMac}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" /></svg>
              Download for macOS
            </a>
            <span class="meta faint">Apple silicon and Intel</span>
          </div>
        </div>
        <span class="meta first"><span class="dot"></span>{release} &middot; free and open source</span>
        {#if DEV}
          <a class="meta os-link" href={`${HUB}/download/image`}>Sign in to download Keeper OS</a>
        {:else}
          <span class="meta faint">Keeper OS images are downloaded from your Hub after you sign in</span>
        {/if}
      </div>
    </section>
  </main>

  <footer>
    <details class="lic" bind:this={licences} ontoggle={() => (licencesOpen = licences.open)}>
      <summary aria-expanded={licencesOpen}>Licences</summary>
      <div class="licbody">
        <p>
          Contest Keeper (Forge, Hub, the agent and this site) is licensed under the
          <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache License 2.0</a>. The code we depend on is limited to
          permissive licences (MIT, Apache-2.0, BSD, ISC), checked on every change.
        </p>
        <p>
          Keeper OS is built from free software that runs as separate programs: the Linux kernel, the GNU tools, Squid,
          XFCE, Firefox, VSCodium, Code::Blocks and Geany. Their licences, mostly GPL, are kept inside the image. Every
          image comes with a written offer of its source code, next to the download on your Hub. Proprietary software is
          never part of a published image.
        </p>
        <p>
          <a href="THIRD-PARTY-LICENSES.txt">Licences of the packages this site is built from</a>. The Hub and Forge
          carry their own list with every release.
        </p>
      </div>
    </details>
    <span>Copyright &copy; {YEARS} {HOLDER}</span>
  </footer>
</div>
