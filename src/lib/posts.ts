import type { BlogPost } from './data';

interface PostFrontmatter {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
}

function unquote(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, '\\');
  }
  return trimmed;
}

function parseTags(raw: string): string[] {
  const trimmed = raw.trim();
  if (!trimmed.startsWith('[') || !trimmed.endsWith(']')) {
    return [];
  }

  const inner = trimmed.slice(1, -1).trim();
  if (!inner) {
    return [];
  }

  return inner
    .split(',')
    .map((tag) => unquote(tag))
    .filter(Boolean);
}

function parseFrontmatter(markdown: string): { frontmatter: PostFrontmatter; content: string } {
  if (!markdown.startsWith('---\n')) {
    return { frontmatter: {}, content: markdown };
  }

  const end = markdown.indexOf('\n---\n', 4);
  if (end === -1) {
    return { frontmatter: {}, content: markdown };
  }

  const rawFrontmatter = markdown.slice(4, end);
  const content = markdown.slice(end + 5);
  const frontmatter: PostFrontmatter = {};

  for (const line of rawFrontmatter.split('\n')) {
    if (!line.trim()) {
      continue;
    }

    const separator = line.indexOf(':');
    if (separator === -1) {
      continue;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();

    if (key === 'tags') {
      frontmatter.tags = parseTags(value);
      continue;
    }

    if (key === 'published') {
      frontmatter.published = value.toLowerCase() === 'true';
      continue;
    }

    const parsed = unquote(value);

    if (key === 'id') frontmatter.id = parsed;
    else if (key === 'title') frontmatter.title = parsed;
    else if (key === 'description') frontmatter.description = parsed;
    else if (key === 'date') frontmatter.date = parsed;
    else if (key === 'category') frontmatter.category = parsed;
  }

  return { frontmatter, content };
}

function parsePostDate(date: string): number {
  const parsed = new Date(date.replace(' ', 'T')).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

const markdownModules = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

export const blogPosts: BlogPost[] = Object.entries(markdownModules)
  .map(([path, markdown]): BlogPost => {
    const slug = path.split('/').pop()?.replace(/\.md$/, '') || 'untitled-post';
    const { frontmatter, content } = parseFrontmatter(markdown);
    const tags = frontmatter.tags && frontmatter.tags.length > 0 ? frontmatter.tags : undefined;

    return {
      id: frontmatter.id || slug,
      title: frontmatter.title || slug,
      description: frontmatter.description || '',
      date: frontmatter.date || '1970-01-01 00:00',
      category: frontmatter.category || 'daily',
      tags,
      published: frontmatter.published ?? true,
      content: content.trim(),
    };
  })
  .sort((a, b) => parsePostDate(b.date) - parsePostDate(a.date));
