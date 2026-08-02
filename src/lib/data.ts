import { blogPosts } from './posts';
export { blogPosts };

// ===== 타입 정의 =====

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string; // YYYY-MM-DD HH:MM 형식
  category: string;
  tags?: string[];
  published: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  children?: Category[];
  // 네비게이션 항목으로는 두지 않지만 이 카테고리가 흡수하는 post category id들.
  // 글 옆 배지로만 쓰이는 세부 분류(research/study/CTF 등)를 여기에 모은다.
  mergedIds?: string[];
}

export interface ContactInfo {
  type: 'discord' | 'telegram' | 'linkedin' | 'github' | 'email';
  label: string;
  value: string;
  link?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
  current?: boolean;
}

export interface Award {
  title: string;
  organizer: string;
  period: string;
  description: string;
  tags: string[];
}

export interface Project {
  title: string;
  type: string;
  year: string;
  description: string;
  tags: string[];
  link?: string;
}

export interface Education {
  title: string;
  institution: string;
  subInfo?: string;
  period: string;
  description: string;
  tags: string[];
  current?: boolean;
}

export interface Skill {
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  tags: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  profileImage?: string;
  contacts: ContactInfo[];
  experiences: Experience[];
  awards: Award[];
  projects: Project[];
  education: Education[];
  skills: Skill[];
}

// ===== 카테고리 구조 =====
// 이 구조를 수정하여 사이드바의 카테고리 메뉴를 변경할 수 있습니다.

export const categories: Category[] = [
  { id: 'all', name: '전체', icon: 'grid' },
  {
    id: 'security',
    name: '보안(Security)',
    icon: 'shield',
    children: [
      { id: 'web-security', name: 'Web Security', icon: 'globe' },
      {
        id: 'web3-blockchain',
        name: 'Web3 / Blockchain',
        icon: 'zap',
        // 사이드바는 얕게 유지한다. research/study/CTF는 고르는 대상이 아니라
        // 글의 성격 표시일 뿐이므로 배지(categoryLabels)로만 노출하고,
        // 목록에서는 이 노드 하나로 모아 본다.
        mergedIds: ['research-article', 'study-dev-security', 'wargame-ctf'],
      },
      { id: 'reversing', name: 'Reversing', icon: 'cpu' },
      { id: 'pwn', name: 'Pwn', icon: 'terminal' },
      { id: 'crypto', name: 'Crypto', icon: 'lock' },
    ],
  },
  { id: 'development', name: '개발(Development)', icon: 'code' },
  { id: 'travel', name: '여행(Travel)', icon: 'map' },
  { id: 'daily', name: '일상(Daily)', icon: 'user' },
];

// ===== 카테고리별 시그니처 색상 =====
// 카드 뱃지·사이드바 활성·글 페이지 강조선이 이 색을 따라갑니다.
// 채도를 낮춘 부드러운 톤 (다크 배경에서 너무 쨍하지 않게)
export const categoryColors: Record<string, string> = {
  all: '#a79bea',
  security: '#a79bea', // 상위(보안) — 브랜드 보라(소프트)
  'web-security': '#6f9fd8', // 파랑
  'web3-blockchain': '#a79bea', // 보라
  'research-article': '#5fc2b2', // 청록
  'study-dev-security': '#8b8ee0', // 인디고
  'wargame-ctf': '#db8585', // 빨강
  reversing: '#74c195', // 초록
  pwn: '#e6a572', // 주황
  crypto: '#db8fb4', // 핑크
  development: '#6fbecf', // 시안
  travel: '#d4c277', // 앰버
  daily: '#9ca3af', // 그레이
};

// ===== 카테고리 ID → 표시 라벨 =====
export const categoryLabels: Record<string, string> = {
  daily: '일상(DAILY)',
  security: '보안(SECURITY)',
  'web-security': 'Web Security',
  'web3-blockchain': 'Web3/Blockchain',
  'research-article': 'Research/Article',
  'study-dev-security': 'Study',
  'wargame-ctf': 'Wargame/CTF',
  reversing: 'Reversing',
  pwn: 'Pwn',
  crypto: 'Crypto',
  development: '개발(DEVELOPMENT)',
  travel: '여행(TRAVEL)',
};

export function getCategoryColor(id: string): string {
  return categoryColors[id] ?? '#9580ff';
}

export function getCategoryLabel(id: string): string {
  return categoryLabels[id] ?? id;
}

// ===== 프로필 데이터 =====
// 이 객체를 수정하여 프로필 페이지의 정보를 변경할 수 있습니다.

