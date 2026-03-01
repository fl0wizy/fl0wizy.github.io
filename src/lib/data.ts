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
        children: [
          { id: 'research-article', name: 'research/Article' },
          { id: 'study-dev-security', name: 'study(dev/security)' },
          { id: 'wargame-ctf', name: 'wargame/CTF' },
        ],
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

// ===== 프로필 데이터 =====
// 이 객체를 수정하여 프로필 페이지의 정보를 변경할 수 있습니다.

export const profileData: ProfileData = {
  name: 'flowizy',
  title: 'SECURITY RESEARCHER',
  bio: '관심 있는 것들을 공부하고 기록합니다.',
  profileImage: '/images/chaegeon.jpg', // 프로필 이미지 경로
  contacts: [
    { type: 'discord', label: 'DISCORD', value: '_flowizy' },
    { type: 'telegram', label: 'TELEGRAM', value: '@chaegunn', link: 'https://t.me/chaegunn' },
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
      title: 'upside Academy',  // 프로그램명
      institution: 'Theory x 두나무',                   // 기관명
      subInfo: 'A.K.A fl0wizy',                 // 부가 정보 (선택사항)
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
export function getPostCountByCategory(categoryId: string): number {
  if (categoryId === 'all') {
    return blogPosts.filter(post => post.published).length;
  }
  return blogPosts.filter(post => post.published && post.category === categoryId).length;
}

/**
 * 특정 카테고리의 포스트를 가져옵니다.
 */
export function getPostsByCategory(categoryId: string): BlogPost[] {
  if (categoryId === 'all') {
    return blogPosts.filter(post => post.published);
  }
  return blogPosts.filter(post => post.published && post.category === categoryId);
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
