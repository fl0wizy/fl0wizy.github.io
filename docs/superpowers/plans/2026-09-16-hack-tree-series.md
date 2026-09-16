# `[hack-tree]` 시리즈 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `[hack-tree]` 브래킷 시리즈를 쓸 수 있는 상태를 만든다 — 글의 품질 규칙을 기계로 검사하는 도구, 기존 19편 내리기, 전경 편 착수.

**Architecture:** 본문은 작성자가 직접 쓴다. 이 계획이 만드는 것은 **그 글이 기존 19편의 실패를 반복하지 않게 막는 게이트**와 착수 지점이다. 게이트는 `scripts/lint-series.mjs` 하나이고, 순수 함수로 쪼개 `node --test`로 검사한다. `scripts/lint-posts.mjs`와 겹치는 마크다운 유틸은 `scripts/lib/markdown.mjs`로 추출해 공유한다.

**Tech Stack:** Node 24 (ESM), `node --test` + `node:assert` (내장, 새 의존성 없음), `unified` + `remark-parse` + `remark-gfm` (이미 설치됨).

**Spec:** `docs/superpowers/specs/2026-09-16-hack-tree-series-design.md`

---

## 파일 구조

| 파일 | 책임 |
|---|---|
| `scripts/lib/markdown.mjs` | **생성.** 프론트매터 파싱, mdast 파싱, 노드 수집, 조상 추적 walk. lint-posts와 lint-series가 공유 |
| `scripts/lint-posts.mjs` | **수정.** 위 유틸을 import 하도록 바꾼다. 검사 내용은 그대로 |
| `scripts/lint-series.mjs` | **생성.** 시리즈 전용 스타일 게이트. 순수 함수 3개 + CLI |
| `scripts/lint-series.test.mjs` | **생성.** 위 순수 함수의 단위 테스트 |
| `scripts/series-known-terms.txt` | **생성.** 설명 없이 써도 되는 "전제 배경" 용어 목록 |
| `package.json` | **수정.** `lint:series` 스크립트 추가 |
| `src/content/posts/net-browser-*.md` (19개) | **수정.** `published: false` |
| `src/content/posts/hack-tree-overview.md` | **생성.** 전경 편 착수 |
| `public/images/hack-tree/overview.svg` | **생성.** 전경 편 아키텍처 그림 |

**왜 `lint-posts.mjs`에 얹지 않고 새 스크립트인가.** `lint-posts`는 "쓴 대로 렌더되는가"(취소선, 깨진 이미지, 프론트매터)를 전 글에 대해 검사한다. `lint-series`는 "이 시리즈의 문체 규칙을 지켰는가"를 한 시리즈에 대해 검사한다. 목적도 대상도 다르고, 후자는 allowlist 판단이 들어가므로 빌드를 막으면 안 된다(아래).

**규칙 2(표는 비교에만 쓴다)에는 별도 검사를 만들지 않는다.** 표가 비교인지 나열인지는 모양으로 구별되지 않는다 — 12편 §5의 `변경 | 배경` 표는 형태만 보면 정상적인 비교표다. 그 표가 해로웠던 실제 이유는 **칸에 든 용어가 설명된 적이 없어서**이고, 그것은 규칙 1 검사가 잡는다. 규칙 2는 규칙 1이 통과한 뒤 사람이 읽고 판단할 문장 규칙으로 남긴다. 모양만 보는 약한 검사를 덧붙이면 통과했다는 잘못된 신호만 준다.

**`lint:series`는 `npm run build`에 물리지 않는다.** 규칙 1은 allowlist 유지가 필요한 검사라, 빌드를 실패시키면 용어를 설명하는 대신 allowlist에 밀어 넣는 압력이 생긴다. 글 쓰는 동안 직접 돌리는 저작 보조 도구로 둔다.

---

## Task 1: 마크다운 유틸 추출

기존 동작을 바꾸지 않는 순수 리팩터. 먼저 현재 출력을 고정해 두고, 리팩터 후 동일한지 비교한다.

**Files:**
- Create: `scripts/lib/markdown.mjs`
- Modify: `scripts/lint-posts.mjs`

- [ ] **Step 1: 현재 lint:posts 출력을 스냅샷으로 저장**

```bash
cd /Users/flowizy/github_blog
npm run lint:posts > /tmp/lint-posts-before.txt 2>&1; echo "exit=$?"
tail -3 /tmp/lint-posts-before.txt
```

Expected: 마지막 줄이 `검사 47개 글 + 영어판 47개 · 오류 0건 · 경고 3건  ✅`, `exit=0`

- [ ] **Step 2: `scripts/lib/markdown.mjs` 생성**