export const profileData: ProfileData = {
  name: 'flowizy',
  title: 'SECURITY RESEARCHER',
  bio: '관심 있는 것들을 공부하고 기록합니다.',
  profileImage: '/images/chaegeon.jpg', // 프로필 이미지 경로
  contacts: [
    { type: 'discord', label: 'DISCORD', value: '_flowizy' },
    { type: 'telegram', label: 'TELEGRAM', value: '@chaaccak', link: 'https://t.me/chaaccak' },
    { type: 'linkedin', label: 'LINKEDIN', value: 'Chaegeon Oh', link: 'https://www.linkedin.com/in/%EC%B1%84%EA%B1%B4-%EC%98%A4-159157342/' },
    { type: 'github', label: 'GITHUB', value: 'fl0wizy', link: 'https://github.com/fl0wizy' },
    { type: 'email', label: 'PERSONAL EMAIL', value: 'dhcorjs063@gmail.com', link: 'mailto:dhcorjs063@gmail.com' },
    { type: 'email', label: 'ACADEMIC EMAIL', value: 'dhcorjs@ajou.ac.kr', link: 'mailto:dhcorjs@ajou.ac.kr' },
  ],
  experiences: [
    {
      title: 'The 10th President of the Student Council',  // 직책
      company: 'Ajou University-department of cyber security',           // 회사명
      period: '2025-01 ~ 2025-12',                 // 기간
      description: '2025년도 아주대학교 사이버보안학과 제10대 학생회장으로 역임.',  // 설명
      tags: ['학생회', '자치활동', '책임감'],  // 관련 기술 태그
      current: true,                        // 현재 재직 중 여부 (보라색 강조)
    },
  ],
  awards: [
    {
      title: '2025-1 아주대학교 파란학기 프로젝트 (입상)',
      organizer: 'Ajou University',
      period: '2025-03 ~ 2025-06',
      description: '온체인 데이터를 분석하고 시각화하는 프로젝트를 수행해 파란학기 프로젝트에서 입상했습니다.',
      tags: ['데이터 분석', '시각화', '프로젝트'],
    },
    {
      title: '이화체인 x BNB 아이디어해커톤 (최우수상)',
      organizer: '이화체인 x BNB',
      period: '2025-08',
      description: '블록체인 아이디어를 기획하고 발표해 해커톤에서 최우수상을 수상했습니다.',
      tags: ['해커톤', '아이디어', '블록체인'],
    },
    {
      title: 'Monad blitz 3rd (4등)',
      organizer: 'Monad',
      period: '2025-11',
      description: 'Monad blitz 3rd에 참가해 프로젝트 완성도와 아이디어를 인정받아 4등을 기록했습니다.',
      tags: ['Monad', '경진대회', '프로토타이핑'],
    },
  ],
  projects: [
    {
      title: 'Visualize on-chain data',              // 프로젝트명
      type: 'Data Analytics & Visualization',             // 프로젝트 유형
      year: '2025-03 ~ 2025-06',                         // 연도
      description: 'ARKHAM, DUNE, Etherscan 등과 같이 정적인 데이터에서 유의미한 데이터를 추출하고 이를 보기 쉽게 가시화한 프로젝트입니다.',
      tags: ['Java', 'SpringBoot', 'Vue.js'],
      link: 'https://github.com/fl0wizy/defi-audit-bot',  // 프로젝트 링크 (선택사항)
    },
    {
      title: 'Blockchain Audit Project',              // 프로젝트명
      type: 'DeFi Security & Audit',             // 프로젝트 유형
      year: '2025-07 ~ 2025-10',                         // 연도
      description: 'Flare, Trader Joe, Ekubo와 같은 정통 DEX부터 담보대출 시스템 등 DeFi 프로토콜 감사를 수행한 프로젝트입니다.',
      tags: ['EVM', 'Solidity', 'CodeArena'],
      link: 'https://github.com/fl0wizy/defi-audit-bot',  // 프로젝트 링크 (선택사항)
    },
  ],
  education: [
    {
      title: 'Department of Cyber Security',
      institution: 'Ajou University',
      subInfo: '아주대학교 사이버보안학과',
      period: '2022 ~ 현재',
      description: '시스템 보안 및 탈중앙화를 중점적으로 공부하고 있습니다.',
      tags: ['시스템 보안', '운영체제', '네트워크'],
      current: true,                        // 현재 재학 중 (파란색 강조)
    },
    {
      title: 'Hspace Internship',  // 프로그램명
      institution: 'Hspace',                   // 기관명
      subInfo: '교육 인턴',                 // 부가 정보 (선택사항)
      period: '2025-07 ~ 2025-08',           // 기간
      description: 'Web과 Web3, 인프라에 대한 전반적인 지식을 습득했습니다.',
      tags: ['Web Security', 'Web3', 'Secureum', 'DEFCON'],
    },
    {
      title: 'HuntingMaster (KISA) Web/Web3 Track Trainee',  // 프로그램명
      institution: 'KISA',                   // 기관명
      subInfo: '우수 수료생',                 // 부가 정보 (선택사항)
      period: '2025-07 ~ 2025-10',           // 기간
      description: 'Web과 Web3에 대한 전반적인 보안 지식을 습득했습니다.',
      tags: ['Web Security', 'Web3', 'Audit', 'Bug Bounty'],
    },
    {
      title: 'Upside Academy',  // 프로그램명
      institution: 'Theory x 두나무',                   // 기관명
      subInfo: 'A.K.A flowizy',                 // 부가 정보 (선택사항)
      period: '2026-02 ~ 2026-06',           // 기간
      description: '전분야 보안의 전반적인 지식과 web3의 깊은 이해를 가지게 되었습니다.',
      tags: ['Solidity', 'Foundry', 'Web3', 'Audit', 'Threat Modeling'],
    },
  ],
  skills: [
    {
      name: 'Web3 security',                     // 스킬명
      category: 'Smart Contracts',          // 카테고리
      level: 'intermediate',                      // 수준: beginner, intermediate, advanced, expert
      description: 'EVM, 가스 최적화 및 프로토콜 보안 패턴에 대한 깊은 이해를 보유하고 있습니다.',
      tags: ['Solidity', 'Yul', 'Foundry'],
    },
    {
      name: 'Web Security',
      category: 'Network Security',
      level: 'intermediate',
      description: '네트워크 보안 기술에 대한 깊은 이해를 보유하고 있습니다.',
      tags: ['Burp Suite', 'XSS', 'SQLi', 'Wireshark', 'Nmap', 'business'],
    },
  ],
};

