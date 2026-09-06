import { locales, defaultLocale, type Locale } from '../config';

/**
 * The `lang` values every localized route is generated for.
 *
 * The default locale is served unprefixed, which a rest parameter expresses
 * as `undefined` — `src/pages/[...lang]/blog/index.astro` then produces both
 * `/blog/` and `/ar/blog/` from one file. Adding a locale to src/config.ts
 * adds its routes here automatically; no page needs editing.
 */
export interface LocalePathEntry {
  params: { lang: string | undefined };
  props: { locale: Locale };
}

export function localePaths(): LocalePathEntry[] {
  return (Object.keys(locales) as Locale[]).map((locale) => ({
    params: { lang: locale === defaultLocale ? undefined : locale },
    props: { locale },
  }));
}