```js
// 마크다운 저작 검사 스크립트들이 공유하는 파서 유틸.
// lint-posts.mjs(렌더 정확성)와 lint-series.mjs(시리즈 문체 규칙)가 함께 쓴다.

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const processor = unified().use(remarkParse).use(remarkGfm);

/**
 * 프론트매터를 얕게 파싱한다. 값은 전부 문자열로 둔다 —
 * 배열·불리언 해석이 필요한 쪽에서 직접 처리한다.
 * offset: 본문이 원본에서 몇 번째 줄부터 시작하는지 (에러 줄번호 보정용)
 */
export function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return { fm: {}, body: raw, offset: 0 };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { fm: {}, body: raw, offset: 0 };
  const head = raw.slice(4, end);
  const fm = {};
  for (const line of head.split('\n')) {
    const m = line.match(/^(\w+)\s*:\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  const offset = raw.slice(0, end + 5).split('\n').length - 1;
  return { fm, body: raw.slice(end + 5), offset };
}

/** 프론트매터의 tags 값(`["a", "b"]` 꼴 문자열)을 배열로 푼다. */
export function parseTags(value) {
  if (!value) return [];
  return [...value.matchAll(/"([^"]*)"|'([^']*)'/g)].map((m) => m[1] ?? m[2]);
}

/** 본문을 remark-gfm까지 태운 mdast로 만든다. */
export function parseMarkdown(body) {
  return processor.run(processor.parse(body));
}

/** 주어진 타입의 노드를 문서 순서로 모은다. */
export function collect(tree, type) {
  const out = [];
  walk(tree, (n) => {
    if (n.type === type) out.push(n);
  });
  return out;
}

/** 노드 아래의 모든 텍스트를 이어 붙인다. */
export function plainText(node) {
  let s = '';
  walk(node, (n) => {
    if (n.value) s += n.value;
  });
  return s;
}

/**
 * 문서 순서(깊이 우선)로 순회하며 visit(node, ancestors)를 부른다.
 * ancestors는 루트부터 부모까지의 배열 — "이 노드가 표 칸 안인가" 같은
 * 문맥 판정에 쓴다.
 */
export function walk(node, visit, ancestors = []) {
  visit(node, ancestors);
  const next = [...ancestors, node];
  for (const child of node.children || []) walk(child, visit, next);
}
```

- [ ] **Step 3: `lint-posts.mjs`가 이 유틸을 쓰게 수정**

`scripts/lint-posts.mjs`에서 다음을 지운다:
- `import { unified } from 'unified';`, `import remarkParse from 'remark-parse';`, `import remarkGfm from 'remark-gfm';`
- `const processor = unified().use(remarkParse).use(remarkGfm);`
- `function parseFrontmatter(raw) { ... }` 전체
- `function plainText(node) { ... }` 전체
- `function collect(tree, type) { ... }` 전체

그 자리에 import를 넣는다 (`import fs`/`path`/`fileURLToPath` 다음 줄):

```js
import { parseFrontmatter, parseMarkdown, collect, plainText } from './lib/markdown.mjs';
```

그리고 본문의 파싱 호출 한 줄을 바꾼다:

```js
// 변경 전
const tree = await processor.run(processor.parse(body));
// 변경 후
const tree = await parseMarkdown(body);
```

- [ ] **Step 4: 출력이 동일한지 확인**

```bash
cd /Users/flowizy/github_blog
npm run lint:posts > /tmp/lint-posts-after.txt 2>&1; echo "exit=$?"
diff /tmp/lint-posts-before.txt /tmp/lint-posts-after.txt && echo "IDENTICAL"
```

Expected: `IDENTICAL`, `exit=0`. diff가 나오면 리팩터가 동작을 바꾼 것이므로 되돌린다.

- [ ] **Step 5: 커밋**

```bash
cd /Users/flowizy/github_blog
git add scripts/lib/markdown.mjs scripts/lint-posts.mjs
git commit -m "refactor(scripts): 마크다운 파서 유틸을 lib/markdown.mjs로 추출

lint-posts와 곧 추가할 lint-series가 같은 프론트매터 파서와 mdast
순회를 쓴다. 조상 추적 walk()를 새로 넣어 '이 노드가 표 칸 안인가'
같은 문맥 판정이 가능하게 했다. lint:posts 출력은 바이트 단위로 동일하다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 2: 규칙 3 검사 — 편당 `/post/` 링크 수

가장 단순한 규칙부터 만들어 스크립트 뼈대를 세운다.

**Files:**
- Create: `scripts/lint-series.mjs`
- Create: `scripts/lint-series.test.mjs`

- [ ] **Step 1: 실패하는 테스트 작성**

`scripts/lint-series.test.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { parseMarkdown } from './lib/markdown.mjs';
import { countPostLinks } from './lint-series.mjs';

test('countPostLinks는 /post/ 링크만 센다', async () => {
  const tree = await parseMarkdown(
    '[가](/post/x) 와 [나](/post/y) 와 [다](https://example.com) 와 [라](/images/z.svg)',
  );
  assert.equal(countPostLinks(tree), 2);
});

