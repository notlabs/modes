import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutButton } from './logout-button';
import { routes } from './routes';

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Tabs
          value={location.pathname}
          onChange={(_, value) => navigate(value)}
        >
          <Tab label="Dashboard" value={routes.root.path} />
          <Tab label="Browse" value={routes.browse.path} />
          <Tab label="Collections" value={routes.collections.path} />
          <Tab label="Admin" value={routes.admin.path} />
        </Tabs>
        <Box sx={{ mr: 2 }}>
          <LogoutButton />
        </Box>
      </Box>
    </AppBar>
  );
};
