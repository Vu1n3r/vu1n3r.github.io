import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Drafts are visible while running `astro dev` so an author can preview their
 * own post, and are stripped from every production build. `import.meta.env.DEV`
 * is resolved at build time, so a draft cannot leak into `dist/`.
 */
const includeDrafts = import.meta.env.DEV;

/** All published posts, newest first. The one place sort order is decided. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection(
    'blog',
    ({ data }) => includeDrafts || data.draft === false,
  );

  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** URL-safe form of a tag. 'Web Exploitation' -> 'web-exploitation'. */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function tagHref(tag: string): string {
  return `/blog/tags/${tagSlug(tag)}/`;
}

export function postHref(id: string): string {
  return `/blog/${id}/`;
}

export interface TagSummary {
  /** Display form, taken from the first post that used the tag. */
  label: string;
  slug: string;
  count: number;
}

/**
 * Every tag in use, most-used first then alphabetical. Grouped by slug so
 * 'OSINT' and 'osint' resolve to one archive page rather than two.
 */
export async function getTags(): Promise<TagSummary[]> {
  const posts = await getPosts();
  const bySlug = new Map<string, TagSummary>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;

      const existing = bySlug.get(slug);
      if (existing) existing.count += 1;
      else bySlug.set(slug, { label: tag, slug, count: 1 });
    }
  }

  return [...bySlug.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label),
  );
}

/** Posts carrying a given tag slug, newest first. */
export async function getPostsByTag(slug: string): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((p) => p.data.tags.some((t) => tagSlug(t) === slug));
}