test('countPostLinks는 링크가 없으면 0', async () => {
  const tree = await parseMarkdown('링크 없는 문단.');
  assert.equal(countPostLinks(tree), 0);
});
```

- [ ] **Step 2: 실패 확인**

```bash
cd /Users/flowizy/github_blog
node --test scripts/lint-series.test.mjs
```

Expected: FAIL — `Cannot find module '.../scripts/lint-series.mjs'`

- [ ] **Step 3: 최소 구현**

`scripts/lint-series.mjs`:

```js
#!/usr/bin/env node

/**
 * [hack-tree] 시리즈 전용 문체 게이트.
 *
 * lint-posts.mjs가 "쓴 대로 렌더되는가"를 보는 것과 달리, 이 스크립트는
 * 설계 스펙(docs/superpowers/specs/2026-09-16-hack-tree-series-design.md §4)의
 * 규칙 셋을 검사한다. 앞선 네트워크 19편이 실패한 지점을 그대로 게이트로
 * 돌린 것이다.
 *
 * 사용:  npm run lint:series
 * 이 스크립트는 빌드를 막지 않는다 — 판단이 필요한 검사라 저작 보조로 둔다.
 */

import { collect } from './lib/markdown.mjs';

/** 규칙 3 — 다른 편으로 나가는 링크 수. 전경 편을 뺀 모든 편이 1개 이하여야 한다. */
export function countPostLinks(tree) {
  return collect(tree, 'link').filter((n) => (n.url || '').startsWith('/post/')).length;
}
```

- [ ] **Step 4: 통과 확인**

```bash
cd /Users/flowizy/github_blog
node --test scripts/lint-series.test.mjs
```

Expected: PASS — `# pass 2`, `# fail 0`

- [ ] **Step 5: 커밋**

```bash
cd /Users/flowizy/github_blog
git add scripts/lint-series.mjs scripts/lint-series.test.mjs
git commit -m "feat(scripts): lint-series 뼈대 + 규칙 3(편 간 링크 수) 검사

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 3: 규칙 1 검사 — 용어의 첫 등장이 표 안인가

PKCE 사고를 막는 검사. 12편 §5에서 표 6줄 전부가 설명된 적 없는 용어를 참조했고, 시리즈 전체에 그런 용어가 28개였다.

**판정 규칙:** 용어 후보의 **첫 등장 노드가 표 칸(`tableCell`)의 자손**이면 위반. 본문에서 먼저 설명하고 나중에 표로 정리하는 것은 통과한다.

**용어 후보:** `/\b[A-Z][A-Za-z0-9]{2,}\b/` — 대문자로 시작하는 3자 이상 영숫자 토큰. `PKCE`, `SNI`, `Caddy`, `GitHub`가 잡히고 한글·2자 약어는 빠진다.

**allowlist:** 설명 없이 써도 되는 전제 배경 용어. 파일에 없으면 설명하거나 파일에 추가하라는 뜻이다.

**Files:**
- Create: `scripts/series-known-terms.txt`
- Modify: `scripts/lint-series.mjs`
- Modify: `scripts/lint-series.test.mjs`

- [ ] **Step 1: 실패하는 테스트 추가**

`scripts/lint-series.test.mjs` 끝에 덧붙인다 (import 줄도 함께 수정):

```js
// 파일 상단 import 를 이렇게 바꾼다:
// import { countPostLinks, findTableFirstTerms } from './lint-series.mjs';

test('findTableFirstTerms는 첫 등장이 표 칸인 용어를 잡는다', async () => {
  const md = [
    '본문에서 Caddy 를 먼저 설명한다.',
    '',
    '| 변경 | 배경 |',
    '| --- | --- |',
    '| PKCE 필수 | 인가 코드 탈취 |',
    '| Caddy 설정 | 엣지 |',
  ].join('\n');
  const tree = await parseMarkdown(md);
  const hits = findTableFirstTerms(tree, new Set());
  assert.deepEqual(hits.map((h) => h.term), ['PKCE']);
});

test('findTableFirstTerms는 allowlist에 있는 용어를 건너뛴다', async () => {
  const md = ['| 도구 |', '| --- |', '| GitHub |'].join('\n');
  const tree = await parseMarkdown(md);
  assert.deepEqual(findTableFirstTerms(tree, new Set()).map((h) => h.term), ['GitHub']);
  assert.deepEqual(findTableFirstTerms(tree, new Set(['GitHub'])), []);
});

