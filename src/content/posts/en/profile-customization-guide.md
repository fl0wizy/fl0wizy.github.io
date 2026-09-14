# A Complete Guide to Customizing the Profile and Blog

This guide covers how to change the profile photo, the header background, and every piece of information on the PROFILE page.

---

## 1. Changing images

### 1.1 Changing the profile photo

The profile photo is used in two places:
- the logo area at the top of the sidebar
- the main profile image on the PROFILE page

**How to change it:**

1. Save the new profile image in the `public/images/` folder.
   - Recommended size: 400x400px or larger
   - Recommended format: JPG or PNG

2. Open `src/lib/data.ts` and edit the `profileData.profileImage` value:

```typescript
export const profileData: ProfileData = {
  // ...
  profileImage: '/images/새로운프로필.jpg',  // 👈 여기 수정
  // ...
};
```

### 1.2 Changing the header background image

To change the space background image at the top of the BLOG page:

1. Save the new background image in the `public/images/` folder.
   - Recommended size: 1920x600px or larger
   - A dark-toned image is recommended (text legibility)

2. Open `src/components/Header/Header.css` and edit the following part:

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

## 2. Editing basic profile information

Edit the `profileData` object in `src/lib/data.ts`.

### 2.1 Name and title

```typescript
export const profileData: ProfileData = {
  name: 'flowizy',              // 닉네임
  title: 'SECURITY RESEARCHER',  // 직함
  bio: '관심 있는 것들을 공부하고 기록합니다.',  // 소개 문구
  // ...
};
```

**Note:** the Korean name is hardcoded in the ProfileCard component. To change it, edit `src/components/Profile/ProfileCard.tsx`.

### 2.2 Contacts

Edit contact information in the `contacts` array:

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

**Behavior by contact type:**
- `github`, `linkedin`: clicking opens the external link (new tab)
- `discord`, `telegram`, `email`: a copy button is shown (clicking copies to the clipboard)

---

## 3. Editing experience

Edit the `experiences` array:

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

**`current: true`**: the period is highlighted in purple.

---

## 4. Editing projects

Edit the `projects` array:

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

## 5. Editing education

Edit the `education` array:

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

## 6. Editing skills

Edit the `skills` array:

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

## 7. Changing the sidebar logo text

To change the "flowizy's DevLog" and "SECURITY RESEARCHER" text shown in the sidebar:

Edit `src/components/Sidebar/Sidebar.tsx`:

```typescript
<div className="logo-text">
  <h1>Your Name's Blog</h1>    {/* 👈 여기 수정 */}
  <p>YOUR TITLE</p>             {/* 👈 여기 수정 */}
</div>
```

---

## 8. Changing the header title

To change the "Searching for vulnerabilities" text in the banner at the top of the BLOG page:

Edit `src/components/Header/Header.tsx`:

```typescript
<h1 className="hero-title">
  Searching for <span className="highlight">vulnerabilities</span>
</h1>
```

---

## 9. The whole edit map at a glance

| What you're editing | File location |
|----------|----------|
| Profile photo | `public/images/` + `src/lib/data.ts` |
| Background image | `public/images/` + `src/components/Header/Header.css` |
| Basic info (name, bio) | `src/lib/data.ts` → `profileData` |
| Contacts | `src/lib/data.ts` → `profileData.contacts` |
| Experience | `src/lib/data.ts` → `profileData.experiences` |
| Projects | `src/lib/data.ts` → `profileData.projects` |
| Education | `src/lib/data.ts` → `profileData.education` |
| Skills | `src/lib/data.ts` → `profileData.skills` |
| Post bodies | `src/content/posts/*.md` |
| Sidebar logo text | `src/components/Sidebar/Sidebar.tsx` |
| Header title | `src/components/Header/Header.tsx` |

---

## 10. Checking after deploy

Once every edit is done:

```bash
# 로컬에서 확인
npm run dev

# 문제없으면 배포
npm run deploy
```

Open `https://fl0wizy.github.io` in the browser and check the changes.
