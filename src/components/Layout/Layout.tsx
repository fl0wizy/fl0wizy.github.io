import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './Layout.css';

export default function Layout() {
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId: string) => {
    if (categoryId === 'all') {
      navigate('/');
    } else {
      navigate(`/category/${categoryId}`);
    }
  };

  return (
    <div className="layout">
      <Sidebar onCategorySelect={handleCategorySelect} />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