test('findTableFirstTerms는 같은 용어를 한 번만 보고한다', async () => {
  const md = ['| a | b |', '| --- | --- |', '| PKCE | PKCE |'].join('\n');
  const tree = await parseMarkdown(md);
  assert.equal(findTableFirstTerms(tree, new Set()).length, 1);
});
```

- [ ] **Step 2: 실패 확인**

```bash
cd /Users/flowizy/github_blog
node --test scripts/lint-series.test.mjs
```

Expected: FAIL — `findTableFirstTerms is not a function`

- [ ] **Step 3: 구현 추가**

`scripts/lint-series.mjs`의 import 줄을 바꾸고 함수를 덧붙인다:

```js
// import 줄을 이렇게 바꾼다:
// import { collect, walk } from './lib/markdown.mjs';

/** 대문자로 시작하는 3자 이상 영숫자 토큰. 한글과 2자 약어는 대상이 아니다. */
const TERM_RE = /\b[A-Z][A-Za-z0-9]{2,}\b/g;

/**
 * 규칙 1 — 용어가 표 칸에서 처음 등장하는 것을 금지한다.
 * 문서 순서로 순회하며 각 용어의 첫 등장 위치를 기록하고,
 * 그 위치가 표 칸 안이면서 allowlist에 없는 것만 돌려준다.
 */
export function findTableFirstTerms(tree, known) {
  const firstSeen = new Map(); // term -> { inTable, line }
  walk(tree, (node, ancestors) => {
    if (node.type !== 'text' && node.type !== 'inlineCode') return;
    const inTable = ancestors.some((a) => a.type === 'tableCell');
    const line = node.position?.start?.line ?? 0;
    for (const [term] of String(node.value ?? '').matchAll(TERM_RE)) {
      if (!firstSeen.has(term)) firstSeen.set(term, { inTable, line });
    }
  });
  return [...firstSeen]
    .filter(([term, at]) => at.inTable && !known.has(term))
    .map(([term, at]) => ({ term, line: at.line }));
}
```

- [ ] **Step 4: 통과 확인**

```bash
cd /Users/flowizy/github_blog
node --test scripts/lint-series.test.mjs
```

Expected: PASS — `# pass 5`, `# fail 0`

- [ ] **Step 5: allowlist 파일 생성**

`scripts/series-known-terms.txt`:

```
# 설명 없이 써도 되는 전제 배경 용어.
# 여기 없는 용어가 표 칸에서 처음 등장하면 lint:series 가 잡는다.
# 잡혔을 때의 선택지는 둘 중 하나다 — 본문에서 먼저 설명하거나, 여기 추가하거나.
# 추가는 "이 시리즈 독자가 이미 안다고 가정해도 되는가"로 판단한다.

# 프로토콜·웹 기본
HTTP
HTTPS
TLS
DNS
URL
URI
API
JSON
YAML
CORS
SSH
SQL

# 이 프로젝트가 쓰는 도구·서비스 (전경 편에서 한 번에 소개된다)
GitHub
Actions
Docker
GHCR
GCP
SQLite
Caddy
Next
React
FastAPI
Python
TypeScript
Node
Terraform
HuggingFace
```

- [ ] **Step 6: 커밋**

```bash
cd /Users/flowizy/github_blog
git add scripts/lint-series.mjs scripts/lint-series.test.mjs scripts/series-known-terms.txt
git commit -m "feat(scripts): 규칙 1 검사 — 용어 첫 등장이 표 칸이면 잡는다

네트워크 19편에서 표 칸에만 등장하고 본문에서 설명된 적 없는 용어가
28개였다(PKCE, SSTI, XXE, XFF, AES-GCM…). 그 실패를 그대로 게이트로
돌린다. allowlist는 '독자가 이미 안다고 가정해도 되는가'로 판단한다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 4: SVG 정당성 검사 — 화살표가 없으면 그림이 아니다

기존 19장 중 7장이 화살표 0개였다. 관계를 그리지 않으면 그것은 박스에 담아 이미지로 만든 글이고, 검색·복사·스크린리더·번역이 전부 막힌다.

**Files:**
- Modify: `scripts/lint-series.mjs`
- Modify: `scripts/lint-series.test.mjs`

- [ ] **Step 1: 실패하는 테스트 추가**

`scripts/lint-series.test.mjs` 끝에 덧붙인다 (import에 `findSvgRefs`, `countArrows` 추가):

```js
test('findSvgRefs는 .svg 이미지만 돌려준다', async () => {
  const tree = await parseMarkdown('![가](/images/x/a.svg)\n\n![나](/images/x/b.png)');
  assert.deepEqual(findSvgRefs(tree).map((r) => r.url), ['/images/x/a.svg']);
});

