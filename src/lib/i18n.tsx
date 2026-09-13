import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

// ===== Language =====
// The site is authored in Korean. English is a second surface for the site
// chrome, the profile and post titles/descriptions -- post bodies stay in the
// language they were written in.

export type Lang = 'ko' | 'en';

// A string that may carry both languages. Plain strings are treated as
// language-neutral (proper nouns, technical terms) and pass through unchanged,
// so existing data keeps working without a rewrite.
export type LocalizedText = string | { ko: string; en: string };

export function L(value: LocalizedText | undefined, lang: Lang): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.ko || value.en || '';
}

const STORAGE_KEY = 'blog-lang';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  L: (value: LocalizedText | undefined) => string;
}

const LangContext = createContext<LangContextValue>({
  lang: 'ko',
  setLang: () => {},
  L: (value) => L(value, 'ko'),
});

export function LangProvider({ children }: { children: ReactNode }) {
  // Always start at 'ko'. The prerenderer runs a headless browser with no
  // stored preference, so navigator-based detection would bake English into
  // the static HTML while every post body is Korean.
  const [lang, setLangState] = useState<Lang>('ko');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ko' || saved === 'en') setLangState(saved);
    } catch {
      // private mode / storage disabled -- stay on the default
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  return (
    <LangContext.Provider value={{ lang, setLang, L: (value) => L(value, lang) }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}

// ===== Site chrome strings =====
export const ui = {
  profile: { ko: '프로필', en: 'PROFILE' },
  blog: { ko: '블로그', en: 'BLOG' },
  categoriesHeader: { ko: '카테고리', en: 'CONTENT CATEGORIES' },
  archive: { ko: '아카이브', en: 'ARCHIVE' },
  noPosts: { ko: '아직 글이 없습니다.', en: 'No posts yet.' },
  noPostsInCategory: { ko: '이 카테고리에는 아직 글이 없습니다.', en: 'No posts in this category yet.' },
  filteredPosts: { ko: '필터링된 글', en: 'FILTERED POSTS' },
  backToList: { ko: '목록으로', en: 'Back to list' },
  postNotFound: { ko: '글을 찾을 수 없습니다', en: 'Post not found' },
  postNotFoundDesc: {
    ko: '요청한 글이 존재하지 않거나 삭제되었습니다.',
    en: 'The post you requested does not exist or has been removed.',
  },
  backToBlog: { ko: '블로그로 돌아가기', en: 'Back to blog' },
  tableOfContents: { ko: '목차', en: 'Contents' },
  readingTime: { ko: '분 분량', en: ' min read' },
  langLabel: { ko: '언어', en: 'Language' },
  // Profile sections
  about: { ko: '소개', en: 'About' },
  contact: { ko: '연락처', en: 'Contact' },
  experience: { ko: '경력', en: 'Experience' },
  awards: { ko: '수상', en: 'Awards' },
  projects: { ko: '프로젝트', en: 'Projects' },
  education: { ko: '학력·교육', en: 'Education' },
  certifications: { ko: '자격증', en: 'Certifications' },
  skills: { ko: '기술', en: 'Skills' },
  current: { ko: '진행 중', en: 'Current' },
} as const;

export type UiKey = keyof typeof ui;

export function useT(): (key: UiKey) => string {
  const { lang } = useLang();
  return (key: UiKey) => ui[key][lang];
}
