import { useParams, Link, useNavigate } from 'react-router-dom';
import { getPostById, formatDate, getRelativeTime } from '../lib/data';
import './Post.css';

// 간단한 마크다운 파서
function parseMarkdown(text: string): string {
  let html = text;
  
  // 코드 블록 (```language ... ```)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
  });
  
  // 인라인 코드
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // 제목
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
  
  // 굵은 텍스트
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  
  // 기울임 텍스트
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // 취소선
  html = html.replace(/~~([^~]+)~~/g, '<del>$1</del>');
  
  // 링크
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // 이미지
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  
  // 인용문
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
  
  // 순서 없는 리스트
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // 순서 있는 리스트
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  
  // 수평선
  html = html.replace(/^---$/gm, '<hr />');
  
  // 단락
  html = html.replace(/\n\n/g, '</p><p>');
  html = `<p>${html}</p>`;
  
  // 빈 <p> 태그 제거
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*(<h[1-6]>)/g, '$1');
  html = html.replace(/(<\/h[1-6]>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<pre>)/g, '$1');
  html = html.replace(/(<\/pre>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<blockquote>)/g, '$1');
  html = html.replace(/(<\/blockquote>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<hr \/>)/g, '$1');
  html = html.replace(/(<hr \/>)\s*<\/p>/g, '$1');
  
  return html;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 카테고리 라벨
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

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? getPostById(id) : undefined;

  if (!post) {
    return (
      <div className="post-page">
        <div className="post-not-found">
          <h1>포스트를 찾을 수 없습니다</h1>
          <p>요청하신 포스트가 존재하지 않거나 삭제되었습니다.</p>
          <button onClick={() => navigate('/')} className="back-button">
            블로그로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const categoryLabel = categoryLabels[post.category] || post.category;

  return (
    <div className="post-page">
      <div className="post-container">
        {/* 뒤로가기 */}
        <Link to="/" className="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          BACK TO LIST
        </Link>

        {/* 카테고리 뱃지 - 별도 줄 */}
        <div className="post-category-line">
          <span className="post-category-badge">{categoryLabel}</span>
        </div>
        
        {/* 제목 */}
        <h1 className="post-title">{post.title}</h1>
        
        {/* 날짜 정보 */}
        <div className="post-meta">
          <span className="post-date">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {formatDate(post.date)}
          </span>
          <span className="post-relative-time">{getRelativeTime(post.date)}</span>
        </div>

        <article 
          className="post-content"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }}
        />

        {post.tags && post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
