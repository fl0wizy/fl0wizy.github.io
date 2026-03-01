---
id: "profile-customization-guide"
title: "프로필 및 블로그 커스터마이징 완벽 가이드"
description: "프로필 사진, 배경 이미지, 연락처, 경력, 학력 등 모든 개인 정보를 수정하는 방법을 상세히 설명합니다."
date: "2026-01-29 10:00"
category: "daily"
tags: ["블로그", "프로필", "커스터마이징", "가이드"]
published: true
---
# 프로필 및 블로그 커스터마이징 완벽 가이드

이 가이드에서는 프로필 사진, 헤더 배경, 그리고 PROFILE 페이지의 모든 정보를 수정하는 방법을 다룹니다.

---

## 1. 이미지 변경

### 1.1 프로필 사진 변경

프로필 사진은 두 곳에서 사용됩니다:
- 사이드바 상단의 로고 영역
- PROFILE 페이지의 메인 프로필 이미지

**변경 방법:**

1. 새 프로필 이미지를 `public/images/` 폴더에 저장합니다.
   - 권장 크기: 400x400px 이상
   - 권장 형식: JPG 또는 PNG

2. `src/lib/data.ts` 파일을 열고 `profileData.profileImage` 값을 수정합니다:

```typescript
export const profileData: ProfileData = {
  // ...
  profileImage: '/images/새로운프로필.jpg',  // 👈 여기 수정
  // ...
};
```

### 1.2 헤더 배경 이미지 변경

BLOG 페이지 상단의 우주 배경 이미지를 변경하려면:

1. 새 배경 이미지를 `public/images/` 폴더에 저장합니다.
   - 권장 크기: 1920x600px 이상
   - 어두운 톤의 이미지 권장 (텍스트 가독성)

2. `src/components/Header/Header.css` 파일을 열고 다음 부분을 수정합니다:

```css
.hero-background {
  /* ... */
  background: 
    linear-gradient(180deg, 
      rgba(5, 5, 10, 0.3) 0%,
      rgba(5, 5, 10, 0.6) 100%),
    url('/images/새로운배경.png');  /* 👈 여기 수정 */
  /* ... */
}
```

---

## 2. 기본 프로필 정보 수정

`src/lib/data.ts` 파일의 `profileData` 객체를 수정합니다.

### 2.1 이름 및 타이틀

```typescript
export const profileData: ProfileData = {
  name: 'flowizy',              // 닉네임
  title: 'SECURITY RESEARCHER',  // 직함
  bio: '관심 있는 것들을 공부하고 기록합니다.',  // 소개 문구
  // ...
};
```

**참고:** Korean name은 ProfileCard 컴포넌트에서 하드코딩되어 있습니다. 변경하려면 `src/components/Profile/ProfileCard.tsx`를 수정하세요.

### 2.2 연락처 정보 (Contacts)

`contacts` 배열에서 연락처 정보를 수정합니다:

```typescript
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
```

**연락처 타입별 동작:**
- `github`, `linkedin`: 클릭 시 외부 링크로 이동 (새 탭)
- `discord`, `telegram`, `email`: 복사 버튼 표시 (클릭 시 클립보드에 복사)

---

## 3. 경력 정보 수정 (Experience)

`experiences` 배열을 수정합니다:

```typescript
experiences: [
  {
    title: 'The 10th President of the Student Council',  // 직책
    company: 'Ajou University-department of cyber security',           // 회사명
    period: '2025-01 ~ 2025-12',                 // 기간
    description: '2025년도 아주대학교 사이버보안학과 제10대 학생회장으로 역임.',  // 설명
    tags: ['학생회', '자치활동', '책임감감'],  // 관련 기술 태그
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
```

**`current: true`**: 기간 부분이 보라색으로 강조 표시됩니다.

---

## 4. 프로젝트 정보 수정 (Projects)

`projects` 배열을 수정합니다:

```typescript
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
```

---

## 5. 학력 정보 수정 (Education)

`education` 배열을 수정합니다:

```typescript
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
    title: 'HuntinMaster (KISA) Web/Web3 Track Trainee',  // 프로그램명
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
```

---

## 6. 스킬 정보 수정 (Skills)

`skills` 배열을 수정합니다:

```typescript
skills: [
  {
    name: 'Web3 보안',                     // 스킬명
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
```

---

## 7. 사이드바 로고 텍스트 변경

사이드바에 표시되는 "flowizy's DevLog"와 "SECURITY RESEARCHER" 텍스트를 변경하려면:

`src/components/Sidebar/Sidebar.tsx` 파일을 수정합니다:

```typescript
<div className="logo-text">
  <h1>Your Name's Blog</h1>    {/* 👈 여기 수정 */}
  <p>YOUR TITLE</p>             {/* 👈 여기 수정 */}
</div>
```

---

## 8. 헤더 타이틀 변경

BLOG 페이지 상단 배너의 "Searching for vulnerabilities" 텍스트를 변경하려면:

`src/components/Header/Header.tsx` 파일을 수정합니다:

```typescript
<h1 className="hero-title">
  Searching for <span className="highlight">vulnerabilities</span>
</h1>
```

---

## 9. 전체 수정 흐름 요약

| 수정 항목 | 파일 위치 |
|----------|----------|
| 프로필 사진 | `public/images/` + `data.ts` |
| 배경 이미지 | `public/images/` + `Header.css` |
| 기본 정보 (이름, 소개) | `data.ts` → `profileData` |
| 연락처 | `data.ts` → `profileData.contacts` |
| 경력 | `data.ts` → `profileData.experiences` |
| 프로젝트 | `data.ts` → `profileData.projects` |
| 학력 | `data.ts` → `profileData.education` |
| 스킬 | `data.ts` → `profileData.skills` |
| 사이드바 로고 텍스트 | `Sidebar.tsx` |
| 헤더 타이틀 | `Header.tsx` |

---

## 10. 배포 후 확인

모든 수정이 완료되면:

```bash
# 로컬에서 확인
npm run dev

# 문제없으면 배포
npm run deploy
```

브라우저에서 `https://fl0wizy.github.io`로 접속하여 변경사항을 확인합니다.
