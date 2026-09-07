import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import {
  categories,
  categorySlugs,
  difficultyLevels,
  scales,
  severityLevels,
} from './config';

/**
 * Blog collection — CTF writeups and study notes.
 *
 * Every file in src/content/blog/ is validated against `schema` at build time.
 * If a member's frontmatter is wrong, the BUILD FAILS. That is deliberate:
 * a broken post should never reach production, and the PR preview build on
 * Cloudflare will go red before a human has to notice it in review.
 *
 * Note the negated pattern: unlike Astro's old content-collections API, the
 * glob loader does NOT skip files starting with `_`. Without `!**\/_*.md`,
 * `_template.md` would be loaded and published as a real post.
 */
const blog = defineCollection({
  loader: glob({
    base: './src/content/blog',
    pattern: ['**/*.md', '!**/_*.md'],
  }),
  schema: z
    .object({
      title: z.string().min(1, 'title is required'),

      // Written as YAML `date: 2026-03-14`. coerce.date() also accepts a
      // quoted string, so members can't break the build with "2026-03-14".
      date: z.coerce.date(),

      // The name the writeup is credited to. This is the portfolio value —
      // never publish a writeup without one.
      author: z.string().min(1, 'author is required'),

      tags: z
        .array(z.string())
        .min(1, 'add at least one tag, e.g. [web, sqli]'),

      // Which CTF/event this came from. Omit for standalone study notes.
      ctf: z.string().optional(),

      // What kind of writing this is: a CTF writeup, a bug bounty report, a
      // set of study notes. Required with no default — a default would
      // silently mislabel every post whose author forgot the key, and the
      // field is only worth having if it can be trusted. Values come from
      // `categories` in src/config.ts.
      category: z.enum(categorySlugs),

      // How the post is rated. Which of these two a post carries is decided
      // by its category, not by the author's preference — see the check
      // below. Both are optional here so that the cross-field rule can
      // report a useful message instead of zod complaining about the wrong
      // one. Values come from `scales` in src/config.ts.
      difficulty: z.enum(difficultyLevels).optional(),
      severity: z.enum(severityLevels).optional(),

      // Language the post is written in. Drives the lang and dir attributes
      // on the article — 'ar' renders it right-to-left. Defaults to Arabic,
      // the club's primary language, so an English post must say so
      // explicitly. Keep in sync with `locales` in src/config.ts.
      lang: z.enum(['ar', 'en']).default('ar'),

      // Drafts stay in the repo but are filtered out of every listing and
      // are not built as pages.
      draft: z.boolean().default(false),
    })
    // Reject unknown keys. Catches typos like `titel:` or `tag:` in a PR
    // instead of silently dropping the value.
    .strict()
    /**
     * A post is rated on exactly the scale its category calls for.
     *
     * A CTF writeup needs `difficulty`, a bug bounty report needs `severity`,
     * a study note needs neither. Rejecting the wrong field rather than
     * ignoring it matters: `severity: high` silently dropped from a CTF
     * writeup looks published-and-fine to its author, and a bug bounty report
     * that rates itself `difficulty: easy` is describing the wrong thing to
     * the reader.
     */
    .superRefine((data, ctx) => {
      const scale = categories.find((c) => c.slug === data.category)?.scale;

      for (const field of ['difficulty', 'severity'] as const) {
        const given = data[field] !== undefined;

        if (field === scale && !given) {
          ctx.addIssue({
            code: 'custom',
            path: [field],
            message: `a '${data.category}' post needs ${field}: one of ${scales[field].join(' | ')}`,
          });
        }

        if (field !== scale && given) {
          ctx.addIssue({
            code: 'custom',
            path: [field],
            message: scale
              ? `${field} does not apply to a '${data.category}' post — use ${scale} instead`
              : `a '${data.category}' post is not rated; remove ${field}`,
          });
        }
      }
    }),
});

export const collections = { blog };
