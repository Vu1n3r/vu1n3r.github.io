import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type CategorySlug, type ScaleName } from '../config';

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

/** Category archive URL. */
export function categoryHref(slug: CategorySlug): string {
  return `/blog/categories/${slug}/`;
}

export interface CategorySummary {
  slug: CategorySlug;
  /** Translation key for the display label; see src/i18n/ui.ts. */
  key: string;
  count: number;
}

/**
 * Categories that actually have published posts, in the order declared in
 * src/config.ts.
 *
 * Empty categories are omitted rather than rendered as dead filters: a
 * category nobody has written for yet is a link to an empty page, which is
 * worse than not offering it at all. It appears by itself the moment a post
 * claims it.
 */
export async function getCategories(): Promise<CategorySummary[]> {
  const posts = await getPosts();

  return categories
    .map((c) => ({
      slug: c.slug,
      key: c.key,
      count: posts.filter((p) => p.data.category === c.slug).length,
    }))
    .filter((c) => c.count > 0);
}

/** Posts in a given category, newest first. */
export async function getPostsByCategory(slug: CategorySlug): Promise<Post[]> {
  const posts = await getPosts();
  return posts.filter((p) => p.data.category === slug);
}

export interface Rating {
  /** Which scale the level sits on. Drives the chip's accessible label. */
  scale: ScaleName;
  /** The level itself, e.g. 'medium' on difficulty or 'critical' on severity. */
  level: string;
}

/**
 * The rating to show for a post, or null if its category is not rated.
 *
 * Every page asks this rather than reading `data.difficulty` directly, so
 * adding a category with a new scale is a change to src/config.ts and nowhere
 * else. The schema guarantees the field is present when the category calls
 * for it, so a null here means 'not rated', never 'author forgot'.
 */
export function postRating(data: Post['data']): Rating | null {
  const scale = categories.find((c) => c.slug === data.category)?.scale;
  if (!scale) return null;

  const level = data[scale];
  return level ? { scale, level } : null;
}
