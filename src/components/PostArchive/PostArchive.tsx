import { Link, useSearchParams } from 'react-router-dom';
import { blogPosts } from '../../lib/data';
import type { BlogPost } from '../../lib/data';
import { useLang } from '../../lib/i18n';
import PostCard from '../PostCard';
import './PostArchive.css';

interface PostArchiveProps {
  posts: BlogPost[];
  title: string;
}

export default function PostArchive({ posts, title }: PostArchiveProps) {
  const { L } = useLang();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') || '';
  const selectedTag = params.get('tag') || '';
  const published = posts.filter(post => post.published);
  const recent = blogPosts.filter(post => post.published).slice(0, 3);
  const tagCounts = new Map<string, { label: string; count: number }>();

  for (const post of published) {
    const uniqueTags = new Map((post.tags || []).map(tag => [tag.toLowerCase(), tag]));
    for (const [key, label] of uniqueTags) {
      const existing = tagCounts.get(key);
      if (existing) existing.count += 1;
      else tagCounts.set(key, { label, count: 1 });
    }
  }

  const tags = [...tagCounts.values()].sort((a, b) => b.count - a.count).slice(0, 10);
  const search = query.trim().toLowerCase();
  const visible = published.filter(post => {
    const matchesTag = !selectedTag || post.tags?.some(tag => tag.toLowerCase() === selectedTag.toLowerCase());
    const text = [L(post.title), L(post.description), ...(post.tags || [])].join(' ').toLowerCase();
    return matchesTag && (!search || text.includes(search));
  });

  const updateFilter = (key: 'q' | 'tag', value: string) => {
    const next = new URLSearchParams(params);
    if (value.trim()) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: key === 'q' });
  };

  return (
    <div className="post-archive">
      <aside className="archive-rail" aria-label={L({ ko: '글 탐색', en: 'Explore posts' })}>
        <section className="archive-search" aria-label={L({ ko: '글 검색', en: 'Search posts' })}>
          <label className="rail-heading" htmlFor="archive-search-input">
            {L({ ko: '글 검색', en: 'Search posts' })}
          </label>
          <div className="archive-search-field">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 4.5 4.5" />
            </svg>
            <input
              id="archive-search-input"
              type="search"
              placeholder={L({ ko: '검색어 입력', en: 'Search posts…' })}
              value={query}
              onChange={event => updateFilter('q', event.target.value)}
            />
          </div>
        </section>

        <section className="archive-recent" aria-labelledby="archive-recent-heading">
          <h2 className="rail-heading" id="archive-recent-heading">{L({ ko: '최근 글', en: 'Recent posts' })}</h2>
          <ul>
            {recent.map(post => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`} aria-label={L(post.title)}>
                  <span>{L(post.title).replace(/^\[[^\]]+\]\s*/, '')}</span>
                  <time dateTime={post.date.replace(' ', 'T')}>{post.date.slice(0, 10).replaceAll('-', '.')}</time>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {tags.length > 0 && <section className="archive-tag-section" aria-labelledby="archive-tags-heading">
          <h2 className="rail-heading" id="archive-tags-heading">{L({ ko: '태그로 찾기', en: 'Explore tags' })}</h2>
          <div className="archive-tag-list">
            {tags.map(tag => (
              <button
                key={tag.label}
                type="button"
                className={selectedTag.toLowerCase() === tag.label.toLowerCase() ? 'active' : ''}
                aria-pressed={selectedTag.toLowerCase() === tag.label.toLowerCase()}
                onClick={() => updateFilter('tag', selectedTag.toLowerCase() === tag.label.toLowerCase() ? '' : tag.label)}
              >
                <span>#{tag.label}</span><span className="archive-tag-count">{tag.count}</span>
              </button>
            ))}
          </div>
        </section>}
      </aside>

      <section className="archive-results" aria-labelledby="archive-results-heading">
        <div className="archive-results-header">
          <h2 className="section-header" id="archive-results-heading">{title}</h2>
          <span className="archive-result-count" role="status">
            {L({ ko: `${visible.length}개 글`, en: `${visible.length} posts` })}
          </span>
        </div>
        {(query || selectedTag) && (
          <div className="archive-active-filter">
            <span>{[selectedTag && `#${selectedTag}`, query && `“${query}”`].filter(Boolean).join(' · ')}</span>
            <button type="button" onClick={() => setParams({})}>{L({ ko: '필터 초기화', en: 'Clear filters' })}</button>
          </div>
        )}
        <div className="posts-list">
          {visible.map(post => <PostCard key={post.id} post={post} />)}
          {visible.length === 0 && (
            <div className="no-posts">
              <p>{L({ ko: '조건에 맞는 글이 없습니다.', en: 'No posts match these filters.' })}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
