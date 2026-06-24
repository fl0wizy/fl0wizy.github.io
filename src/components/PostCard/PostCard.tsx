import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, getRelativeTime, getCategoryColor, getCategoryLabel } from '../../lib/data';
import type { BlogPost } from '../../lib/data';
import './PostCard.css';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const categoryLabel = getCategoryLabel(post.category);
  const categoryColor = getCategoryColor(post.category);

  return (
    <article className="post-card" style={{ '--cat': categoryColor } as CSSProperties}>
      <Link to={`/post/${post.id}`} className="post-card-link">
        <div className="post-card-header">
          <div className="post-meta">
            <span className="post-date">{formatDate(post.date)}</span>
            <span className="post-relative-time">{getRelativeTime(post.date)}</span>
          </div>
          <span className="post-category-badge">{categoryLabel}</span>
        </div>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-description">{post.description}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="post-tag">#{tag}</span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
