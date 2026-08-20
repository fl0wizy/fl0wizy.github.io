#!/usr/bin/env node

/**
 * Post lint script for the blog.
 *
 * 글이 "쓴 대로 렌더되는지"를 실제 파서(remark-gfm)로 검사한다.
 * 정규식 휴리스틱이 아니라 블로그가 실제로 쓰는 파이프라인을 그대로 태우므로
 * 과탐지·미탐지가 없다.
 *
 * 검사 항목
 *   1. 의도치 않은 취소선  — 한 문단의 물결표 두 개가 짝지어져 사이 글자를 먹는 문제.
 *                            GFM은 `~~x~~`뿐 아니라 `~x~`도 취소선으로 처리한다.
 *                            "GPIO0~4 ... 0~15" 같은 한글 범위 표기에서 자주 터진다.
 *   2. 깨진 이미지 경로    — 본문이 참조하는 /images/... 파일이 public/에 실제로 있는지.
 *   3. 프론트매터          — 필수 필드 존재, category가 정의된 값인지.
 *
 * 사용:  npm run lint:posts
 * 종료코드: 문제 0건이면 0, 하나라도 있으면 1 (CI/pre-commit에 물리기 좋게)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const POSTS_DIR = path.join(ROOT, 'src/content/posts');
const PUBLIC_DIR = path.join(ROOT, 'public');
const DATA_TS = path.join(ROOT, 'src/lib/data.ts');

const REQUIRED_FIELDS = ['id', 'title', 'description', 'date', 'category'];

const processor = unified().use(remarkParse).use(remarkGfm);

/** categoryLabels 객체에서 유효한 카테고리 id를 뽑는다. */
function readValidCategories() {
  const src = fs.readFileSync(DATA_TS, 'utf8');
  const block = src.match(/export const categoryLabels[\s\S]*?\{([\s\S]*?)\n\};/);
  if (!block) return null;
  return new Set([...block[1].matchAll(/^\s*'?([\w-]+)'?\s*:/gm)].map((m) => m[1]));
}

function parseFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return { fm: {}, body: raw, offset: 0 };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { fm: {}, body: raw, offset: 0 };
  const head = raw.slice(4, end);
  const fm = {};
  for (const line of head.split('\n')) {
    const m = line.match(/^(\w+)\s*:\s*(.*)$/);
    if (m) fm[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  // 본문이 원본에서 몇 번째 줄부터 시작하는지 (에러 줄번호 보정용)
  const offset = raw.slice(0, end + 5).split('\n').length - 1;
  return { fm, body: raw.slice(end + 5), offset };
}

function plainText(node) {
  let s = '';
  const walk = (n) => {
    if (n.value) s += n.value;
    (n.children || []).forEach(walk);
  };
  walk(node);
  return s;
}

function collect(tree, type) {
  const out = [];
  const walk = (n) => {
    if (n.type === type) out.push(n);
    (n.children || []).forEach(walk);
  };
  walk(tree);
  return out;
}

const validCategories = readValidCategories();
const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).sort();

let errors = 0;
let warns = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
  const { fm, body, offset } = parseFrontmatter(raw);
  const problems = [];

  // --- 1. 의도치 않은 취소선 ---
  const tree = await processor.run(processor.parse(body));
  for (const node of collect(tree, 'delete')) {
    const line = (node.position?.start?.line ?? 0) + offset;
    const inner = plainText(node).replace(/\s+/g, ' ');
    // 진짜 취소선을 의도했다면 원문이 ~~로 감싸져 있다.
    const srcLine = raw.split('\n')[line - 1] ?? '';
    if (srcLine.includes('~~')) continue;
    problems.push({
      level: 'error',
      line,
      msg: `의도치 않은 취소선: "${inner.slice(0, 70)}${inner.length > 70 ? '…' : ''}"`,
      hint: '범위 표기의 ~ 를 \\~ 로 이스케이프하거나 - 로 바꾸세요.',
    });
  }

  // --- 2. 깨진 이미지 경로 ---
  for (const node of collect(tree, 'image')) {
    const url = node.url || '';
    if (!url.startsWith('/')) continue; // 외부 URL·상대경로는 검사 대상 아님
    const target = path.join(PUBLIC_DIR, decodeURIComponent(url));
    if (!fs.existsSync(target)) {
      problems.push({
        level: 'error',
        line: (node.position?.start?.line ?? 0) + offset,
        msg: `이미지 파일 없음: ${url}`,
        hint: `public${url} 위치에 파일을 두세요.`,
      });
    }
  }

  // --- 3. 프론트매터 ---
  for (const field of REQUIRED_FIELDS) {
    if (!fm[field]) {
      problems.push({ level: 'error', line: 1, msg: `프론트매터 누락: ${field}` });
    }
  }
  if (fm.category && validCategories && !validCategories.has(fm.category)) {
    problems.push({
      level: 'error',
      line: 1,
      msg: `정의되지 않은 category: "${fm.category}"`,
      hint: `src/lib/data.ts 의 categories / categoryColors / categoryLabels 세 곳에 추가하세요.`,
    });
  }
  if (fm.published === 'false') {
    problems.push({ level: 'warn', line: 1, msg: 'published: false — 배포되지 않습니다' });
  }

  if (problems.length) {
    console.log(`\n${file}`);
    for (const p of problems) {
      const tag = p.level === 'error' ? '  ✗' : '  !';
      console.log(`${tag} L${p.line}  ${p.msg}`);
      if (p.hint) console.log(`      ↳ ${p.hint}`);
      if (p.level === 'error') errors++;
      else warns++;
    }
  }
}

console.log(
  `\n검사 ${files.length}개 글 · 오류 ${errors}건 · 경고 ${warns}건` +
    (errors === 0 ? '  ✅' : '  ❌')
);
process.exit(errors === 0 ? 0 : 1);
