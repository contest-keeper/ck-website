# Contest Keeper – the easy plan

One line per step. The details for each step are in its own file (see [README.md](README.md)).

**Goal:** check that contest submissions are genuine – written by the contestant, without AI.
**First version:** prove each submission came from an official contest machine and the right contestant.

**Focus now:** the bootable stick, and the server that checks submissions against it (phases A–E).
The browser extension moves onto the same server later (phase X). A separate app may come after that.

---

## The names

| Product | What it does |
|---|---|
| **Contest Keeper** | The whole project. Everything else is "Keeper something". |
| **Keeper OS** | The bootable contest system: the image and the agent that runs on it |
| **Keeper Forge** | The admin tool that forges the sticks: settings, branding, writing USB drives |
| **Keeper Hub** | The server everything reports to: watches the contest, checks every submission, shows the dashboard |
| **Keeper Extension** | The browser extension |

## The repositories

Contest Keeper is open source. Everything lives in the GitHub organization
**[github.com/contest-keeper](https://github.com/contest-keeper)** (the name was free on 2026-11-10).

**Rule (like Safe Exam Browser's `seb-*`):** one repository per product, named `ck-<part>`
(`ck` = Contest Keeper), all lowercase. Folders on disk use the same names (`D:\ck-<part>`), and so do
the programs. Display names stay friendly: "Keeper OS", "Keeper Hub", …

| Repository | Program | What it is | Language | Status |
|---|---|---|---|---|
| `contest-keeper/.github` | – | The organization's front page (`profile/README.md`), contributing guide, code of conduct, security policy, templates | Markdown | New |
| `contest-keeper/ck-website` | – | Website and documentation; also holds this plan and the decision records | Markdown | New |
| `contest-keeper/ck-protocol` | – | Shared Rust code used by OS, Forge and Hub: settings format, events, signing, image tools | Rust | New |
| `contest-keeper/ck-os` | `ck-agent` | Keeper OS: the image patch and the agent on the stick | Rust | New (today's `D:\contest-keeper-app` folder, to be renamed) |
| `contest-keeper/ck-forge` | `ck-forge` | Keeper Forge: the admin tool that makes sticks | Rust (+ Tauri window later) | New |
| `contest-keeper/ck-hub` | `ck-hub` | Keeper Hub: server + dashboard. Later also serves the extension. | Rust (+ Svelte dashboard) | New |
| `contest-keeper/ck-hub-setup` | – | Ready-to-run Docker deployment of Keeper Hub for organizers | Docker Compose | New |
| `contest-keeper/ck-extension` | – | Keeper Extension | TypeScript + Svelte | Exists as `robbertpopa/contest-keeper` – moved and renamed |
| `contest-keeper/ck-backend` | – | Today's .NET server for the extension | .NET 10 | Exists as `robbertpopa/contest-keeper-backend` – moved, then archived after phase X |
| `contest-keeper/ck-app` | – | A future app (name reserved) | – | Later |

**Shared code:** `ck-protocol` is released with version tags; OS, Forge and Hub each pin a version.
A protocol change = a new `ck-protocol` release first, then OS, Forge and Hub update to it.

**Not in Git:** disk images live in `D:\ck-images\` – the original is renamed
`rcpc-2026-original.img`; built bases are called `ck-os-base-<yyyy.mm>.img`. Images are big and
partly made from the contest's own image, so they are shared as release downloads, not in Git.

---

## P0.0 – Tidy up the repositories (first, when you say so)
1. **You** create the GitHub organization `contest-keeper`.
2. Move the extension: transfer `robbertpopa/contest-keeper` to the organization and rename it `ck-extension`; folder `D:\contest-keeper` → `D:\ck-extension`.
3. Move the backend: transfer `robbertpopa/contest-keeper-backend` to the organization as `ck-backend`; folder → `D:\ck-backend`.
4. Move the 30 GB image out of the extension folder into `D:\ck-images\` as `rcpc-2026-original.img`. (The old copies and the VirtualBox `vm` folder are already deleted.)
5. Rename this folder `D:\contest-keeper-app` → `D:\ck-os` and push it to `contest-keeper/ck-os`.
6. Create `ck-protocol`, `ck-forge`, `ck-hub`, `ck-hub-setup`, `ck-website` (move this plan there) and `.github`.
7. Open-source basics in each repository: license, README, contributing guide, code of conduct, security policy.
8. Fix links between the repos, Actions secrets, branch protection and Google sign-in settings after the moves.

---

## P0 – Get ready
*At the end: a clean project that builds itself and checks itself.*

1. **Repository** – set up the project folder and bring in what we already made.
2. **Tools** – make sure everyone builds the code the same way.
3. **Automatic checks** – every change gets tested automatically.
4. **Write down decisions** – short notes on *why* we chose things.

## A – The stick
*At the end: you make a stick with your settings, and it boots on a real laptop.*

1. **Settings format** – decide exactly what an admin can set.
2. **Keys** – every stick gets its own secret key.
3. **Image tool** – put the settings into the image file.
4. **Admin logic** – the brain of the admin tool.
5. **Admin command** – make a contest image with one command.
6. **Agent** – the stick applies the settings when it starts.
7. **Image patch** – our additions and speed fixes, added to your image once.
8. **VM test** – one command boots the stick in a virtual PC and says PASS or FAIL.
9. **Real laptops** – try it on 2–3 real laptops.

## B – Who is logged in?
*At the end: you see which user is on which stick – only after a successful login.*

1. **Watch a real login** – you log into Kilonova; we note what the website sends (never the password).
2. **Listener** – a small helper that watches login traffic on the stick.
3. **Login rule** – "login worked → note the username".
4. **Fresh login** – after every restart, the user must log in again.
5. **Sending** – the stick sends the login to the server, safely, even if the network drops.
6. **Small server** – a simple page that shows stick → user.
7. **Full test** – good login, wrong password, switching accounts, restart.

## C – The real server and dashboard
*At the end: organizers watch every stick and user live, in a browser.*

1. **Database** – keep everything safely.
2. **Organizer logins** – only organizers can see the dashboard.
3. **Live updates** – changes appear instantly.
4. **Dashboard** – the web page organizers look at.
5. **Shared types** – server and dashboard always speak the same language.
6. **Put it online** – run the server somewhere with HTTPS.

## D – Submissions
*At the end: every submission sent from a stick shows up, and nothing can sneak around the check.*

1. **Watch a real submission** – see what the website sends.
2. **Submission rule** – "submission sent → note problem, language, code fingerprint".
3. **Send submissions** – they appear on the dashboard.
4. **Lock the network** – nothing on the stick can reach the internet around our check.
5. **Server down?** – admin chooses: block submissions, or allow them and note the gap.

## E – Catching problems
*At the end: a submission made from another PC raises an alert within a minute.*

1. **Platform watcher** – the server reads all submissions from the contest site.
2. **Kilonova connection** – the first real platform.
3. **Matching** – every contest submission must match one from a stick.
4. **Alerts** – clear warnings naming the stick and the user.
5. **Dashboard screens** – see matched and suspicious submissions.

## F – The admin app
*At the end: you prepare a whole contest from one window.*

1. **Stick writer** – write USB sticks directly, safely.
2. **The window** – the admin app with pages for every setting.
3. **Many sticks at once** – one stick per team from a team list.
4. **Extra options** – Wi-Fi, block other USB sticks, languages, keyboard, A4 printing…
5. **Installer** – install the app without warnings.

## G – More contest sites
1. **Codeforces**
2. **vJudge**

## X – The extension moves to the new server
*At the end: one server for everything; the old .NET backend is switched off.*

1. **List what the old backend does** – every endpoint the extension uses.
2. **Accounts** – sign-up, sign-in, Google sign-in, password reset on the new server; existing passwords keep working.
3. **Rooms and invitations** – the same features on the new server.
4. **Switch the extension** – point it at the new server and test every screen.
5. **Move the data and retire the old backend.**

## H – Make it solid
*At the end: ready for a real contest.*

1. **Stronger keys**
2. **Settings that can't be secretly edited**
3. **Talk only to the real server**
4. **New keys for every contest**
5. **Optional: send recordings to the server**
6. **Security review**
7. **Guides** – for organizers, proctors and contestants
8. **First release**

---

## Later – the app
A separate app may come after phase X (`ck-app`). Not planned in detail yet.

---

**First version good enough for a real contest:** after **E** (use Rufus to write sticks until **F** is done).

**Order:** P0.0 → P0 → A → B → C → D → E → F → G → X → H. (X can start earlier if the extension needs it.)
