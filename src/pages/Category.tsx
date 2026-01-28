import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import { getPostsByCategory } from '../lib/data';
import './Category.css';

// 카테고리 라벨
const categoryLabels: Record<string, string> = {
  'all': '전체',
  'daily': '일상(Daily)',
  'security': '보안(Security)',
  'web-security': 'Web Security',
  'web3-blockchain': 'Web3 / Blockchain',
  'research-article': 'Research/Article',
  'study-dev-security': 'Study(dev/security)',
  'wargame-ctf': 'Wargame/CTF',
  'reversing': 'Reversing',
  'pwn': 'Pwn',
  'crypto': 'Crypto',
  'development': '개발(Development)',
  'travel': '여행(Travel)',
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
              <p>아직 이 카테고리에 게시글이 없습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
