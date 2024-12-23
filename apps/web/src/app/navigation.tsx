import { AppBar, Tabs, Tab } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from './routes';

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default">
      <Tabs value={location.pathname} onChange={(_, value) => navigate(value)}>
        <Tab label="Dashboard" value={routes.root.path} />
        <Tab label="Browse" value={routes.browse.path} />
        <Tab label="Collections" value={routes.collections.path} />
        <Tab label="Admin" value={routes.admin.path} />
      </Tabs>
    </AppBar>
  );
};
