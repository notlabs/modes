import { AppBar, Box, Tab, Tabs } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoutButton } from './logout-button';
import { routes } from './routes';

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = Object.values(routes).filter(({ showInNav }) => showInNav);

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
          {navItems.map((route) => (
            <Tab key={route.path} label={route.label} value={route.path} />
          ))}
        </Tabs>
        <Box sx={{ mr: 2 }}>
          <LogoutButton />
        </Box>
      </Box>
    </AppBar>
  );
};
