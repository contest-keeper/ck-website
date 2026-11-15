# ck-website

Website and documentation for Contest Keeper.

The landing page is a Svelte and Vite app in `site/`. It links to the latest Keeper Forge installer.

```sh
cd site
pnpm install
pnpm dev      # local server
pnpm build    # writes site/dist
```

A merge to `develop` deploys the develop site, which also offers the newest develop build of Forge;
a release publishes the public site to GitHub Pages. The infrastructure for the develop site is in
[ck-infra](https://github.com/contest-keeper/ck-infra) (`infra/website`).

Work in progress.
