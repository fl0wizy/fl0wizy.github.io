import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryColor, getCategoryLabel } from '../../lib/data';
import type { BlogPost } from '../../lib/data';
import { useLang } from '../../lib/i18n';
import './PostCard.css';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const { L } = useLang();
  const categoryLabel = getCategoryLabel(post.category);
  const categoryColor = getCategoryColor(post.category);

  return (
    <article className="post-card" style={{ '--cat': categoryColor } as CSSProperties}>
      <Link to={`/post/${post.id}`} className="post-card-link">
        <div className="post-card-cover" aria-hidden="true">
          {post.cover ? (
            <img src={post.cover} alt="" width="800" height="450" loading="lazy" decoding="async" />
          ) : (
            <span className="post-card-cover-label">{L(categoryLabel)}</span>
          )}
        </div>
        <div className="post-card-body">
          <div className="post-card-header">
            <span className="post-category-badge">{L(categoryLabel)}</span>
            <time className="post-card-date" dateTime={post.date.replace(' ', 'T')}>
              {post.date.slice(0, 10).replaceAll('-', '.')}
            </time>
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
