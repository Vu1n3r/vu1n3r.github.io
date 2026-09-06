import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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

      difficulty: z.enum(['easy', 'medium', 'hard']),

      // Drafts stay in the repo but are filtered out of every listing and
      // are not built as pages.
      draft: z.boolean().default(false),
    })
    // Reject unknown keys. Catches typos like `titel:` or `tag:` in a PR
    // instead of silently dropping the value.
    .strict(),
});

export const collections = { blog };
