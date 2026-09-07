/**
 * Single source of truth for anything that appears in more than one place.
 *
 * Rule for this file: if a page needs the club's name, a handle, or an
 * external link, it imports it from here. Nothing gets hardcoded into a
 * template. When the committee changes hands, this is the file the next
 * person edits — see the handover section of the README.
 */

/**
 * Club identity. Anything the reader sees in their own language is keyed by
 * locale; anything language-neutral (an address, a year, a handle) is not.
 */
export const site = {
  name: {
    en: 'Cybersecurity Club',
    ar: 'نادي الأمن السيبراني',
  },
  /** Used in the nav and anywhere space is tight. Same in both languages. */
  shortName: 'CySC',
  university: {
    en: 'University',
    ar: 'الجامعة',
  },
  tagline: {
    en: 'We break things on purpose, then write down how.',
    ar: 'نكسر الأشياء عن قصد، ثم نكتب كيف فعلنا ذلك.',
  },
  description: {
    en: 'The cybersecurity club archive: member-authored CTF writeups, a learning roadmap, and our competition record.',
    ar: 'أرشيف نادي الأمن السيبراني: شروحات مسابقات كتبها الأعضاء، وخارطة طريق للتعلم، وسجل مشاركاتنا.',
  },
  /** Public contact address. Never a personal one — this outlives its owner. */
  email: 'contact@example.edu',
  /** Year the club was founded, for the footer copyright range. */
  founded: 2026,
} as const;

/**
 * Languages a writeup may be written in.
 *
 * `dir` drives the `dir` attribute on <html>: an English writeup renders its
 * whole page left-to-right. Nothing else in the codebase branches on a
 * language code.
 *
 * `htmlLang` is what goes in a lang attribute; keep it a valid BCP 47 tag.
 */
export const locales = {
  ar: { label: 'Arabic', nativeLabel: 'العربية', htmlLang: 'ar', dir: 'rtl' },
  en: { label: 'English', nativeLabel: 'English', htmlLang: 'en', dir: 'ltr' },
} as const;

export type Locale = keyof typeof locales;

/**
 * The site's language. All chrome — nav, footer, page headings — renders in
 * this one language; there is no language switcher.
 *
 * A writeup may still be written in another language: its `lang` frontmatter
 * sets the direction of the page it appears on. See `locales` above.
 */
export const siteLocale: Locale = 'ar';

/**
 * Primary navigation. Order here is the order rendered.
 *
 * `key` is a string key from src/i18n/ui.ts rather than a literal label, so
 * the wording of the whole nav lives in one file with the rest of the UI
 * text instead of being split between here and there.
 */
export const nav = [
  { key: 'nav.home', href: '/' },
  { key: 'nav.blog', href: '/blog/' },
  { key: 'nav.roadmap', href: '/roadmap/' },
  { key: 'nav.contact', href: '/contact/' },
] as const;

/**
 * The kinds of writing the blog holds. Order here is the order rendered.
 *
 * This list is the single source of truth: src/content.config.ts builds the
 * frontmatter enum from it, so a category that exists here is immediately
 * valid in a post and one that does not fails the build. Adding a category
 * means an entry here plus its label in both dictionaries in src/i18n/ui.ts.
 *
 * `slug` is the URL segment and the frontmatter value. Do not rename one
 * after posts start using it — that breaks their archive URLs.
 */
export const categories = [
  { slug: 'ctf', key: 'category.ctf', scale: 'difficulty' },
  { slug: 'bugbounty', key: 'category.bugbounty', scale: 'severity' },
  { slug: 'notes', key: 'category.notes', scale: null },
] as const;

export type CategorySlug = (typeof categories)[number]['slug'];

/** Frontmatter enum values, derived so the schema cannot drift from the list. */
export const categorySlugs = categories.map((c) => c.slug) as [
  CategorySlug,
  ...CategorySlug[],
];

/**
 * How a post is rated, by category.
 *
 * A CTF writeup carries a difficulty; a bug bounty report carries a severity.
 * Same mechanic — one ordered scale rendered as one coloured chip — but they
 * measure different things, so they are separate frontmatter fields and a post
 * carries exactly the one its category calls for. Study notes carry neither:
 * `scale: null` above, and the schema rejects both fields on them.
 *
 * Each scale is listed the way its field is conventionally read — difficulty
 * easiest-first, severity worst-first — and severity uses the words a triage
 * team already uses (HackerOne, CVSS) rather than club-local wording.
 */
export const scales = {
  difficulty: ['easy', 'medium', 'hard'],
  severity: ['critical', 'high', 'medium', 'low', 'info'],
} as const;

export type ScaleName = keyof typeof scales;

/** The scale a category rates on, or null if it is not rated. */
export type CategoryScale = (typeof categories)[number]['scale'];

export type Difficulty = (typeof scales)['difficulty'][number];
export type Severity = (typeof scales)['severity'][number];

/** Frontmatter enum values, derived so the schema cannot drift from `scales`. */
export const difficultyLevels = [...scales.difficulty] as [
  Difficulty,
  ...Difficulty[],
];
export const severityLevels = [...scales.severity] as [Severity, ...Severity[]];

/**
 * External presence. `handle` is displayed, `url` is linked.
 * Set url to null to hide an entry without deleting the record of it.
 */
export const socials = [
  { label: 'GitHub', handle: '@cysc', url: 'https://github.com/cysc' },
  { label: 'Discord', handle: 'CySC', url: null },
  { label: 'Instagram', handle: '@cysc', url: null },
] as const;

/**
 * Competition identities. The Team page renders standings from these once it
 * exists; until then they are the record of which accounts are club-owned.
 */
export const teams = {
  ctftime: {
    label: 'CTFtime',
    teamName: 'CySC',
    /** Numeric team id from the CTFtime URL, or null until we register. */
    teamId: null as number | null,
    get url() {
      return this.teamId ? `https://ctftime.org/team/${this.teamId}` : null;
    },
  },
  hackthebox: {
    label: 'HackTheBox',
    teamName: 'CySC',
    /** University team id from the HTB URL, or null until we create it. */
    teamId: null as number | null,
    get url() {
      return this.teamId
        ? `https://app.hackthebox.com/universities/overview/${this.teamId}`
        : null;
    },
  },
  tryhackme: {
    label: 'TryHackMe',
    teamName: 'CySC',
    teamId: null as string | null,
    get url() {
      return this.teamId ? `https://tryhackme.com/team/${this.teamId}` : null;
    },
  },
} as const;

/** Where writeups are submitted. Linked from the blog index. */
export const repo = {
  url: 'https://github.com/cysc/cysc-website',
  newPostUrl:
    'https://github.com/cysc/cysc-website/new/main/src/content/blog',
} as const;
