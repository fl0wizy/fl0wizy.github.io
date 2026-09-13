import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LangProvider } from './lib/i18n';
import Layout from './components/Layout';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Category from './pages/Category';

function App() {
  return (
    <LangProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Blog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="category/:categoryId" element={<Category />} />
        </Route>
        </Routes>
      </Router>
    </LangProvider>
  );
}

export default App;
