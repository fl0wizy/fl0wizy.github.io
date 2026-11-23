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

`src/content/posts/` 폴더에 새 `*.md` 파일을 추가하세요.

게시글 본문은 각 마크다운 파일로 관리되고, 앱은 `src/lib/posts.ts`에서 이를 자동으로 읽어 `blogPosts` 목록으로 변환합니다. `src/lib/data.ts`는 게시글 본문 저장소가 아니라 타입, 카테고리, 프로필 데이터 같은 공통 설정 파일입니다.

파일 예시:

```md
---
id: "my-new-post"                 # URL에 사용될 고유 ID
title: "글 제목"
description: "간단한 설명"
cover: "/images/my-cover.jpg"     # 작은 목록 썸네일 (선택)
date: "2026-01-29 10:00"          # YYYY-MM-DD HH:MM 형식
category: "daily"                 # 카테고리 ID
tags: ["태그1", "태그2"]
published: true                   # false로 설정하면 숨김
---

# 마크다운 형식의 본문

본문 내용을 작성하세요.
```

글 목록은 `date` 기준 최신순으로 자동 정렬됩니다.
목록에는 작은 썸네일과 제목, 소개가 표시됩니다. 제목에는 핵심 주제를 먼저 쓰고, 소개에는 글에서 다루는 내용을 짧게 적으세요. 썸네일은 `cover`로 지정하며, 생략해도 글은 표시됩니다. 설명에 필요한 사진과 도식은 본문에 넣으면 됩니다.
홈과 카테고리 페이지의 탐색 영역에서 글을 검색하거나 태그로 좁혀 볼 수 있습니다. 최근 글과 태그별 개수는 공개 글에서 자동으로 집계됩니다.

본문 렌더링은 `react-markdown` + `remark-gfm` 기반이라 표, 체크리스트, 취소선 같은 GitHub 스타일 마크다운도 사용할 수 있습니다.

### 사용 가능한 카테고리

- `security` - 보안
- `web-network` - 보안 / web/network
- `web3-blockchain` - 보안 / web3/blockchain
- `system` - 보안 / system
- `cs` - CS
- `ai` - AI
- `development` - 개발
- `travel` - 여행
- `daily` - 일상

기존 카테고리 ID로 들어오는 링크는 새 분류에 연결됩니다. 기존 Web3 글의 `research-article`, `study-dev-security`, `wargame-ctf`는 글의 형식을 나타내는 배지로 유지되며, `web3/blockchain`에 함께 집계됩니다.

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
