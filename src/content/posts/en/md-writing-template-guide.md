# Markdown Post Template

This post is a working template to refer to directly when writing a post in the `src/content/posts/*.md` format.

Post content lives in each `.md` file, and `src/lib/posts.ts` collects them automatically into the list.

---

## 1. Create the file

Create a new file in the `src/content/posts/` folder.

Example:

```bash
src/content/posts/my-new-post.md
```

Keeping the filename close to the `id` is generally recommended.

---

## 2. Write the frontmatter

Put the block below at the very top of the file and change only the values.

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

Field by field:

- `id`: the post's unique value (used in the URL, must not be duplicated)
- `title`: the post title
- `description`: the summary shown in the list
- `date`: `YYYY-MM-DD HH:MM` format
- `category`: the category ID (`daily`, `security`, `web-security`, and so on)
- `tags`: an array of strings
- `published`: `true` publishes it, `false` hides it

---

## 3. Write the body

Everything below the frontmatter is plain markdown.
GitHub-style syntax such as tables, checklists and strikethrough is available as well.

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

## 4. Copy-paste template

Paste the block below into a new file as-is and change only the values.

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
