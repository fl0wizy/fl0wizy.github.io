import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { blogPosts } from '../lib/data';
import { useT } from '../lib/i18n';
import './Blog.css';

export default function Blog() {
  const t = useT();
  const publishedPosts = blogPosts.filter(post => post.published);

  return (
    <div className="blog-page">
      {/* Hero copy is brand, not content -- English in both languages */}
      <Header
        subtitle="SECURITY RESEARCH LOG"
        title="Searching for vulnerabilities"
        highlightWord="vulnerabilities"
      />
      
      <section className="archive-section">
        <h2 className="section-header">{t('archive')}</h2>
        <div className="posts-list">
          {publishedPosts.length > 0 ? (
            publishedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="no-posts">
              <p>{t('noPosts')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
