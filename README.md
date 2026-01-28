# flowizy's DevLog

보안 연구자를 위한 개인 블로그 - React + TypeScript 기반 GitHub Pages 사이트

## 시작하기

### 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

### 배포

```bash
# GitHub Pages에 배포
npm run deploy
```

## 블로그 사용 가이드

### 새 글 작성하기

`src/lib/data.ts` 파일의 `blogPosts` 배열에 새 객체를 추가하세요:

```typescript
{
  id: 'my-new-post',           // URL에 사용될 고유 ID
  title: '글 제목',
  description: '간단한 설명',
  content: `마크다운 형식의 본문`,
  date: '2026-01-29 10:00',    // YYYY-MM-DD HH:MM 형식
  category: 'daily',           // 카테고리 ID
  tags: ['태그1', '태그2'],
  published: true,             // false로 설정하면 숨김
}
```

### 사용 가능한 카테고리

- `daily` - 일상
- `security` - 보안
- `web-security` - Web Security
- `web3-blockchain` - Web3/Blockchain
- `research-article` - Research/Article
- `study-dev-security` - Study
- `wargame-ctf` - Wargame/CTF
- `reversing` - Reversing
- `pwn` - Pwn
- `crypto` - Crypto
- `development` - 개발
- `travel` - 여행

### 프로필 수정하기

`src/lib/data.ts` 파일의 `profileData` 객체를 수정하세요:

- `name` - 이름
- `title` - 직함
- `bio` - 자기소개
- `profileImage` - 프로필 이미지 경로
- `contacts` - 연락처 정보
- `experiences` - 경력
- `projects` - 프로젝트
- `education` - 학력
- `skills` - 스킬

### 프로필 이미지 추가하기

1. 이미지 파일을 `public/images/` 폴더에 저장
2. `profileData.profileImage` 값을 업데이트: `'/images/my-profile.png'`

## 기술 스택

- React 18
- TypeScript
- Vite
- React Router
- gh-pages

## 라이선스

MIT
