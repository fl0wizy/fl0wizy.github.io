import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { getPostsByCategory, getCategoryLabel } from '../lib/data';
import { useLang, useT } from '../lib/i18n';
import './Category.css';

export default function Category() {
  const { L } = useLang();
  const t = useT();
  const { categoryId } = useParams<{ categoryId: string }>();
  const posts = categoryId ? getPostsByCategory(categoryId) : [];
  // One source of truth for category names: lib/data. This page used to keep
  // its own copy, which drifted out of sync with the sidebar.
  const categoryLabel = L(getCategoryLabel(categoryId || ''));

  return (
    <div className="category-page">
      <Header
        subtitle={t('heroBadge')}
        title={`${t('categoryPrefix')}: ${categoryLabel}`}
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
