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
  profileImage: '/images/profile.jpg', // 프로필 이미지 경로
  contacts: [
    { type: 'discord', label: 'DISCORD', value: '_flowizy' },
    { type: 'telegram', label: 'TELEGRAM', value: '@chaegunn', link: 'https://t.me/chaegunn' },
    { type: 'linkedin', label: 'LINKEDIN', value: 'Chaegeon Oh', link: 'https://linkedin.com/in/chaegunn' },
    { type: 'github', label: 'GITHUB', value: 'fl0wizy', link: 'https://github.com/fl0wizy' },
    { type: 'email', label: 'PERSONAL EMAIL', value: 'dhcorjs063@gmail.com', link: 'mailto:dhcorjs063@gmail.com' },
    { type: 'email', label: 'ACADEMIC EMAIL', value: 'dhcorjs@ajou.ac.kr', link: 'mailto:dhcorjs@ajou.ac.kr' },
  ],
  experiences: [
    {
      title: 'Senior Security Researcher',
      company: 'ChainGuard Labs',
      period: '2024 ~ 현재',
      description: 'Tier-1 DeFi 프로토콜의 스마트 컨트랙트 감사를 주도하고 있습니다. EVM 바이트코드 분석 및 영지식 증명 회로 검증을 전문으로 합니다.',
      tags: ['Solidity', 'Rust', 'DeFi Security'],
      current: true,
    },
  ],
  projects: [
    {
      title: 'DeFi Audit Bot',
      type: 'Open Source Tool',
      year: '2023',
      description: 'Solidity 0.8.x 컨트랙트에서 일반적인 재진입 공격 및 접근 제어 문제를 탐지하기 위한 자동 정적 분석 도구입니다.',
      tags: ['Python', 'Slither', 'Static Analysis'],
    },
  ],
  education: [
    {
      title: 'HuntinMaster (KISA) Web/Web3 Track Trainee',
      institution: 'KISA',
      subInfo: '우수 수료생',
      period: '2025-07 ~ 2025-10',
      description: 'Web과 Web3에 대한 전반적인 보안 지식을 습득하고 버그 바운티, CTF, Audit에 대한 관점을 확장했습니다. 실무적인 보안 분석 방법론을 정립하고 우수 수료생으로 선정되었습니다.',
      tags: ['Web Security', 'Web3', 'Audit', 'Bug Bounty'],
    },
    {
      title: 'Department of Cyber Security',
      institution: 'Ajou University',
      subInfo: '아주대학교 사이버보안학과',
      period: '2018 ~ 현재',
      description: '시스템 보안 및 분산 시스템을 중점적으로 공부하고 있습니다. 보안 연구실의 활동 멤버입니다.',
      tags: ['시스템 보안', '알고리즘'],
      current: true,
    },
  ],
  skills: [
    {
      name: 'Web3 보안',
      category: 'Smart Contracts',
      level: 'expert',
      description: 'EVM, 가스 최적화 및 프로토콜 보안 패턴에 대한 깊은 이해를 보유하고 있습니다.',
      tags: ['Solidity', 'Yul', 'Foundry'],
    },
  ],
};

