import './Header.css';

// 방패 아이콘
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

interface HeaderProps {
  subtitle?: string;
  title: string;
  highlightWord?: string;
}

export default function Header({ subtitle = 'SECURITY RESEARCH LOG', title, highlightWord }: HeaderProps) {
  // title에서 highlightWord를 찾아서 하이라이트 처리
  const renderTitle = () => {
    if (!highlightWord) return title;
    
    const parts = title.split(new RegExp(`(${highlightWord})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlightWord.toLowerCase() 
        ? <span key={index} className="highlight">{part}</span>
        : part
    );
  };

  return (
    <header className="hero-header">
      <div className="hero-background">
        <div className="stars"></div>
        <div className="nebula"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <ShieldIcon />
          <span className="badge-text">{subtitle}</span>
        </div>
        <h1 className="hero-title">{renderTitle()}</h1>
      </div>
    </header>
  );
}
