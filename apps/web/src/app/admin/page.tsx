import { useEffect } from 'react';
import { AdminPage } from '../../features/admin/admin-page';
import { useLocation, useNavigate } from 'react-router-dom';

export const Page = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [navigate, pathname]);

  return <AdminPage />;
};
