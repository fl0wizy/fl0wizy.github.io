import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { getPostsByCategory, getCategoryLabel } from '../lib/data';
import { L, useT } from '../lib/i18n';
import './Category.css';

export default function Category() {
  const t = useT();
  const { categoryId } = useParams<{ categoryId: string }>();
  const posts = categoryId ? getPostsByCategory(categoryId) : [];
  // One source of truth for category names: lib/data. This page used to keep
  // its own copy, which drifted out of sync with the sidebar.
  // The hero is brand copy, so its category name stays English even in Korean.
  const categoryLabel = L(getCategoryLabel(categoryId || ''), 'en');

  return (
    <div className="category-page">
      <Header
        subtitle="SECURITY RESEARCH LOG"
        title={`Category: ${categoryLabel}`}
        highlightWord={categoryLabel}
      />

      <section className="filtered-section">
        <h2 className="section-header">{t('filteredPosts')}</h2>
        <div className="posts-list">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="no-posts">
              <p>{t('noPostsInCategory')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
