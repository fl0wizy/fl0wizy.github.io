import Header from '../components/Header';
import PostArchive from '../components/PostArchive/PostArchive';
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
      
      <PostArchive posts={publishedPosts} title={t('archive')} />
    </div>
  );
}
