import { Link } from 'react-router-dom';
import { formatDate, getRelativeTime } from '../../lib/data';
import type { BlogPost } from '../../lib/data';
import './PostCard.css';

interface PostCardProps {
  post: BlogPost;
}

// 카테고리 ID를 한글 라벨로 변환
const categoryLabels: Record<string, string> = {
  'daily': '일상(DAILY)',
  'security': '보안(SECURITY)',
  'web-security': 'Web Security',
  'web3-blockchain': 'Web3/Blockchain',
  'research-article': 'Research/Article',
  'study-dev-security': 'Study',
  'wargame-ctf': 'Wargame/CTF',
  'reversing': 'Reversing',
  'pwn': 'Pwn',
  'crypto': 'Crypto',
  'development': '개발(DEVELOPMENT)',
  'travel': '여행(TRAVEL)',
};

export default function PostCard({ post }: PostCardProps) {
  const categoryLabel = categoryLabels[post.category] || post.category;
  
  return (
    <article className="post-card">
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
