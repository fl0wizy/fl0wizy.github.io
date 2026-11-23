import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryColor, getCategoryLabel, resolveCategoryId } from '../../lib/data';
import type { BlogPost } from '../../lib/data';
import { useLang } from '../../lib/i18n';
import './PostCard.css';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const { L } = useLang();
  const categoryId = resolveCategoryId(post.category);
  const categoryLabel = getCategoryLabel(categoryId);
  const categoryColor = getCategoryColor(post.category);

  return (
    <article className="post-card" style={{ '--cat': categoryColor } as CSSProperties}>
      <Link to={`/post/${post.id}`} className="post-card-link">
        {post.cover && (
          <div className="post-card-cover" aria-hidden="true">
            <img src={post.cover} alt="" width="800" height="320" loading="lazy" decoding="async" />
          </div>
        )}
        <div className="post-card-body">
          <div className="post-card-header">
            <div className="post-category-labels">
              <span className="post-category-badge">{L(categoryLabel)}</span>
              {categoryId !== post.category && (
                <span className="post-format-label">{L(getCategoryLabel(post.category))}</span>
              )}
              {post.seriesOrder && (
                <span className="post-format-label">
                  {L({ ko: '학습', en: 'Study' })} {String(post.seriesOrder).padStart(2, '0')}
                </span>
              )}
              {post.category === 'ai' && !post.series && (
                <span className="post-format-label">{L({ ko: '개념 정리', en: 'Concepts' })}</span>
              )}
            </div>
            <div className="post-card-meta">
              <time dateTime={post.date.replace(' ', 'T')}>
                {post.date.slice(0, 10).replaceAll('-', '.')}
              </time>
            </div>
          </div>
          <h2 className="post-title">{L(post.title)}</h2>
          <p className="post-description">{L(post.description)}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="post-tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
