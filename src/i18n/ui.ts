import { siteLocale, type Locale } from '../config';

/**
 * UI strings, one dictionary per locale.
 *
 * The site renders Arabic; the English dictionary is kept because writeups
 * are published in both languages and a switcher is a plausible next step.
 * Arabic is the reference — a missing key falls back to it rather than
 * rendering an empty string or a raw key. `_Complete` below makes a key
 * missing from ANY dictionary a type error, so the fallback stays a safety
 * net rather than something the site quietly relies on.
 */
export const ui = {
  ar: {
    'nav.home': 'الرئيسية',
    'nav.blog': 'المدونة',
    'nav.resources': 'مصادر التعلم',
    'nav.leaderboard': 'لوحة الصدارة',
    'resources.intro': 'استكشف خارطة الطريق، وتصفح الأرشيف، واقرأ ملاحظات الأعضاء لتوسيع معرفتك بالأمن السيبراني.',
    'resources.roadmap': 'خارطة الطريق',
    'resources.archive': 'الأرشيف',
    'resources.notes': 'ملاحظات',
    'resources.selectPrompt': 'اختر قسمًا من الأعلى لاستكشاف مصادر التعلم.',
    'resources.roadmapIntro': 'ابدأ بالأساسيات، ثم انتقل إلى التجربة العملية والتخصصات التي تهمك. افتح كل مرحلة لتجد موضوعاتها ومصادرها.',
    'resources.stageNav': 'مراحل خارطة الطريق',
    'resources.stageFundamentals': 'الأساسيات',
    'resources.stageFundamentalsDescription': 'ابنِ قاعدة مريحة في الشبكات ولينكس وطريقة عمل الويب قبل الدخول في التحديات الأمنية.',
    'resources.stageSecurity': 'الأمن السيبراني',
    'resources.stageSecurityDescription': 'تعرّف على مبادئ الأمن وطريقة التفكير في الثغرات ضمن بيئات تدريبية آمنة.',
    'resources.stagePractice': 'المهارات العملية',
    'resources.stagePracticeDescription': 'جرّب أدواتك في مختبرات وتحديات بسيطة، ووثّق ما تعلّمته. ستُضاف موارد هذه المرحلة قريبًا.',
    'resources.stageAdvanced': 'التخصصات المتقدمة',
    'resources.stageAdvancedDescription': 'اختر مجالًا تتعمق فيه، مثل أمن الويب أو التحليل الجنائي أو الهندسة العكسية. ستُضاف موارد هذه المرحلة قريبًا.',
    'resources.stageProjects': 'المشاريع والمشاركة',
    'resources.stageProjectsDescription': 'حوّل ما تعلّمته إلى مشروع صغير أو شرح تشاركه مع الآخرين. ستُضاف أمثلة ومصادر قريبًا.',
    'resources.topicNetworks': 'أساسيات الشبكات',
    'resources.topicNetworksDescription': 'ابدأ بعناوين IP وDNS وHTTP وكيف تتواصل الأجهزة والخدمات.',
    'resources.topicLinux': 'سطر أوامر لينكس',
    'resources.topicLinuxDescription': 'تدرّب على الملفات والأوامر والصلاحيات من خلال تحديات مناسبة للمبتدئين.',
    'resources.topicWeb': 'أساسيات الويب',
    'resources.topicWebDescription': 'افهم بنية صفحات الويب والطلبات والاستجابات قبل دراسة أمنها.',
    'resources.topicWebSecurity': 'مقدمة في أمن الويب',
    'resources.topicWebSecurityDescription': 'اقرأ المفاهيم الأساسية وطبّقها في مختبرات تعليمية.',
    'resources.openResource': 'افتح المصدر',
    'resources.archiveEmpty': 'لا توجد مواد في الأرشيف بعد.',
    'resources.notesEmpty': 'لا توجد ملاحظات منشورة بعد.',
    'leaderboard.empty': 'ستظهر نتائج النادي هنا عند بدء المنافسات.',

    'a11y.skip': 'تخطَّ إلى المحتوى',
    'a11y.primaryNav': 'التنقل الرئيسي',
    'a11y.toggleMenu': 'فتح قائمة التنقل',
    'home.eyebrow': 'نتعلّم معًا. ونترك أثرًا.',
    'home.title': 'اكتشف عالم الأمن',
    'home.titleSecond': 'السيبراني، معنا',
    'home.intro': 'نجرّب، نحلّ، ونشارك ما تعلّمناه. مساحة تجمع شروحات أعضاء النادي، وتوثّق رحلتنا من أول تحدٍّ إلى فهم أعمق للأمن السيبراني.',
    'home.start': 'ابدأ رحلتك',
    'home.topics': 'من الفضول إلى التطبيق',
    'home.topicWeb': 'أمن الويب',
    'home.topicCrypto': 'التشفير',
    'home.topicLinux': 'لينكس',
    'home.topicCTF': 'تحديات CTF',
    'home.stat': 'شروحات في الأرشيف، والمعرفة تكبر بمشاركتك',
    'home.shareTitle': 'معرفتك تستحق المشاركة',
    'home.shareText': 'حلّيت تحديًا؟ وثّق طريقتك، وخلّ تجربتك بداية لغيرك.',
    'home.shareAction': 'أضف شرحك',
    'home.shareFoot': 'من الأعضاء، للأعضاء',
    'home.pathTitle': 'خطوتك الأولى تبدأ هنا',
    'home.pathText': 'من فهم الأساسيات إلى حل التحديات. تعلّم على مهل، وجرّب بيدك.',
    'home.pathAction': 'استكشف المسار',
    'home.pathFoot': 'تعلّم · جرّب · شارك',
    'blog.title': 'الشروحات',
    'blog.intro':
      'كل ما هنا كتبه أحد أعضاء النادي وخضع للمراجعة قبل النشر.',
    'blog.cta': 'تبي اسمك على واحد منها؟',
    'blog.ctaLink': 'افتح طلب دمج',
    'blog.allTags': 'كل الوسوم',

    'category.all': 'الكل',
    'category.ctf': 'مسابقات CTF',
    'category.bugbounty': 'صيد الثغرات',
    'category.notes': 'ملاحظات',
    'a11y.categoryNav': 'التصنيفات',
    'a11y.blogFilters': 'تصفية الشروحات',
    'category.empty': 'لا توجد شروحات في هذا التصنيف بعد.',
    'rating.difficulty': 'الصعوبة',
    'rating.severity': 'الخطورة',
    'blog.empty': 'لا توجد شروحات منشورة بعد. الأول هو الأصعب.',
    'blog.noMatches': 'لا توجد شروحات تطابق هذه التصفية.',

    'tags.title': 'الوسوم',
    'tags.intro':
      'استخدم وسمًا موجودًا إن كان مناسبًا بدل إنشاء وسم شبيه له.',
    'tags.inUse': 'قيد الاستخدام',
    'tags.empty': 'لا توجد وسوم بعد — لا توجد تدوينات بعد.',
    'tags.back': 'كل الشروحات',
    'tags.count_one': 'تدوينة',
    'tags.count_other': 'تدوينات',

    'post.platform': 'المنصة',
    'post.author': 'الكاتب',
    'post.socials': 'حسابات الكاتب',
    'post.website': 'الموقع الإلكتروني',
    'post.contents': 'في هذه الصفحة',
    'post.older': 'الأقدم',
    'post.newer': 'الأحدث',
    'post.moreWriteups': 'شروحات أخرى',
    'post.draft':
      'هذه التدوينة مسودة. تظهر في بيئة التطوير المحلية فقط ولن تظهر في النسخة المنشورة.',
    'post.writeupCount_one': 'شرح',
    'post.writeupCount_other': 'شروحات',

    'footer.elsewhere': 'في أماكن أخرى',
    'footer.competing': 'المنافسات',
    'footer.contact': 'تواصل',
    'footer.credit': 'الشروحات من عمل مؤلفيها المذكورين.',
  },
  en: {
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.resources': 'Learning Resources',
    'nav.leaderboard': 'Leaderboard',
    'resources.intro': 'Explore the roadmap, browse the archive, and read member notes to build your cybersecurity knowledge.',
    'resources.roadmap': 'Roadmap',
    'resources.archive': 'Archive',
    'resources.notes': 'Notes',
    'resources.selectPrompt': 'Choose a section above to explore the learning resources.',
    'resources.roadmapIntro': 'Start with the fundamentals, then move into hands-on practice and the areas that interest you. Open each stage for topics and resources.',
    'resources.stageNav': 'Roadmap stages',
    'resources.stageFundamentals': 'Fundamentals',
    'resources.stageFundamentalsDescription': 'Build a comfortable foundation in networks, Linux, and how the web works before tackling security challenges.',
    'resources.stageSecurity': 'Cybersecurity',
    'resources.stageSecurityDescription': 'Learn security principles and how to reason about vulnerabilities in safe practice environments.',
    'resources.stagePractice': 'Practical skills',
    'resources.stagePracticeDescription': 'Try your tools in simple labs and challenges, and document what you learn. Resources for this stage are coming soon.',
    'resources.stageAdvanced': 'Advanced specialties',
    'resources.stageAdvancedDescription': 'Choose a field to explore, such as web security, forensics, or reverse engineering. Resources for this stage are coming soon.',
    'resources.stageProjects': 'Projects and sharing',
    'resources.stageProjectsDescription': 'Turn what you learn into a small project or a writeup to share. Examples and resources are coming soon.',
    'resources.topicNetworks': 'Networking basics',
    'resources.topicNetworksDescription': 'Start with IP addresses, DNS, HTTP, and how devices and services communicate.',
    'resources.topicLinux': 'Linux command line',
    'resources.topicLinuxDescription': 'Practice files, commands, and permissions through beginner-friendly challenges.',
    'resources.topicWeb': 'Web fundamentals',
    'resources.topicWebDescription': 'Understand pages, requests, and responses before studying web security.',
    'resources.topicWebSecurity': 'Introduction to web security',
    'resources.topicWebSecurityDescription': 'Read the basic concepts and apply them in educational labs.',
    'resources.openResource': 'Open resource',
    'resources.archiveEmpty': 'No archived resources have been published yet.',
    'resources.notesEmpty': 'No notes have been published yet.',
    'leaderboard.empty': 'Club results will appear here when competitions begin.',

    'a11y.skip': 'Skip to content',
    'a11y.primaryNav': 'Primary',
    'a11y.toggleMenu': 'Open navigation menu',
    'home.eyebrow': 'Learn together. Leave something behind.',
    'home.title': 'Explore cybersecurity',
    'home.titleSecond': 'with us',
    'home.intro': 'We experiment, solve, and share what we learn. A home for member writeups, documenting our journey from the first challenge to a deeper understanding of cybersecurity.',
    'home.start': 'Start exploring',
    'home.topics': 'From curiosity to practice',
    'home.topicWeb': 'Web security',
    'home.topicCrypto': 'Cryptography',
    'home.topicLinux': 'Linux',
    'home.topicCTF': 'CTF challenges',
    'home.stat': 'writeups in the archive. Help our knowledge grow.',
    'home.shareTitle': 'Your knowledge belongs here',
    'home.shareText': 'Solved a challenge? Document your approach and give someone else a place to start.',
    'home.shareAction': 'Add your writeup',
    'home.shareFoot': 'By members, for members',
    'home.pathTitle': 'Your first step starts here',
    'home.pathText': 'From the fundamentals to solving challenges. Take your time, then try it yourself.',
    'home.pathAction': 'Explore the path',
    'home.pathFoot': 'Learn · Practice · Share',
    'blog.title': 'Writeups',
    'blog.intro':
      'Everything here was written by a club member and reviewed before it was published.',
    'blog.cta': 'Want your name on one?',
    'blog.ctaLink': 'Open a pull request',
    'blog.allTags': 'all tags',

    'category.all': 'All',
    'category.ctf': 'CTF',
    'category.bugbounty': 'Bug Bounty',
    'category.notes': 'Notes',
    'a11y.categoryNav': 'Categories',
    'a11y.blogFilters': 'Writeup filters',
    'category.empty': 'No writeups in this category yet.',
    'rating.difficulty': 'Difficulty',
    'rating.severity': 'Severity',
    'blog.empty': 'No writeups published yet. The first one is the hardest.',
    'blog.noMatches': 'No writeups match these filters.',

    'tags.title': 'Tags',
    'tags.intro':
      'Reuse an existing tag where it fits rather than inventing a near-duplicate.',
    'tags.inUse': 'in use',
    'tags.empty': 'No tags yet — no posts yet.',
    'tags.back': 'All writeups',
    'tags.count_one': 'post',
    'tags.count_other': 'posts',

    'post.platform': 'Platform',
    'post.author': 'Author',
    'post.socials': 'Author profiles',
    'post.website': 'Website',
    'post.contents': 'On this page',
    'post.older': 'Older',
    'post.newer': 'Newer',
    'post.moreWriteups': 'More writeups',
    'post.draft':
      'This post is a draft. It is visible in local development only and will not appear in a production build.',
    'post.writeupCount_one': 'writeup',
    'post.writeupCount_other': 'writeups',

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
export function useTranslations(locale: Locale = siteLocale) {
  return function t(key: UIKey): string {
    const dict = ui[locale] as Partial<Record<UIKey, string>>;
    return dict[key] ?? ui[siteLocale][key];
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
