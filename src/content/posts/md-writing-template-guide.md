---
id: "md-writing-template-guide"
title: "Markdown 포스트 작성 템플릿"
description: "이 파일 형식 그대로 복사해서 새 글을 빠르게 작성하는 방법을 정리했습니다."
date: "2026-03-02 01:10"
category: "daily"
tags: ["markdown", "템플릿", "작성가이드"]
published: true
---
# Markdown 포스트 작성 템플릿

이 글은 `src/content/posts/*.md` 형식으로 글을 작성할 때 바로 참고할 수 있는 실전 템플릿입니다.

---

## 1. 파일 만들기

`src/content/posts/` 폴더에 새 파일을 만듭니다.

예시:

```bash
src/content/posts/my-new-post.md
```

파일명은 보통 `id`와 비슷하게 맞추는 것을 권장합니다.

---

## 2. frontmatter 작성

파일 맨 위에 아래 블록을 넣고 값만 바꿉니다.

```md
---
id: "my-new-post"
title: "글 제목"
description: "목록에서 보일 요약 설명"
date: "2026-03-02 01:10"
category: "daily"
tags: ["태그1", "태그2"]
published: true
---
```

필드 설명:

- `id`: 글 고유값 (URL에 사용됨, 중복 금지)
- `title`: 글 제목
- `description`: 목록 요약
- `date`: `YYYY-MM-DD HH:MM` 형식
- `category`: 카테고리 ID (`daily`, `security`, `web-security` 등)
- `tags`: 문자열 배열
- `published`: `true`면 공개, `false`면 숨김

---

## 3. 본문 작성

frontmatter 아래부터는 일반 마크다운으로 작성하면 됩니다.

````md
# 메인 제목

도입 문장

## 섹션 제목

- 항목 1
- 항목 2

```ts
const message = "hello";
console.log(message);
```

[링크 예시](https://example.com)
````

---

## 4. 바로 쓰는 복붙용 템플릿

아래를 그대로 새 파일에 붙여넣고 값만 변경하세요.

```md
---
id: "replace-with-post-id"
title: "replace with title"
description: "replace with short description"
date: "2026-03-02 01:10"
category: "daily"
tags: ["tag1", "tag2"]
published: true
---

# replace with title

본문을 작성하세요.
```
