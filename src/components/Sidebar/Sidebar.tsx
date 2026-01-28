import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories, getPostCountByCategory } from '../../lib/data';
import type { Category } from '../../lib/data';
import './Sidebar.css';

// 아이콘 컴포넌트
const Icons = {
  grid: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  globe: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  zap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  cpu: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  ),
  terminal: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  lock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  code: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  map: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  user: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  chevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  ),
  book: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  userCircle: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
    </svg>
  ),
};

const getIcon = (iconName?: string) => {
  if (!iconName) return null;
  const IconComponent = Icons[iconName as keyof typeof Icons];
  return IconComponent ? <IconComponent /> : null;
};

interface CategoryItemProps {
  category: Category;
  level: number;
  selectedCategory: string;
  onSelect: (id: string) => void;
}

function CategoryItem({ category, level, selectedCategory, onSelect }: CategoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategory === category.id;
  const postCount = category.id === 'all' ? getPostCountByCategory('all') : undefined;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    }
    onSelect(category.id);
  };

  return (
    <div className="category-item-wrapper">
      <button
        className={`category-item ${isSelected ? 'selected' : ''} level-${level}`}
        onClick={handleClick}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        <span className="category-icon">{getIcon(category.icon)}</span>
        <span className="category-name">{category.name}</span>
        {postCount !== undefined && (
          <span className="post-count">{postCount}</span>
        )}
        {hasChildren && (
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            <Icons.chevronDown />
          </span>
        )}
      </button>
      {hasChildren && isExpanded && (
        <div className="category-children">
          {category.children!.map((child) => (
            <CategoryItem
              key={child.id}
              category={child}
              level={level + 1}
              selectedCategory={selectedCategory}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SidebarProps {
  onCategorySelect?: (categoryId: string) => void;
}

export default function Sidebar({ onCategorySelect }: SidebarProps) {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isProfileActive = location.pathname === '/profile';
  const isBlogActive = location.pathname === '/' || location.pathname.startsWith('/blog') || location.pathname.startsWith('/category');

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategorySelect?.(categoryId);
  };

  return (
    <aside className="sidebar">
      {/* Logo Section - 클릭 효과 없음 */}
      <div className="sidebar-logo">
        <div className="logo-container">
          <div className="logo-image-wrapper">
            <img src="/images/profile.jpg" alt="flowizy" className="logo-profile-image" />
          </div>
          <div className="logo-text">
            <h1>flowizy's DevLog</h1>
            <p>SECURITY RESEARCHER</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <Link to="/profile" className={`nav-item ${isProfileActive ? 'active' : ''}`}>
          <Icons.userCircle />
          <span>PROFILE</span>
        </Link>
        <Link to="/" className={`nav-item ${isBlogActive ? 'active' : ''}`}>
          <Icons.book />
          <span>BLOG</span>
        </Link>
      </nav>

      {/* Categories */}
      <div className="sidebar-categories">
        <div className="categories-header">
          <span>CONTENT CATEGORIES</span>
        </div>
        <div className="categories-list">
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              level={0}
              selectedCategory={selectedCategory}
              onSelect={handleCategorySelect}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
