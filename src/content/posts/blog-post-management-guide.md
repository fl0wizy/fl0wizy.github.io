---
id: "blog-post-management-guide"
title: "블로그 게시글 작성 및 관리 완벽 가이드"
description: "새 게시글 작성, 카테고리 설정, 날짜 형식, 태그 추가 등 블로그 콘텐츠 관리에 필요한 모든 것을 다룹니다."
date: "2026-01-29 09:00"
category: "daily"
tags: ["블로그", "가이드", "게시글관리"]
published: true
---
# 블로그 게시글 작성 및 관리 완벽 가이드

이 가이드에서는 flowizy's DevLog에 새 게시글을 작성하고 관리하는 방법을 상세하게 설명합니다.

---

## 1. 게시글 데이터 파일 위치

모든 게시글은 `src/content/posts/` 폴더의 개별 마크다운 파일로 관리됩니다:

```
src/content/posts/*.md
```

새 글을 작성할 때는 새 `.md` 파일을 추가하면 됩니다.

---

## 2. 새 게시글 작성 방법

### 2.1 기본 구조

`src/content/posts/` 폴더에 새 `.md` 파일을 추가합니다.

```md
---
id: "unique-post-id"            # URL에 사용될 고유 ID (영문, 숫자, 하이픈)
title: "게시글 제목"              # 게시글 제목
description: "짧은 설명"          # 목록에 표시될 요약
date: "2026-01-29 14:30"        # 작성일 (YYYY-MM-DD HH:MM)
category: "daily"               # 카테고리 ID
tags: ["태그1", "태그2"]          # 태그 배열 (선택사항)
published: true                 # 공개 여부
---

# 게시글 제목

마크다운 형식의 본문
```

### 2.2 실제 예시

```md
---
id: "smart-contract-audit-checklist"
title: "스마트 컨트랙트 감사 체크리스트"
description: "Solidity 기반 컨트랙트 감사 시 반드시 확인해야 할 항목들을 정리했습니다."
date: "2026-01-29 15:00"
category: "web3-blockchain"
tags: ["스마트컨트랙트", "보안", "감사"]
published: true
---

# 스마트 컨트랙트 감사 체크리스트

## 1. 재진입 공격 (Reentrancy)

외부 호출 전에 상태를 업데이트했는지 확인합니다.
```

---

## 3. 카테고리 설정

### 3.1 사용 가능한 카테고리

`category` 필드에는 다음 값들을 사용할 수 있습니다:

| 카테고리 ID | 표시 이름 | 설명 |
|------------|----------|------|
| `daily` | 일상(DAILY) | 일상적인 이야기 |
| `security` | 보안(SECURITY) | 보안 관련 상위 카테고리 |
| `web-security` | Web Security | 웹 보안 |
| `web3-blockchain` | Web3/Blockchain | 블록체인 보안 |
| `research-article` | Research/Article | 연구 자료 |
| `study-dev-security` | Study | 학습 기록 |
| `wargame-ctf` | Wargame/CTF | CTF 풀이 |
| `reversing` | Reversing | 리버싱 |
| `pwn` | Pwn | 시스템 해킹 |
| `crypto` | Crypto | 암호학 |
| `development` | 개발(DEVELOPMENT) | 개발 관련 |
| `travel` | 여행(TRAVEL) | 여행 기록 |

### 3.2 새 카테고리 추가하기

`data.ts` 파일의 `categories` 배열을 수정합니다:

```typescript
export const categories: Category[] = [
  { id: 'all', name: '전체', icon: 'grid' },
  // 새 카테고리 추가
  { id: 'my-new-category', name: '새 카테고리', icon: 'code' },
  // ...
];
```

사용 가능한 아이콘: `grid`, `shield`, `globe`, `zap`, `cpu`, `terminal`, `lock`, `code`, `map`, `user`

---

## 4. 날짜 형식

날짜는 반드시 다음 형식을 따라야 합니다:

```
YYYY-MM-DD HH:MM
```

**예시:**
- `2026-01-29 09:00` → 2026년 1월 29일 오전 9시
- `2026-02-14 18:30` → 2026년 2월 14일 오후 6시 30분

이 날짜를 기준으로 "약 N시간 전" 같은 상대 시간이 자동으로 계산됩니다.

---

## 5. 마크다운 문법

### 5.1 제목

```markdown
# H1 제목 (가장 큰 제목)
## H2 제목
### H3 제목
```

### 5.2 텍스트 스타일

```markdown
**굵은 텍스트**
*기울임 텍스트*
~~취소선~~
\`인라인 코드\`
```

### 5.3 코드 블록

언어를 지정하면 문법 강조가 적용됩니다:

```markdown
\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
```

### 5.4 링크와 이미지

```markdown
[링크 텍스트](https://example.com)
![이미지 설명](/images/my-image.png)
```

### 5.5 리스트

```markdown
- 항목 1
- 항목 2
- 항목 3

1. 첫 번째
2. 두 번째
3. 세 번째
```

### 5.6 인용문

```markdown
> 이것은 인용문입니다.
```

---

## 6. 게시글 비공개 설정

`published` 필드를 `false`로 설정하면 게시글이 목록에 표시되지 않습니다:

```typescript
{
  id: 'draft-post',
  title: '작성 중인 글',
  // ...
  published: false,  // 비공개
}
```

---

## 7. 배포 방법 (글 작성 후 필수!)

게시글을 작성하거나 수정한 후에는 반드시 아래 과정을 거쳐야 블로그에 반영됩니다.

### 7.1 로컬 미리보기 (선택)

배포 전에 로컬에서 먼저 확인하고 싶다면:

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 확인합니다.
확인이 끝나면 터미널에서 `Ctrl + C`로 종료합니다.

### 7.2 GitHub에 커밋 및 푸시

```bash
# 1. 모든 변경사항 스테이징
git add .

# 2. 커밋 (메시지는 자유롭게)
git commit -m "새 글 추가: 글제목"

# 3. GitHub에 푸시
git push origin main
```

### 7.3 GitHub Pages 배포

```bash
npm run deploy
```

이 명령어가 자동으로 빌드하고 `gh-pages` 브랜치에 배포합니다.
SSH 키 암호를 여러 번 물어볼 수 있는데, 정상입니다.
"Published"가 나오면 배포 완료!

### 7.4 한 줄로 모두 실행하기

매번 명령어 4개 치기 귀찮으면 한 줄로:

```bash
git add . && git commit -m "update" && git push origin main && npm run deploy
```

### 7.5 배포 확인

2-3분 후 https://fl0wizy.github.io 에 접속하여 변경사항을 확인합니다.

---

## 8. 주의사항

1. **ID 중복 금지**: 각 게시글의 `id`는 고유해야 합니다.
2. **특수문자 주의**: 마크다운에서 백틱(\`)을 사용할 때는 이스케이프 처리가 필요합니다.
3. **이미지 경로**: 이미지는 `public/images/` 폴더에 저장하고, 경로는 `/images/파일명`으로 지정합니다.
