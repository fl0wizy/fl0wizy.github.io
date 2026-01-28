import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { blogPosts } from '../lib/data';
import './Blog.css';

export default function Blog() {
  const publishedPosts = blogPosts.filter(post => post.published);

  return (
    <div className="blog-page">
      <Header 
        title="Searching for vulnerabilities" 
        highlightWord="vulnerabilities"
      />
      
      <section className="archive-section">
        <h2 className="section-header">ARCHIVE</h2>
        <div className="posts-list">
          {publishedPosts.length > 0 ? (
            publishedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="no-posts">
              <p>아직 게시글이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