// ===== 유틸리티 함수 =====

/**
 * 카테고리별 포스트 개수를 계산합니다.
 */
// 카테고리 트리에서 해당 노드와 그 하위 노드 id를 전부 모은다.
// 부모 카테고리(security, web3-blockchain)에는 글이 직접 달리지 않으므로,
// 부모를 눌렀을 때 자손에 달린 글까지 보이게 하려면 이 목록이 필요하다.
// 트리에 없는 id면 null.
function collectSubtreeIds(categoryId: string, list: Category[] = categories): string[] | null {
  for (const category of list) {
    if (category.id === categoryId) {
      const ids: string[] = [];
      const walk = (node: Category) => {
        ids.push(node.id);
        node.mergedIds?.forEach(mergedId => ids.push(mergedId));
        node.children?.forEach(walk);
      };
      walk(category);
      return ids;
    }

    if (category.children) {
      const found = collectSubtreeIds(categoryId, category.children);
      if (found) {
        return found;
      }
    }
  }

  return null;
}

function matchesCategory(categoryId: string): (post: BlogPost) => boolean {
  const ids = new Set(collectSubtreeIds(categoryId) ?? [categoryId]);
  return post => post.published && ids.has(post.category);
}

export function getPostCountByCategory(categoryId: string): number {
  if (categoryId === 'all') {
    return blogPosts.filter(post => post.published).length;
  }
  return blogPosts.filter(matchesCategory(categoryId)).length;
}

/**
 * 특정 카테고리의 포스트를 가져옵니다.
 */
export function getPostsByCategory(categoryId: string): BlogPost[] {
  if (categoryId === 'all') {
    return blogPosts.filter(post => post.published);
  }
  return blogPosts.filter(matchesCategory(categoryId));
}

/**
 * ID로 포스트를 찾습니다.
 */
export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

/**
 * 날짜 문자열을 "약 N시간 전" 형식으로 변환합니다.
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString.replace(' ', 'T'));
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffMins < 1) return '방금 전';
  if (diffMins < 60) return `약 ${diffMins}분 전`;
  if (diffHours < 24) return `약 ${diffHours}시간 전`;
  if (diffDays < 7) return `약 ${diffDays}일 전`;
  if (diffWeeks < 4) return `약 ${diffWeeks}주 전`;
  if (diffMonths < 12) return `약 ${diffMonths}개월 전`;
  return `약 ${diffYears}년 전`;
}

/**
 * 날짜 문자열을 "YYYY-MM-DD / HH:MM" 형식으로 변환합니다.
 */
export function formatDate(dateString: string): string {
  const [datePart, timePart] = dateString.split(' ');
  return `${datePart} / ${timePart}`;
}

/**
 * 본문 길이로 예상 읽기 시간(분)을 계산합니다.
 * 한글 ~500자/분, 영어 ~200단어/분 기준의 근사치.
 */
export function getReadingTime(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, ' ') // 코드 블록 제외
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*_~\-|]/g, ' ');
  const korean = (text.match(/[가-힣]/g) || []).length;
  const words = (text.match(/[A-Za-z0-9]+/g) || []).length;
  const minutes = Math.ceil(korean / 500 + words / 200);
  return Math.max(1, minutes);
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

/**
 * 마크다운 본문에서 대제목(h2, `##`)만 순서대로 추출해 목차를 만듭니다.
 * h1(글 제목)과 h3(소제목)은 목차가 너무 빽빽해지므로 제외합니다.
 * 부여하는 id(`heading-N`)는 Post 렌더 시 h2에 매기는 id와 동일 순번이라
 * 목차 클릭/스크롤 추적이 정확히 매칭됩니다. (펜스 코드 블록 내부 `#`은 제외)
 */
export function extractHeadings(content: string): TocHeading[] {
  const lines = content.split('\n');
  const out: TocHeading[] = [];
  let inFence = false;
  let i = 0;
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    if (m[1].length !== 2) continue; // 대제목(##)만
    const text = m[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`]/g, '')
      .trim();
    out.push({ id: `heading-${i}`, text, level: m[1].length });
    i++;
  }
  return out;
}
