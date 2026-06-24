import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  getPostById,
  formatDate,
  getRelativeTime,
  getCategoryColor,
  getCategoryLabel,
  getReadingTime,
  extractHeadings,
} from '../lib/data';
import './Post.css';

// 시계 아이콘 (읽기 시간)
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// 코드 블록을 맥OS 터미널 창(빨노초 신호등 + 복사 버튼)으로 감싼다.
function CodeBlock({ children, lang }: { children: ReactNode; lang?: string }) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? '';
    let ok = false;
    try {
      await navigator.clipboard.writeText(text);
      ok = true;
    } catch {
      /* 보안 컨텍스트가 아니거나 권한 없음 → 폴백 */
    }
    if (!ok) {
      try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      } catch {
        /* 무시 */
      }
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="code-window">
      <div className="code-window-bar">
        <span className="code-dots">
          <i></i>
          <i></i>
          <i></i>
        </span>
        {lang && <span className="code-lang">{lang}</span>}
        <button
          type="button"
          className={`code-copy ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="코드 복사"
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <pre ref={preRef}>{children}</pre>
    </div>
  );
}

// pre 안의 code className(language-xxx)에서 언어명을 뽑는다.
function extractLang(children: ReactNode): string | undefined {
  if (
    children &&
    typeof children === 'object' &&
    'props' in children &&
    children.props
  ) {
    const cls = (children.props as { className?: string }).className ?? '';
    const m = cls.match(/language-([\w-]+)/);
    if (m) return m[1];
  }
  return undefined;
}

export default function Post() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? getPostById(id) : undefined;

  const headings = useMemo(() => (post ? extractHeadings(post.content) : []), [post]);
  const [activeId, setActiveId] = useState('');

  // 렌더된 헤딩에 문서 순서대로 id를 부여하고, 스크롤에 따라 목차를 강조 (scrollspy)
  useEffect(() => {
    if (headings.length === 0) return;

    // 대제목(h2)을 문서 순서대로 모아 extractHeadings와 동일 순번의 id를 매긴다.
    const els = Array.from(
      document.querySelectorAll<HTMLElement>('.post-content h2'),
    );
    els.forEach((el, i) => {
      if (headings[i]) el.id = headings[i].id;
    });
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

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

  const categoryLabel = getCategoryLabel(post.category);
  const categoryColor = getCategoryColor(post.category);
  const readingTime = getReadingTime(post.content);

  // 헤딩 id는 렌더 후 useEffect에서 문서 순서대로 부여한다(StrictMode 이중 렌더에 안전).
  const components: Components = {
    a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
    pre: ({ children }) => <CodeBlock lang={extractLang(children)}>{children}</CodeBlock>,
  };

  const handleTocClick = (e: React.MouseEvent, headingId: string) => {
    e.preventDefault();
    const el = document.getElementById(headingId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(headingId);
    }
  };

  return (
    <div className="post-page" style={{ '--cat': categoryColor } as CSSProperties}>
      <div className="post-layout">
        <div className="post-container">
          {/* 뒤로가기 */}
          <Link to="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            BACK TO LIST
          </Link>

          {/* 카테고리 뱃지 */}
          <div className="post-category-line">
            <span className="post-category-badge">{categoryLabel}</span>
          </div>

          {/* 제목 */}
          <h1 className="post-title">{post.title}</h1>

          {/* 날짜 + 읽기 시간 */}
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
            <span className="post-reading-time">
              <ClockIcon />
              약 {readingTime}분
            </span>
          </div>

          <article className="post-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {post.content}
            </ReactMarkdown>
          </article>

          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>

        {/* 우측 레일: 목차 + 키워드 */}
        {(headings.length > 0 || (post.tags && post.tags.length > 0)) && (
          <aside className="post-rail">
            <div className="post-rail-inner">
              {headings.length > 0 && (
                <nav className="rail-block toc">
                  <div className="rail-head">ON THIS PAGE</div>
                  <ul className="toc-list">
                    {headings.map((h) => (
                      <li
                        key={h.id}
                        className={`toc-item level-${h.level} ${activeId === h.id ? 'active' : ''}`}
                      >
                        <a href={`#${h.id}`} onClick={(e) => handleTocClick(e, h.id)}>
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="rail-block keywords">
                  <div className="rail-head">KEYWORDS</div>
                  <div className="rail-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="rail-tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
