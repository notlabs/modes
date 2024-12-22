import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navigation } from './navigation';

export const AppLayout = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navigation />
    <Box component="main" sx={{ flex: 1 }}>
      <Outlet />
    </Box>
  </Box>
);
