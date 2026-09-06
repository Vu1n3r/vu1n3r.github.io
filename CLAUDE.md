# Cybersecurity Club Website

The club's public archive, scoreboard, and identity. NOT a training platform —
training lives on THM/HTB and the roadmap links out to it. What this site
uniquely offers: original member-authored writeups, a leaderboard of people who
know each other, and an archive that outlives each year's committee.

## Stack

- **Astro**, static output. Zero client JS by default.
- **React islands** only where genuinely interactive. Currently that's only the
  leaderboard. Do not reach for a component when static HTML works.
- **Content collections** with Zod schemas for all Markdown. A malformed post
  must fail the build, not render broken.
- **Source on GitHub**, build + deploy via **Cloudflare Pages**, PR previews on.
- **CTFd** hosts challenges on a separate VPS/subdomain. Not in this repo.

## Sections

| Section | Notes |
|---|---|
| Home | Intro, vision, achievements. Omit achievements until we have some. |
| Blog | CTF writeups, study notes. Markdown in `src/content/blog/`. |
| Leaderboard | Reads CTFd via a Pages Function. Never call CTFd from the client. |
| Roadmap | Curated external links, basics → advanced. Each entry has a last-checked date. |
| Contact | Simple form → Formspree/Web3Forms. Never send mail from our own server. |
| Team | HTB university team + CTFtime standings. |

## Build order

Home + Blog + Roadmap first, then ship. Contact next. Leaderboard LAST, only
once CTFd is populated. Don't scaffold ahead of this order.

## Rules

- Static by default; justify any client-side JS.
- Server-side only: CTFd base URL, API tokens, form endpoints with secrets.
- Never validate a flag client-side. Ever.
- Ship a `_headers` file with CSP, HSTS, X-Frame-Options, X-Content-Type-Options.
- Set `site` (and `base` if deploying to a subpath) in `astro.config.mjs`.
- Optimize images via Astro's `<Image />` — writeups are screenshot-heavy.
- Keep `src/content/blog/_template.md` current with the schema.
- Everything must be handover-friendly. If a step isn't in the README, it
  doesn't exist.

## Blog post schema

```ts
{
  title: string
  date: date
  author: string
  tags: string[]
  ctf?: string
  difficulty: 'easy' | 'medium' | 'hard'
  draft?: boolean   // default false
}
```

## Conventions

- Filenames: `kebab-case.md`, slug derives from filename.
- Commit per logical unit; don't batch unrelated changes.
- README must cover: add a post, add a challenge, redeploy, hand over accounts.
