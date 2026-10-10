# CySC — Cybersecurity Club

An Arabic-first, static club website for member-authored cybersecurity writeups.
Built with Astro 7, TypeScript, Markdown content collections, and plain CSS. No
backend or client-side framework is required.

## Run locally

Requires Node.js 22.12.0 or newer.

```sh
npm install
npm run dev
```

Open http://localhost:4321. `npm run build` generates the static site in `dist/`;
`npm run preview` serves that production build locally. The build validates post
frontmatter; it does not run a separate TypeScript checker or browser tests.

## Pages and design

- `/`: club banner, illustrated introduction, contribution cards, recent posts,
  and a three-step guide to learning from the archive.
- `/blog/`: all published writeups.
- `/blog/[slug]/`: individual articles with headings, tags, and adjacent posts.
- `/blog/tags/`, `/blog/tags/[tag]/`, `/blog/categories/[category]/`: archives.
- The roadmap navigation links to `/#learning`; contact links to `/#contact`.
  Dedicated roadmap and contact pages are not implemented.

The reference-inspired design uses a white grid background, purple navigation,
rounded pastel panels, and a green landscape hero. Theme tokens and Markdown
styles live in `src/styles/global.css`; page-specific styles live alongside their
Astro markup. `ClubLandscape.astro` is a decorative SVG, requiring no image service
or browser JavaScript. The homepage adapts from two columns to a stacked layout.

## Add a writeup

1. Copy `src/content/blog/_template.md` to a kebab-case filename in that directory.
2. Fill in title, date, author, tags, category, and language. CTF posts require
   `difficulty`; bug bounty reports require `severity`; notes use neither.
   Add `authorImage` with an HTTPS or site-relative image URL to show a round avatar beside the author
   on blog cards and writeup pages. Add `authorSocials` for profile links in
   the writeup author panel; supported platforms are listed in the template.
3. Place screenshots in `src/img/` and reference them with relative Markdown
   paths, e.g. `../../img/example.png`. Astro optimizes these at build time.
4. Preview with `npm run dev`. Drafts are visible locally but excluded from builds.
5. Remove `draft: true`, run `npm run build`, and submit a pull request.

The filename determines the URL. Underscore-prefixed templates are never loaded.
Arabic is the default content language; set `lang: en` for English. Navigation
remains Arabic, while article direction follows the post. Code stays LTR.

## Identity and handover

Edit `src/config.ts` for club identity, email, repository links, and social/team
accounts. Keep interface text in both dictionaries in `src/i18n/ui.ts`. Homepage
counts and recent posts come directly from the content collection.

The university, email, and repository details still need the club's real values.
Before handing over, document the club-owned GitHub and hosting accounts and
transfer access to the incoming committee. Never commit credentials.

## Deployment and planned features

Cloudflare Pages is the intended host: use `npm run build` with output directory
`dist`. For a connected Git repository, a push to the configured production branch
triggers redeployment. Confirm the actual hosting setup with the account owner;
this repository does not configure it. Set the approved domain in
`astro.config.mjs` and add the security `_headers` described in `CLAUDE.md` before
public deployment.

Challenges belong in the separate CTFd installation, not in this repository.
Leaderboard integration, challenge administration, and team standings are not
implemented here. Their deployment and account procedures must be documented
when those services are connected.
