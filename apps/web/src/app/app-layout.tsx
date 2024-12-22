import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Navigation } from './navigation';
import { Helmet } from 'react-helmet-async';

export const AppLayout = () => (
  <>
    <Helmet>
      <title>modes</title>
    </Helmet>
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  </>
);