test('countArrows는 marker-end 개수를 센다', () => {
  assert.equal(countArrows('<line marker-end="url(#a)"/><path marker-end="url(#a)"/>'), 2);
  assert.equal(countArrows('<rect x="0"/><text>가</text>'), 0);
});
```

- [ ] **Step 2: 실패 확인**

```bash
cd /Users/flowizy/github_blog
node --test scripts/lint-series.test.mjs
```

Expected: FAIL — `findSvgRefs is not a function`

- [ ] **Step 3: 구현 추가**

`scripts/lint-series.mjs`에 덧붙인다:

```js
/** 본문이 참조하는 SVG 이미지. PNG·JPG는 대상이 아니다(사진은 번역·구조화가 불가). */
export function findSvgRefs(tree) {
  return collect(tree, 'image')
    .filter((n) => (n.url || '').endsWith('.svg'))
    .map((n) => ({ url: n.url, line: n.position?.start?.line ?? 0 }));
}

/** SVG가 관계를 그리고 있는지의 대리 지표. 0이면 표나 코드블록이 낫다. */
export function countArrows(svgSource) {
  return (svgSource.match(/marker-end|marker-start/g) || []).length;
}
```

- [ ] **Step 4: 통과 확인**

```bash
cd /Users/flowizy/github_blog
node --test scripts/lint-series.test.mjs
```

Expected: PASS — `# pass 7`, `# fail 0`

- [ ] **Step 5: 커밋**

```bash
cd /Users/flowizy/github_blog
git add scripts/lint-series.mjs scripts/lint-series.test.mjs
git commit -m "feat(scripts): SVG 화살표 검사 — 관계를 안 그리면 그림이 아니다

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 5: CLI 조립과 `npm run lint:series`

순수 함수 넷을 실제 파일에 물려 보고서를 낸다.

**Files:**
- Modify: `scripts/lint-series.mjs`
- Modify: `package.json`

- [ ] **Step 1: CLI 본체 추가**

`scripts/lint-series.mjs` 끝에 덧붙인다. 파일 상단 import에 `fs`, `path`, `fileURLToPath`, `pathToFileURL`, `parseFrontmatter`, `parseTags`, `parseMarkdown`을 추가한다.

```js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseFrontmatter, parseTags, parseMarkdown } from './lib/markdown.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src/content/posts');
const PUBLIC_DIR = path.join(ROOT, 'public');
const KNOWN_TERMS_FILE = path.join(__dirname, 'series-known-terms.txt');

const SERIES_TAG = 'hack-tree';
/** 전경 편은 허브라 규칙 3(링크 1개)을 면제한다. */
const OVERVIEW_ID = 'hack-tree-overview';
const MAX_POST_LINKS = 1;

