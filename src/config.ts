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