// ===== 블로그 포스트 =====
// 새 글을 작성하려면 이 배열의 맨 앞에 새로운 객체를 추가하세요.
// id는 고유해야 하며, URL 경로로 사용됩니다.

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-post-management-guide',
    title: '블로그 게시글 작성 및 관리 완벽 가이드',
    description: '새 게시글 작성, 카테고리 설정, 날짜 형식, 태그 추가 등 블로그 콘텐츠 관리에 필요한 모든 것을 다룹니다.',
    content: `# 블로그 게시글 작성 및 관리 완벽 가이드

이 가이드에서는 flowizy's DevLog에 새 게시글을 작성하고 관리하는 방법을 상세하게 설명합니다.

---

## 1. 게시글 데이터 파일 위치

모든 게시글 데이터는 단 하나의 파일에서 관리됩니다:

\`\`\`
src/lib/data.ts
\`\`\`

이 파일 안의 \`blogPosts\` 배열에 게시글 객체를 추가하거나 수정하면 됩니다.

---

## 2. 새 게시글 작성 방법

### 2.1 기본 구조

\`blogPosts\` 배열의 **맨 앞**에 새 객체를 추가합니다. 맨 앞에 추가해야 최신 글로 표시됩니다.

\`\`\`typescript
{
  id: 'unique-post-id',           // URL에 사용될 고유 ID (영문, 숫자, 하이픈)
  title: '게시글 제목',            // 게시글 제목
  description: '짧은 설명',        // 목록에 표시될 요약
  content: \`마크다운 내용\`,       // 게시글 본문 (마크다운 형식)
  date: '2026-01-29 14:30',       // 작성일 (YYYY-MM-DD HH:MM)
  category: 'daily',              // 카테고리 ID
  tags: ['태그1', '태그2'],        // 태그 배열 (선택사항)
  published: true,                // 공개 여부
}
\`\`\`

### 2.2 실제 예시

\`\`\`typescript
export const blogPosts: BlogPost[] = [
  // 👇 새 글은 여기에 추가
  {
    id: 'smart-contract-audit-checklist',
    title: '스마트 컨트랙트 감사 체크리스트',
    description: 'Solidity 기반 컨트랙트 감사 시 반드시 확인해야 할 항목들을 정리했습니다.',
    content: \`
# 스마트 컨트랙트 감사 체크리스트

## 1. 재진입 공격 (Reentrancy)

외부 호출 전에 상태를 업데이트했는지 확인합니다.

\\\`\\\`\\\`solidity
// 취약한 코드
function withdraw() external {
    (bool success, ) = msg.sender.call{value: balances[msg.sender]}("");
    balances[msg.sender] = 0; // 상태 업데이트가 외부 호출 후에 발생
}

// 안전한 코드
function withdraw() external {
    uint256 amount = balances[msg.sender];
    balances[msg.sender] = 0; // 상태 먼저 업데이트
    (bool success, ) = msg.sender.call{value: amount}("");
}
\\\`\\\`\\\`
    \`,
    date: '2026-01-29 15:00',
    category: 'web3-blockchain',
    tags: ['스마트컨트랙트', '보안', '감사'],
    published: true,
  },
  // 기존 글들...
];
\`\`\`

---

## 3. 카테고리 설정

### 3.1 사용 가능한 카테고리

\`category\` 필드에는 다음 값들을 사용할 수 있습니다:

| 카테고리 ID | 표시 이름 | 설명 |
|------------|----------|------|
| \`daily\` | 일상(DAILY) | 일상적인 이야기 |
| \`security\` | 보안(SECURITY) | 보안 관련 상위 카테고리 |
| \`web-security\` | Web Security | 웹 보안 |
| \`web3-blockchain\` | Web3/Blockchain | 블록체인 보안 |
| \`research-article\` | Research/Article | 연구 자료 |
| \`study-dev-security\` | Study | 학습 기록 |
| \`wargame-ctf\` | Wargame/CTF | CTF 풀이 |
| \`reversing\` | Reversing | 리버싱 |
| \`pwn\` | Pwn | 시스템 해킹 |
| \`crypto\` | Crypto | 암호학 |
| \`development\` | 개발(DEVELOPMENT) | 개발 관련 |
| \`travel\` | 여행(TRAVEL) | 여행 기록 |

### 3.2 새 카테고리 추가하기

\`data.ts\` 파일의 \`categories\` 배열을 수정합니다:

\`\`\`typescript
export const categories: Category[] = [
  { id: 'all', name: '전체', icon: 'grid' },
  // 새 카테고리 추가
  { id: 'my-new-category', name: '새 카테고리', icon: 'code' },
  // ...
];
\`\`\`

사용 가능한 아이콘: \`grid\`, \`shield\`, \`globe\`, \`zap\`, \`cpu\`, \`terminal\`, \`lock\`, \`code\`, \`map\`, \`user\`

---

## 4. 날짜 형식

날짜는 반드시 다음 형식을 따라야 합니다:

\`\`\`
YYYY-MM-DD HH:MM
\`\`\`

**예시:**
- \`2026-01-29 09:00\` → 2026년 1월 29일 오전 9시
- \`2026-02-14 18:30\` → 2026년 2월 14일 오후 6시 30분

이 날짜를 기준으로 "약 N시간 전" 같은 상대 시간이 자동으로 계산됩니다.

---

## 5. 마크다운 문법

### 5.1 제목

\`\`\`markdown
# H1 제목 (가장 큰 제목)
## H2 제목
### H3 제목
\`\`\`

### 5.2 텍스트 스타일

\`\`\`markdown
**굵은 텍스트**
*기울임 텍스트*
~~취소선~~
\\\`인라인 코드\\\`
\`\`\`

### 5.3 코드 블록

언어를 지정하면 문법 강조가 적용됩니다:

\`\`\`markdown
\\\`\\\`\\\`python
def hello():
    print("Hello, World!")
\\\`\\\`\\\`
\`\`\`

### 5.4 링크와 이미지

\`\`\`markdown
[링크 텍스트](https://example.com)
![이미지 설명](/images/my-image.png)
\`\`\`

### 5.5 리스트

\`\`\`markdown
- 항목 1
- 항목 2
- 항목 3

1. 첫 번째
2. 두 번째
3. 세 번째
\`\`\`

### 5.6 인용문

\`\`\`markdown
> 이것은 인용문입니다.
\`\`\`

---

## 6. 게시글 비공개 설정

\`published\` 필드를 \`false\`로 설정하면 게시글이 목록에 표시되지 않습니다:

\`\`\`typescript
{
  id: 'draft-post',
  title: '작성 중인 글',
  // ...
  published: false,  // 비공개
}
\`\`\`

---

## 7. 배포 방법

### 7.1 로컬 미리보기

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 \`http://localhost:5173\`으로 접속합니다.

### 7.2 GitHub Pages 배포

\`\`\`bash
npm run deploy
\`\`\`

이 명령어가 자동으로 빌드하고 \`gh-pages\` 브랜치에 배포합니다.

---

## 8. 주의사항

1. **ID 중복 금지**: 각 게시글의 \`id\`는 고유해야 합니다.
2. **특수문자 주의**: 마크다운에서 백틱(\\\`)을 사용할 때는 이스케이프 처리가 필요합니다.
3. **이미지 경로**: 이미지는 \`public/images/\` 폴더에 저장하고, 경로는 \`/images/파일명\`으로 지정합니다.
`,
    date: '2026-01-29 09:00',
    category: 'daily',
    tags: ['블로그', '가이드', '게시글관리'],
    published: true,
  },
  {
    id: 'profile-customization-guide',
    title: '프로필 및 블로그 커스터마이징 완벽 가이드',
    description: '프로필 사진, 배경 이미지, 연락처, 경력, 학력 등 모든 개인 정보를 수정하는 방법을 상세히 설명합니다.',
    content: `# 프로필 및 블로그 커스터마이징 완벽 가이드

이 가이드에서는 프로필 사진, 헤더 배경, 그리고 PROFILE 페이지의 모든 정보를 수정하는 방법을 다룹니다.

---

## 1. 이미지 변경

### 1.1 프로필 사진 변경

프로필 사진은 두 곳에서 사용됩니다:
- 사이드바 상단의 로고 영역
- PROFILE 페이지의 메인 프로필 이미지

**변경 방법:**

1. 새 프로필 이미지를 \`public/images/\` 폴더에 저장합니다.
   - 권장 크기: 400x400px 이상
   - 권장 형식: JPG 또는 PNG

2. \`src/lib/data.ts\` 파일을 열고 \`profileData.profileImage\` 값을 수정합니다:

\`\`\`typescript
export const profileData: ProfileData = {
  // ...
  profileImage: '/images/새로운프로필.jpg',  // 👈 여기 수정
  // ...
};
\`\`\`

### 1.2 헤더 배경 이미지 변경

BLOG 페이지 상단의 우주 배경 이미지를 변경하려면:

1. 새 배경 이미지를 \`public/images/\` 폴더에 저장합니다.
   - 권장 크기: 1920x600px 이상
   - 어두운 톤의 이미지 권장 (텍스트 가독성)

2. \`src/components/Header/Header.css\` 파일을 열고 다음 부분을 수정합니다:

\`\`\`css
.hero-background {
  /* ... */
  background: 
    linear-gradient(180deg, 
      rgba(5, 5, 10, 0.3) 0%,
      rgba(5, 5, 10, 0.6) 100%),
    url('/images/새로운배경.png');  /* 👈 여기 수정 */
  /* ... */
}
\`\`\`

---

## 2. 기본 프로필 정보 수정

\`src/lib/data.ts\` 파일의 \`profileData\` 객체를 수정합니다.

### 2.1 이름 및 타이틀

\`\`\`typescript
export const profileData: ProfileData = {
  name: 'flowizy',              // 닉네임
  title: 'SECURITY RESEARCHER',  // 직함
  bio: '관심 있는 것들을 공부하고 기록합니다.',  // 소개 문구
  // ...
};
\`\`\`

**참고:** Korean name은 ProfileCard 컴포넌트에서 하드코딩되어 있습니다. 변경하려면 \`src/components/Profile/ProfileCard.tsx\`를 수정하세요.

### 2.2 연락처 정보 (Contacts)

\`contacts\` 배열에서 연락처 정보를 수정합니다:

\`\`\`typescript
contacts: [
  { 
    type: 'discord',           // 타입: discord, telegram, linkedin, github, email
    label: 'DISCORD',          // 표시될 라벨
    value: '_flowizy'          // 실제 값 (복사될 텍스트)
  },
  { 
    type: 'telegram', 
    label: 'TELEGRAM', 
    value: '@chaegunn',
    link: 'https://t.me/chaegunn'  // 클릭 시 이동할 링크 (선택사항)
  },
  { 
    type: 'linkedin', 
    label: 'LINKEDIN', 
    value: 'Chaegeon Oh',
    link: 'https://linkedin.com/in/chaegunn'  // 외부 링크로 연결
  },
  { 
    type: 'github', 
    label: 'GITHUB', 
    value: 'fl0wizy',
    link: 'https://github.com/fl0wizy'  // 외부 링크로 연결
  },
  { 
    type: 'email', 
    label: 'PERSONAL EMAIL', 
    value: 'dhcorjs063@gmail.com',
    link: 'mailto:dhcorjs063@gmail.com'  // 메일 클라이언트로 연결
  },
],
\`\`\`

**연락처 타입별 동작:**
- \`github\`, \`linkedin\`: 클릭 시 외부 링크로 이동 (새 탭)
- \`discord\`, \`telegram\`, \`email\`: 복사 버튼 표시 (클릭 시 클립보드에 복사)

---

## 3. 경력 정보 수정 (Experience)

\`experiences\` 배열을 수정합니다:

\`\`\`typescript
experiences: [
  {
    title: 'Senior Security Researcher',  // 직책
    company: 'ChainGuard Labs',           // 회사명
    period: '2024 ~ 현재',                 // 기간
    description: 'Tier-1 DeFi 프로토콜의 스마트 컨트랙트 감사를 주도하고 있습니다.',  // 설명
    tags: ['Solidity', 'Rust', 'DeFi Security'],  // 관련 기술 태그
    current: true,                        // 현재 재직 중 여부 (보라색 강조)
  },
  {
    title: 'Security Analyst',
    company: 'Previous Company',
    period: '2022 ~ 2024',
    description: '웹 애플리케이션 취약점 분석 및 침투 테스트를 수행했습니다.',
    tags: ['Web Security', 'Penetration Testing'],
    current: false,
  },
],
\`\`\`

**\`current: true\`**: 기간 부분이 보라색으로 강조 표시됩니다.

---

## 4. 프로젝트 정보 수정 (Projects)

\`projects\` 배열을 수정합니다:

\`\`\`typescript
projects: [
  {
    title: 'DeFi Audit Bot',              // 프로젝트명
    type: 'Open Source Tool',             // 프로젝트 유형
    year: '2023',                         // 연도
    description: 'Solidity 0.8.x 컨트랙트에서 일반적인 재진입 공격 및 접근 제어 문제를 탐지하기 위한 자동 정적 분석 도구입니다.',
    tags: ['Python', 'Slither', 'Static Analysis'],
    link: 'https://github.com/fl0wizy/defi-audit-bot',  // 프로젝트 링크 (선택사항)
  },
],
\`\`\`

---

## 5. 학력 정보 수정 (Education)

\`education\` 배열을 수정합니다:

\`\`\`typescript
education: [
  {
    title: 'HuntinMaster (KISA) Web/Web3 Track Trainee',  // 프로그램명
    institution: 'KISA',                   // 기관명
    subInfo: '우수 수료생',                 // 부가 정보 (선택사항)
    period: '2025-07 ~ 2025-10',           // 기간
    description: 'Web과 Web3에 대한 전반적인 보안 지식을 습득했습니다.',
    tags: ['Web Security', 'Web3', 'Audit', 'Bug Bounty'],
  },
  {
    title: 'Department of Cyber Security',
    institution: 'Ajou University',
    subInfo: '아주대학교 사이버보안학과',
    period: '2018 ~ 현재',
    description: '시스템 보안 및 분산 시스템을 중점적으로 공부하고 있습니다.',
    tags: ['시스템 보안', '알고리즘'],
    current: true,                        // 현재 재학 중 (파란색 강조)
  },
],
\`\`\`

---

## 6. 스킬 정보 수정 (Skills)

\`skills\` 배열을 수정합니다:

\`\`\`typescript
skills: [
  {
    name: 'Web3 보안',                     // 스킬명
    category: 'Smart Contracts',          // 카테고리
    level: 'expert',                      // 수준: beginner, intermediate, advanced, expert
    description: 'EVM, 가스 최적화 및 프로토콜 보안 패턴에 대한 깊은 이해를 보유하고 있습니다.',
    tags: ['Solidity', 'Yul', 'Foundry'],
  },
  {
    name: 'Web Security',
    category: 'Application Security',
    level: 'advanced',
    description: 'OWASP Top 10 취약점 분석 및 침투 테스트 경험이 있습니다.',
    tags: ['Burp Suite', 'XSS', 'SQLi'],
  },
],
\`\`\`

---

## 7. 사이드바 로고 텍스트 변경

사이드바에 표시되는 "flowizy's DevLog"와 "SECURITY RESEARCHER" 텍스트를 변경하려면:

\`src/components/Sidebar/Sidebar.tsx\` 파일을 수정합니다:

\`\`\`typescript
<div className="logo-text">
  <h1>Your Name's Blog</h1>    {/* 👈 여기 수정 */}
  <p>YOUR TITLE</p>             {/* 👈 여기 수정 */}
</div>
\`\`\`

---

## 8. 헤더 타이틀 변경

BLOG 페이지 상단 배너의 "Searching for vulnerabilities" 텍스트를 변경하려면:

\`src/components/Header/Header.tsx\` 파일을 수정합니다:

\`\`\`typescript
<h1 className="hero-title">
  Searching for <span className="highlight">vulnerabilities</span>
</h1>
\`\`\`

---

## 9. 전체 수정 흐름 요약

| 수정 항목 | 파일 위치 |
|----------|----------|
| 프로필 사진 | \`public/images/\` + \`data.ts\` |
| 배경 이미지 | \`public/images/\` + \`Header.css\` |
| 기본 정보 (이름, 소개) | \`data.ts\` → \`profileData\` |
| 연락처 | \`data.ts\` → \`profileData.contacts\` |
| 경력 | \`data.ts\` → \`profileData.experiences\` |
| 프로젝트 | \`data.ts\` → \`profileData.projects\` |
| 학력 | \`data.ts\` → \`profileData.education\` |
| 스킬 | \`data.ts\` → \`profileData.skills\` |
| 사이드바 로고 텍스트 | \`Sidebar.tsx\` |
| 헤더 타이틀 | \`Header.tsx\` |

---

## 10. 배포 후 확인

모든 수정이 완료되면:

\`\`\`bash
# 로컬에서 확인
npm run dev

# 문제없으면 배포
npm run deploy
\`\`\`

브라우저에서 \`https://fl0wizy.github.io\`로 접속하여 변경사항을 확인합니다.
`,
    date: '2026-01-29 10:00',
    category: 'daily',
    tags: ['블로그', '프로필', '커스터마이징', '가이드'],
    published: true,
  },
];

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