function readKnownTerms() {
  if (!fs.existsSync(KNOWN_TERMS_FILE)) return new Set();
  return new Set(
    fs
      .readFileSync(KNOWN_TERMS_FILE, 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#')),
  );
}

async function main() {
  const known = readKnownTerms();
  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .sort();

  let checked = 0;
  let problems = 0;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { fm, body, offset } = parseFrontmatter(raw);
    if (!parseTags(fm.tags).includes(SERIES_TAG)) continue;
    checked++;

    const tree = await parseMarkdown(body);
    const found = [];

    // 규칙 1
    for (const hit of findTableFirstTerms(tree, known)) {
      found.push({
        line: hit.line + offset,
        msg: `"${hit.term}" 이 표 칸에서 처음 등장합니다`,
        hint: '본문에서 먼저 설명하거나, 전제 배경이면 scripts/series-known-terms.txt 에 추가하세요.',
      });
    }

    // 규칙 3
    const links = countPostLinks(tree);
    if (fm.id !== OVERVIEW_ID && links > MAX_POST_LINKS) {
      found.push({
        line: 1,
        msg: `다른 편으로 나가는 링크가 ${links}개입니다 (최대 ${MAX_POST_LINKS})`,
        hint: '앞 편을 읽지 않아도 완결되어야 합니다. 필요한 내용은 이 편 안에서 다시 설명하세요.',
      });
    }

    // SVG 정당성
    for (const ref of findSvgRefs(tree)) {
      const target = path.join(PUBLIC_DIR, decodeURIComponent(ref.url));
      if (!fs.existsSync(target)) continue; // 깨진 경로는 lint:posts 담당
      const arrows = countArrows(fs.readFileSync(target, 'utf8'));
      if (arrows === 0) {
        found.push({
          line: ref.line + offset,
          msg: `${ref.url} 에 화살표가 없습니다`,
          hint: '관계를 그리지 않는 그림입니다. 표나 코드블록으로 쓰는 편이 검색·복사·번역에 낫습니다.',
        });
      }
    }

    if (found.length) {
      console.log(`\n${file}`);
      for (const p of found) {
        console.log(`  ! L${p.line}  ${p.msg}`);
        console.log(`      ↳ ${p.hint}`);
        problems++;
      }
    }
  }

  console.log(
    `\n[${SERIES_TAG}] ${checked}개 글 검사 · 지적 ${problems}건` +
      (problems === 0 ? '  ✅' : '  — 확인이 필요합니다'),
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
```

- [ ] **Step 2: `package.json`에 스크립트 등록**

`"lint:posts": "node scripts/lint-posts.mjs",` 다음 줄에 추가한다:

```json
    "lint:series": "node scripts/lint-series.mjs",
    "test:scripts": "node --test scripts/",
```

- [ ] **Step 3: 시리즈 글이 아직 없는 상태에서 돌려 본다**

```bash
cd /Users/flowizy/github_blog
npm run lint:series
```

Expected: `[hack-tree] 0개 글 검사 · 지적 0건  ✅`

- [ ] **Step 4: 실제 검출을 확인 — 기존 12편에 임시로 태그를 달아 본다**

검사기가 실제로 PKCE를 잡는지 확인하는 단계다. 확인 후 되돌린다.

```bash
cd /Users/flowizy/github_blog
sed -i '' 's/^tags: \["HTTP", "RequestSmuggling"/tags: ["hack-tree", "HTTP", "RequestSmuggling"/' src/content/posts/net-browser-06-http1.md
sed -i '' 's/^tags: \["Backend"/tags: ["hack-tree", "Backend"/' src/content/posts/net-browser-12-backend.md
npm run lint:series | head -30
git checkout src/content/posts/net-browser-06-http1.md src/content/posts/net-browser-12-backend.md
```

Expected: `net-browser-12-backend.md` 아래에 `"PKCE" 이 표 칸에서 처음 등장합니다` 가 나온다. 12편의 `tags:` 줄이 위 `sed` 패턴과 다르면 직접 `"hack-tree",` 를 첫 태그로 넣고 돌린 뒤 `git checkout` 으로 되돌린다.

- [ ] **Step 5: 전체 테스트와 기존 lint 확인**

```bash
cd /Users/flowizy/github_blog
npm run test:scripts && npm run lint:posts && git status --short
```

Expected: `# fail 0`, `오류 0건  ✅`, `git status`에 `src/content/posts/` 변경이 남아 있지 않음

- [ ] **Step 6: 커밋**

```bash
cd /Users/flowizy/github_blog
git add scripts/lint-series.mjs package.json
git commit -m "feat(scripts): lint:series CLI 조립 + npm 스크립트 등록

tags 첫 항목이 hack-tree 인 글만 검사한다. 빌드에는 물리지 않는다 —
allowlist 판단이 들어가는 검사라 빌드를 실패시키면 용어를 설명하는 대신
allowlist에 밀어 넣는 압력이 생긴다. 저작 중에 직접 돌리는 도구다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 6: 기존 19편 내리기

`published: false`로 내린다. 삭제하지 않는다 — 재료로 계속 쓰고, 되돌릴 수 있어야 한다.

**Files:**
- Modify: `src/content/posts/net-browser-*.md` (19개)

- [ ] **Step 1: 대상과 현재 상태 확인**

```bash
cd /Users/flowizy/github_blog
ls src/content/posts/net-browser-*.md | wc -l
grep -l '^published: true' src/content/posts/net-browser-*.md | wc -l
```

Expected: 둘 다 `19`

- [ ] **Step 2: 살아 있는 글에서 19편으로 가는 인바운드 링크를 찾는다**

```bash
cd /Users/flowizy/github_blog
grep -rn '/post/net-browser-' src/content/posts/*.md src/lib/data.ts \
  | grep -v '^src/content/posts/net-browser-' || echo "인바운드 링크 없음"
```

Expected: `인바운드 링크 없음`. 결과가 나오면 그 줄의 링크를 지우거나 텍스트로 바꾼다 — 내려간 글로 가는 링크는 404가 된다.

- [ ] **Step 3: 내린다**

```bash
cd /Users/flowizy/github_blog
sed -i '' 's/^published: true$/published: false/' src/content/posts/net-browser-*.md
grep -c '^published: false' src/content/posts/net-browser-*.md | grep -v ':1$' || echo "19편 모두 false"
```

Expected: `19편 모두 false`

- [ ] **Step 4: 빌드에서 실제로 빠지는지 확인**

```bash
cd /Users/flowizy/github_blog
npm run build 2>&1 | grep -c 'Rendering /post/net-browser-'
```

Expected: `0` — prerender 목록에서 19편이 전부 사라진다

- [ ] **Step 5: lint와 사이드바 개수 확인**

```bash
cd /Users/flowizy/github_blog
npm run lint:posts | tail -2
```

Expected: `경고` 건수가 3에서 22로 는다(기존 가이드 3 + 내려간 19). 오류는 0.

- [ ] **Step 6: 커밋**

```bash
cd /Users/flowizy/github_blog
git add src/content/posts/net-browser-*.md
git commit -m "post: 「네트워크 및 브라우저 성장기」 19편 비공개 전환

축이 교과서 목차(OSI 계층 순서)여서 각 편의 '왜 지금 이 얘기냐'에 대한
답이 '다음 계층이니까'밖에 없었다. 표 칸에만 등장하고 본문에서 설명된 적
없는 용어가 28개였고, 유일하게 대체 불가능한 16편은 다른 편을 19번
참조해 혼자 서지 못했다.

[hack-tree] 브래킷 시리즈로 다시 쓴다. 지우지 않고 내리는 이유는 새 글의
재료로 계속 쓰기 위해서다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 7: 전경 편 아키텍처 SVG

기존 `16-hacktree.svg`가 이미 화살표를 가진 실제 구조도다(텍스트 57 / 사각형 15 / 화살표 1). 이것을 전경 편용으로 옮기고 다듬는다.

**Files:**
- Create: `public/images/hack-tree/overview.svg`

- [ ] **Step 1: 기존 그림을 새 자리로 복사**

```bash
cd /Users/flowizy/github_blog
mkdir -p public/images/hack-tree
cp public/images/net-browser/16-hacktree.svg public/images/hack-tree/overview.svg
```

- [ ] **Step 2: 편 번호 참조를 걷어낸다**

`16-hacktree.svg`는 박스 오른쪽 위마다 `14편`, `05 · 10 · 14편` 같은 편 번호를 달고 있고, 부제와 본문 문장 셋에도 편 참조가 들어 있다. 브래킷 시리즈에는 편 번호가 없으므로 전부 제거한다.

세 종류를 각각 다르게 처리한다.

```bash
cd /Users/flowizy/github_blog
python3 - <<'EOF'
import re
p = 'public/images/hack-tree/overview.svg'
s = open(p, encoding='utf-8').read()

# (1) 부제 교체 — 번호를 설명하던 줄이라 내용 자체가 필요 없어졌다
s = s.replace(
    '각 상자 오른쪽 위의 번호는 그 구성요소를 다룬 편이다',
    '외부에 열린 포트는 :80 과 :443 둘뿐이다',
)

# (2) 박스 오른쪽 위의 번호 라벨 — <text> 노드 전체를 지운다
before = s
s = re.sub(r'[ \t]*<text[^>]*>[0-9]{2}(?: · [0-9]{2})*편</text>\n', '', s)
print('지운 번호 라벨:', before.count('<text') - s.count('<text'))

# (3) 문장 안의 괄호 참조 — 괄호만 걷어낸다
s = re.sub(r'\s*\((?:[0-9]{2}편[^)]*)\)', '', s)

open(p, 'w', encoding='utf-8').write(s)
EOF
grep -c '편' public/images/hack-tree/overview.svg
```

Expected: 스크립트가 `지운 번호 라벨: 6` 을 출력하고, `grep -c` 가 `0`

`0`이 아니면 남은 줄을 직접 본다:

```bash
grep -n '편' public/images/hack-tree/overview.svg
```

- [ ] **Step 3: 화살표가 남아 있는지 확인 (규칙: 0이면 그림 자격 없음)**

```bash
cd /Users/flowizy/github_blog
grep -o 'marker-end\|marker-start' public/images/hack-tree/overview.svg | wc -l
```

Expected: `1` 이상. 0이면 빌드 파이프라인(Actions → GHCR → VM)과 요청 경로(브라우저 → Caddy → web/api → SQLite)에 화살표를 추가한다 — 전경 편의 목적이 관계를 보여주는 것이므로 여기서 화살표가 없으면 안 된다.

- [ ] **Step 4: 브라우저에서 렌더 확인**

```bash
cd /Users/flowizy/github_blog
npm run dev
```

`http://localhost:5173/images/hack-tree/overview.svg` 를 열어 편 번호가 사라졌고 글자가 박스를 넘지 않는지 본다.

- [ ] **Step 5: 커밋**

```bash
cd /Users/flowizy/github_blog
git add public/images/hack-tree/overview.svg
git commit -m "feat(images): 전경 편 아키텍처 그림 — 16-hacktree.svg에서 편 번호 제거

브래킷 시리즈에는 편 번호가 없으므로 박스마다 달려 있던 Part NN 표기를
걷어냈다. 구조·좌표는 그대로다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Task 8: 전경 편 착수

본문은 작성자가 쓴다. 이 태스크는 **프론트매터와 골격, 그리고 도구가 실제 글 위에서 도는지**까지만 만든다.

**Files:**
- Create: `src/content/posts/hack-tree-overview.md`

- [ ] **Step 1: 파일 생성**

```markdown
---
id: "hack-tree-overview"
title: "[hack-tree] 533개 노드를 굴리는 구조: 무엇을 만들었고 경계가 어디인가"
titleEn: "[hack-tree] The Structure Behind 533 Nodes: What It Is and Where the Boundaries Are"
description: "보안·CS 지식 533개를 쓰고 검색하고 채점하는 플랫폼을 혼자 만들어 배포했다. 스택이 무엇이고, 외부에 열린 포트가 왜 둘뿐이고, 각 경계에서 무엇이 끝나는지."
descriptionEn: "A platform that writes, searches and grades 533 security and CS knowledge nodes, built and deployed solo. What the stack is, why only two ports face outward, and what ends at each boundary."
date: "2026-09-16 21:00"
category: "development"
tags: ["hack-tree", "Architecture", "Docker", "Caddy", "SQLite", "Deployment"]
published: false
---

여기에 본문을 쓴다.

![hack-tree 아키텍처](/images/hack-tree/overview.svg)

## 무엇을 만들었나

웹·포너블·커널·CS 4축 533노드(커널 175 / 포너블 156 / 웹 136 / CS 66).
웹 축은 L0–L7 멘탈 모델 사다리를 갖고, 그것을 6단계 코스로 압축한다.

## 어떻게 생겼나

<!-- 엣지 Caddy / web Next.js 15 · React 19 / api FastAPI · Python 3.12 /
     SQLite + 백업 사이드카 / Actions → GHCR → GCP VM, Terraform + cloud-init -->

## 경계가 어디인가

<!-- 외부에 열린 포트는 :80 · :443 뿐. TLS가 끝나는 지점.
     /api/* rewrite 로 같은 출처가 되는 구조 -->

## 각 사건으로

<!-- 사건 편이 하나씩 published 되면 여기에 링크를 건다.
     전경 편은 허브라 규칙 3(링크 1개)이 면제된다. -->
```

`published: false`로 시작한다 — 본문을 채운 뒤 `true`로 바꾼다.

- [ ] **Step 2: lint가 이 글을 집어 드는지 확인**

```bash
cd /Users/flowizy/github_blog
npm run lint:series
```

Expected: `[hack-tree] 1개 글 검사 · 지적 0건  ✅`
검사 대상이 0개로 나오면 `tags` 첫 항목이 `hack-tree`인지 확인한다.

- [ ] **Step 3: SVG 검사가 실제로 도는지 확인**

일부러 화살표 없는 SVG를 가리켜 검사가 걸리는지 본다.

```bash
cd /Users/flowizy/github_blog
sed -i '' 's#/images/hack-tree/overview.svg#/images/net-browser/15-map.svg#' src/content/posts/hack-tree-overview.md
npm run lint:series
sed -i '' 's#/images/net-browser/15-map.svg#/images/hack-tree/overview.svg#' src/content/posts/hack-tree-overview.md
npm run lint:series
```

Expected: 첫 번째 실행에서 `15-map.svg 에 화살표가 없습니다`, 두 번째 실행에서 `지적 0건  ✅`

- [ ] **Step 4: 기존 lint와 빌드 확인**

```bash
cd /Users/flowizy/github_blog
npm run lint:posts | tail -2 && npm run build 2>&1 | tail -2
```

Expected: 오류 0건, `✅ Prerendering complete!`

- [ ] **Step 5: 커밋**

```bash
cd /Users/flowizy/github_blog
git add src/content/posts/hack-tree-overview.md
git commit -m "post: [hack-tree] 전경 편 착수 (비공개)

프론트매터와 골격만. 본문은 직접 쓴다. lint:series 가 실제 글 위에서
도는 것까지 확인했다.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## 이 계획 밖 — 사건 편 6개

사건 편(`빌드는 통과하는데 실행이 안 됐다`, `130MB 모델을 어디에 둘 것인가`, `헬스체크가 거짓으로 실패한다`, `남의 인프라에 기대는 지점들`, `백업은 복구를 해봐야 백업이다`, `정답을 숨기려던 네 번의 시도`)은 **본문이 곧 작업물**이라 태스크로 쪼갤 것이 없다. 스펙 §6에 편마다 증상·재료 커밋·처음 설명할 개념이 적혀 있고, 착수 절차는 편당 동일하다.

1. `src/content/posts/hack-tree-<slug>.md` 를 Task 8의 프론트매터 꼴로 만든다 (`published: false`)
2. 스펙 §6의 해당 편에서 재료 커밋을 꺼내 읽는다 — `cd /Users/flowizy/VScode/coding/hacking-study && git show <hash>`
3. 스펙 §4의 골격(증상 → 전제 → 어긋난 곳 → 고친 것 → 남은 것)으로 쓴다
4. `npm run lint:series` 를 돌려 규칙 1·3과 SVG 검사를 통과시킨다
5. 전경 편의 「각 사건으로」 절에 링크를 건다
6. `published: true` 로 바꾸고 `npm run lint:posts && npm run build`
7. 영어판은 `src/content/posts/en/hack-tree-<slug>.md` 에 같은 slug로 둔다

편마다 분량이 다른 것이 정상이다(스펙 §4). 쓰다가 6b(기능을 지워서 줄인 공격면)를 6편에 흡수할지 독립시킬지 판단한다.
