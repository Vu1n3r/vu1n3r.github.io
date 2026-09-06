import { defaultLocale, locales, type Locale } from '../config';

/**
 * UI strings, one dictionary per locale.
 *
 * Arabic is the reference, because it is the default locale — a missing key
 * falls back to it rather than rendering an empty string or a raw key, so a
 * half-translated locale still ships a usable page. `_Complete` below makes
 * a key missing from ANY locale a type error, so the fallback stays a safety
 * net rather than something the site quietly relies on.
 */
export const ui = {
  ar: {
    'nav.home': 'الرئيسية',
    'nav.blog': 'المدونة',
    'nav.roadmap': 'خارطة الطريق',
    'nav.contact': 'تواصل معنا',

    'a11y.skip': 'تخطَّ إلى المحتوى',
    'a11y.primaryNav': 'التنقل الرئيسي',
    'a11y.langNav': 'اللغة',

    'lang.switchTo': 'اقرأ هذه الصفحة بالإنجليزية',
    'lang.switchToShort': 'English',

    'home.placeholder':
      'لم تُبنَ هذه الصفحة بعد. الشروحات هي الأهم — ابدأ من هناك.',
    'home.toBlog': 'اقرأ الشروحات',

    'blog.title': 'الشروحات',
    'blog.intro':
      'كل ما هنا كتبه أحد أعضاء النادي وخضع للمراجعة قبل النشر.',
    'blog.cta': 'تبي اسمك على واحد منها؟',
    'blog.ctaLink': 'افتح طلب دمج',
    'blog.allTags': 'كل الوسوم',
    'blog.empty': 'لا توجد شروحات منشورة بعد. الأول هو الأصعب.',

    'tags.title': 'الوسوم',
    'tags.intro':
      'استخدم وسمًا موجودًا إن كان مناسبًا بدل إنشاء وسم شبيه له.',
    'tags.inUse': 'قيد الاستخدام',
    'tags.empty': 'لا توجد وسوم بعد — لا توجد تدوينات بعد.',
    'tags.back': 'كل الشروحات',
    'tags.count_one': 'تدوينة',
    'tags.count_other': 'تدوينات',

    'post.contents': 'في هذه الصفحة',
    'post.older': 'الأقدم',
    'post.newer': 'الأحدث',
    'post.moreWriteups': 'شروحات أخرى',
    'post.draft':
      'هذه التدوينة مسودة. تظهر في بيئة التطوير المحلية فقط ولن تظهر في النسخة المنشورة.',
    'post.writeupCount_one': 'شرح',
    'post.writeupCount_other': 'شروحات',
    'post.translatedNotice': 'هذا الشرح مكتوب بالإنجليزية.',

    'footer.elsewhere': 'في أماكن أخرى',
    'footer.competing': 'المنافسات',
    'footer.contact': 'تواصل',
    'footer.credit': 'الشروحات من عمل مؤلفيها المذكورين.',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.roadmap': 'Roadmap',
    'nav.contact': 'Contact',

    'a11y.skip': 'Skip to content',
    'a11y.primaryNav': 'Primary',
    'a11y.langNav': 'Language',

    'lang.switchTo': 'Read this page in Arabic',
    'lang.switchToShort': 'العربية',

    'home.placeholder':
      'This page has not been built yet. The writeups are the part that matters — start there.',
    'home.toBlog': 'Read the writeups',

    'blog.title': 'Writeups',
    'blog.intro':
      'Everything here was written by a club member and reviewed before it was published.',
    'blog.cta': 'Want your name on one?',
    'blog.ctaLink': 'Open a pull request',
    'blog.allTags': 'all tags',
    'blog.empty': 'No writeups published yet. The first one is the hardest.',

    'tags.title': 'Tags',
    'tags.intro':
      'Reuse an existing tag where it fits rather than inventing a near-duplicate.',
    'tags.inUse': 'in use',
    'tags.empty': 'No tags yet — no posts yet.',
    'tags.back': 'All writeups',
    'tags.count_one': 'post',
    'tags.count_other': 'posts',

    'post.contents': 'On this page',
    'post.older': 'Older',
    'post.newer': 'Newer',
    'post.moreWriteups': 'More writeups',
    'post.draft':
      'This post is a draft. It is visible in local development only and will not appear in a production build.',
    'post.writeupCount_one': 'writeup',
    'post.writeupCount_other': 'writeups',
    'post.translatedNotice': 'This writeup is written in Arabic.',

    'footer.elsewhere': 'Elsewhere',
    'footer.competing': 'Competing',
    'footer.contact': 'Contact',
    'footer.credit': 'Writeups are the work of their named authors.',
  },
} as const;

export type UIKey = keyof (typeof ui)['ar'];

/**
 * Every locale must define every key. This assignment fails to type-check if
 * one is missing, which is how a forgotten translation gets caught at build
 * time instead of shipping as English text on an Arabic page.
 */
type _Complete = Record<Locale, Record<UIKey, string>>;
const _completeness: _Complete = ui;
void _completeness;

/**
 * Returns a `t()` bound to one locale, falling back to English per key.
 *
 *   const t = useTranslations(locale);
 *   t('blog.title')
 */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    const dict = ui[locale] as Partial<Record<UIKey, string>>;
    return dict[key] ?? ui[defaultLocale][key];
  };
}

/** Pick singular or plural form for a count. */
export function plural(
  t: (key: UIKey) => string,
  count: number,
  one: UIKey,
  other: UIKey,
): string {
  return count === 1 ? t(one) : t(other);
}

/**
 * Prefix a root-relative path with the locale segment.
 * '/blog/' + 'ar' -> '/ar/blog/';  '/blog/' + 'en' -> '/blog/'
 */
export function localizePath(path: string, locale: Locale): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === defaultLocale ? clean : `/${locale}${clean}`;
}

/**
 * Strip any locale prefix from a path, giving the default-locale form.
 * Used by the language switcher to stay on the current page when swapping.
 */
export function stripLocale(path: string): string {
  for (const code of Object.keys(locales) as Locale[]) {
    if (code === defaultLocale) continue;
    if (path === `/${code}` || path === `/${code}/`) return '/';
    if (path.startsWith(`/${code}/`)) return path.slice(code.length + 1);
  }
  return path;
}

/** The other locale(s), for building a switcher. */
export function otherLocales(current: Locale): Locale[] {
  return (Object.keys(locales) as Locale[]).filter((l) => l !== current);
}
