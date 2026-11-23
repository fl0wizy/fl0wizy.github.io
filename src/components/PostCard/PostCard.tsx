import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { getCategoryColor, getCategoryLabel, getReadingTime } from '../../lib/data';
import type { BlogPost } from '../../lib/data';
import { useLang } from '../../lib/i18n';
import './PostCard.css';

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  const { L, lang } = useLang();
  const categoryLabel = getCategoryLabel(post.category);
  const categoryColor = getCategoryColor(post.category);
  const readingTime = getReadingTime(lang === 'en' && post.contentEn ? post.contentEn : post.content);

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
            <span className="post-category-badge">{L(categoryLabel)}</span>
            <div className="post-card-meta">
              <time dateTime={post.date.replace(' ', 'T')}>
                {post.date.slice(0, 10).replaceAll('-', '.')}
              </time>
              <span aria-hidden="true">·</span>
              <span>{L({ ko: `약 ${readingTime}분`, en: `~${readingTime} min read` })}</span>
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
