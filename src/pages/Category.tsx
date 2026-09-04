import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { getPostsByCategory } from '../lib/data';
import './Category.css';

// Category labels
const categoryLabels: Record<string, string> = {
  'all': 'All',
  'daily': 'Daily',
  'security': 'Security',
  'web-security': 'Web Security',
  'web3-blockchain': 'Web3 / Blockchain',
  'research-article': 'Research/Article',
  'study-dev-security': 'Study(dev/security)',
  'wargame-ctf': 'Wargame/CTF',
  'reversing': 'Reversing',
  'pwn': 'Pwn',
  'crypto': 'Crypto',
  'hardware': 'Hardware',
  'development': 'Development',
  'travel': 'Travel',
};

export default function Category() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const posts = categoryId ? getPostsByCategory(categoryId) : [];
  const categoryLabel = categoryLabels[categoryId || ''] || categoryId;

  return (
    <div className="category-page">
      <Header 
        title={`Category: ${categoryLabel}`}
        highlightWord={categoryLabel}
      />
      
      <section className="filtered-section">
        <h2 className="section-header">FILTERED POSTS</h2>
        <div className="posts-list">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="no-posts">
              <p>No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
