# A Complete Guide to Writing and Managing Blog Posts

This guide explains in detail how to write and manage a new post on flowizy's DevLog.

---

## 1. Where post data lives

Every post is managed as an individual markdown file in the `src/content/posts/` folder:

```
src/content/posts/*.md
```

To write a new post, add a new `.md` file.

The app reads this folder automatically in `src/lib/posts.ts` and builds the post list from it.
`src/lib/data.ts` is not where post bodies are stored — it is the shared configuration file that manages types, categories, profile information and the like.

---

## 2. How to write a new post

### 2.1 Basic structure

Add a new `.md` file to the `src/content/posts/` folder.

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

### 2.2 A real example

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

## 3. Setting the category

### 3.1 Available categories

The `category` field takes the following values:

| Category ID | Display name | Description |
|------------|----------|------|
| `daily` | 일상(DAILY) | Everyday writing |
| `security` | 보안(SECURITY) | Top-level security category |
| `web-security` | Web Security | Web security |
| `web3-blockchain` | Web3/Blockchain | Blockchain security |
| `research-article` | Research/Article | Research material |
| `study-dev-security` | Study | Study notes |
| `wargame-ctf` | Wargame/CTF | CTF writeups |
| `reversing` | Reversing | Reversing |
| `pwn` | Pwn | Systems hacking |
| `crypto` | Crypto | Cryptography |
| `development` | 개발(DEVELOPMENT) | Development |
| `travel` | 여행(TRAVEL) | Travel notes |

### 3.2 Adding a new category

Edit the `categories` array in `data.ts`:

```typescript
export const categories: Category[] = [
  { id: 'all', name: '전체', icon: 'grid' },
  // 새 카테고리 추가
  { id: 'my-new-category', name: '새 카테고리', icon: 'code' },
  // ...
];
```

Available icons: `grid`, `shield`, `globe`, `zap`, `cpu`, `terminal`, `lock`, `code`, `map`, `user`

---

## 4. Date format

The date must follow this format:

```
YYYY-MM-DD HH:MM
```

**Examples:**
- `2026-01-29 09:00` → 29 January 2026, 9:00 am
- `2026-02-14 18:30` → 14 February 2026, 6:30 pm

Relative times such as "about N hours ago" are calculated automatically from this date.

---

## 5. Markdown syntax

### 5.1 Headings

```markdown
# H1 제목 (가장 큰 제목)
## H2 제목
### H3 제목
```

### 5.2 Text styles

```markdown
**굵은 텍스트**
*기울임 텍스트*
~~취소선~~
\`인라인 코드\`
```

### 5.3 Code blocks

Specifying a language applies syntax highlighting:

```markdown
\`\`\`python
def hello():
    print("Hello, World!")
\`\`\`
```

### 5.4 Links and images

```markdown
[링크 텍스트](https://example.com)
![이미지 설명](/images/my-image.png)
```

### 5.5 Lists

```markdown
- 항목 1
- 항목 2
- 항목 3

1. 첫 번째
2. 두 번째
3. 세 번째
```

### 5.6 Blockquotes

```markdown
> 이것은 인용문입니다.
```

### 5.7 Tables and checklists

The blog currently supports GitHub Flavored Markdown as well.

```markdown
| 항목 | 상태 |
|------|------|
| 초안 | 진행 중 |
| 배포 | 완료 |

- [x] 제목 작성
- [ ] 이미지 추가
```

---

## 6. Keeping a post private

Setting the `published` field to `false` keeps the post out of the list:

```typescript
{
  id: 'draft-post',
  title: '작성 중인 글',
  // ...
  published: false,  // 비공개
}
```

---

## 7. Deploying (required after writing!)

After writing or editing a post, the steps below are what actually get it onto the blog.

### 7.1 Local preview (optional)

To check locally before deploying:

```bash
npm run dev
```

Open `http://localhost:5173` in the browser and check.
When done, stop it from the terminal with `Ctrl + C`.

### 7.2 Commit and push to GitHub

```bash
# 1. 모든 변경사항 스테이징
git add .

# 2. 커밋 (메시지는 자유롭게)
git commit -m "새 글 추가: 글제목"

# 3. GitHub에 푸시
git push origin main
```

### 7.3 Deploy to GitHub Pages

```bash
npm run deploy
```

This command builds and deploys to the `gh-pages` branch automatically.
It may ask for the SSH key passphrase several times, which is normal.
"Published" means the deploy is done.

### 7.4 Running it all in one line

If typing four commands every time is tedious, one line does it:

```bash
git add . && git commit -m "update" && git push origin main && npm run deploy
```

### 7.5 Verifying the deploy

After 2–3 minutes, open https://fl0wizy.github.io and check the changes.

---

## 8. Things to watch for

1. **No duplicate IDs**: each post's `id` must be unique.
2. **Frontmatter placement**: the `---` block at the very top of the file is the metadata area, so its format has to hold until the body begins.
3. **Image paths**: store images in the `public/images/` folder and write the path as `/images/filename`.
4. **Which file is which**: post bodies live in `src/content/posts/*.md`; category and profile settings are managed in `src/lib/data.ts`.
