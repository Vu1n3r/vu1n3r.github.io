/**
 * Single source of truth for anything that appears in more than one place.
 *
 * Rule for this file: if a page needs the club's name, a handle, or an
 * external link, it imports it from here. Nothing gets hardcoded into a
 * template. When the committee changes hands, this is the file the next
 * person edits — see the handover section of the README.
 */

export const site = {
  name: 'Cybersecurity Club',
  /** Used in the nav and anywhere space is tight. */
  shortName: 'CySC',
  university: 'University',
  tagline: 'We break things on purpose, then write down how.',
  description:
    'The cybersecurity club archive: member-authored CTF writeups, a learning roadmap, and our competition record.',
  /** Public contact address. Never a personal one — this outlives its owner. */
  email: 'contact@example.edu',
  /** Year the club was founded, for the footer copyright range. */
  founded: 2026,
} as const;

/**
 * Languages a writeup may be written in.
 *
 * `dir` drives the `dir` attribute on <html>, so adding a language here is
 * all that is needed for it to render in the correct direction — nothing
 * else in the codebase branches on a language code.
 *
 * `htmlLang` is what goes in the lang attribute; keep it a valid BCP 47 tag.
 */
export const locales = {
  en: { label: 'English', nativeLabel: 'English', htmlLang: 'en', dir: 'ltr' },
  ar: { label: 'Arabic', nativeLabel: 'العربية', htmlLang: 'ar', dir: 'rtl' },
} as const;

export type Locale = keyof typeof locales;

/** Used for site chrome and for any post that does not declare a language. */
export const defaultLocale: Locale = 'en';

/** Primary navigation. Order here is the order rendered. */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Roadmap', href: '/roadmap/' },
  { label: 'Contact', href: '/contact/' },
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
