import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const AppLayout = () => (
  <Box
    sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {/* Navigation can be added here later */}
    <Box component="main" sx={{ flex: 1 }}>
      <Outlet />
    </Box>
  </Box>
);
