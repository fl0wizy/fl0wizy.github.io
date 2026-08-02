#!/usr/bin/env node

/**
 * Prerender script for the blog.
 *
 * After `vite build` produces a standard SPA in dist/, this script:
 *   1. Reads src/content/posts/*.md to collect route info
 *   2. Serves dist/ on a local HTTP server
 *   3. Visits each route with Puppeteer and saves the rendered HTML
 *   4. Injects per-route <title> and <meta> tags into the saved HTML
 *   5. Generates dist/sitemap.xml
 */

import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');
const SITE_URL = 'https://fl0wizy.github.io';
const SITE_NAME = "flowizy's DevLog";

// ── Category IDs (from src/lib/data.ts) ──────────────────────────────
const CATEGORY_IDS = [
  'all',
  'security',
  'web-security',
  'web3-blockchain',
  'research-article',
  'study-dev-security',
  'wargame-ctf',
  'reversing',
  'pwn',
  'crypto',
  'ai',
  'development',
  'travel',
  'daily',
];

// ── Parse frontmatter from a markdown file ───────────────────────────
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;

  const meta = {};
  for (const line of match[1].split('\n')) {
    const m = line.match(/^(\w[\w-]*):\s*(.*)/);
    if (!m) continue;
    let val = m[2].trim();
    // strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    // boolean
    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    meta[m[1]] = val;
  }
  return meta;
}

// ── Collect published posts ──────────────────────────────────────────
function collectPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const posts = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    const meta = parseFrontmatter(raw);
    if (!meta || meta.published === false) continue;
    posts.push(meta);
  }
  return posts;
}

// ── Build route list with metadata ───────────────────────────────────
function buildRoutes(posts) {
  const routes = [];

  // Home
  routes.push({
    path: '/',
    title: SITE_NAME,
    description: '보안, 블록체인, 개발에 관한 기술 블로그',
  });

  // Profile
  routes.push({
    path: '/profile',
    title: `Profile | ${SITE_NAME}`,
    description: 'flowizy의 프로필 — Security Researcher',
  });

  // Categories
  for (const id of CATEGORY_IDS) {
    routes.push({
      path: `/category/${id}`,
      title: `${id} | ${SITE_NAME}`,
      description: `${id} 카테고리의 포스트 목록`,
    });
  }

  // Posts
  for (const post of posts) {
    routes.push({
      path: `/post/${post.id}`,
      title: `${post.title} | ${SITE_NAME}`,
      description: post.description || '',
    });
  }

  return routes;
}

// ── Simple static file server ────────────────────────────────────────
function createStaticServer(root) {
  const MIME = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
  };

  return createServer((req, res) => {
    let filePath = path.join(root, decodeURIComponent(req.url.split('?')[0]));

    // If the path is a directory or doesn't have an extension, serve index.html (SPA fallback)
    if (!path.extname(filePath)) {
      filePath = path.join(root, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        // SPA fallback
        fs.readFile(path.join(root, 'index.html'), (err2, fallback) => {
          if (err2) {
            res.writeHead(404);
            res.end('Not found');
            return;
          }
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(fallback);
        });
        return;
      }
      const ext = path.extname(filePath);
      const mime = MIME[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': `${mime}; charset=utf-8` });
      res.end(data);
    });
  });
}

// ── Inject meta tags into HTML ───────────────────────────────────────
function injectMeta(html, route) {
  const url = `${SITE_URL}${route.path === '/' ? '' : route.path}`;

  // Remove existing tags that we'll replace
  html = html.replace(/<title>[^<]*<\/title>/g, '');
  html = html.replace(/<meta\s+name="description"[^>]*>/g, '');
  html = html.replace(/<meta\s+property="og:[^"]*"[^>]*>/g, '');
  html = html.replace(/<link\s+rel="canonical"[^>]*>/g, '');

  const tags = [
    `<title>${escHtml(route.title)}</title>`,
    `<meta name="description" content="${escAttr(route.description)}">`,
    `<meta property="og:title" content="${escAttr(route.title)}">`,
    `<meta property="og:description" content="${escAttr(route.description)}">`,
    `<meta property="og:url" content="${escAttr(url)}">`,
    `<meta property="og:type" content="article">`,
    `<link rel="canonical" href="${escAttr(url)}">`,
  ].join('\n    ');

  // Insert right after <head>
  html = html.replace(/(<head[^>]*>)/, `$1\n    ${tags}`);
  return html;
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ── Generate sitemap.xml ─────────────────────────────────────────────
function generateSitemap(routes) {
  const today = new Date().toISOString().split('T')[0];
  const urls = routes.map(r => {
    const loc = `${SITE_URL}${r.path === '/' ? '/' : r.path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
}

// ── Main ─────────────────────────────────────────────────────────────
async function main() {
  console.log('📦 Prerendering started…');

  // 1. Collect routes
  const posts = collectPosts();
  const routes = buildRoutes(posts);
  console.log(`   Found ${posts.length} published posts, ${routes.length} total routes`);

  // 2. Start local server
  const server = createStaticServer(DIST);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  console.log(`   Static server on http://127.0.0.1:${port}`);

  // 3. Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    for (const route of routes) {
      const url = `http://127.0.0.1:${port}${route.path}`;
      console.log(`   Rendering ${route.path}`);

      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // Wait for React to render content inside #root
      await page.waitForFunction(
        () => {
          const root = document.getElementById('root');
          return root && root.children.length > 0;
        },
        { timeout: 10000 },
      );

      let html = await page.content();
      html = injectMeta(html, route);

      // Determine output path
      let outPath;
      if (route.path === '/') {
        outPath = path.join(DIST, 'index.html');
      } else {
        outPath = path.join(DIST, route.path, 'index.html');
      }

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, html, 'utf-8');
    }

    // 4. Generate sitemap
    const sitemap = generateSitemap(routes);
    fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap, 'utf-8');
    console.log('   ✅ sitemap.xml generated');
  } finally {
    await browser.close();
    server.close();
  }

  console.log('✅ Prerendering complete!');
}

main().catch(err => {
  console.error('❌ Prerender failed:', err);
  process.exit(1);
});
