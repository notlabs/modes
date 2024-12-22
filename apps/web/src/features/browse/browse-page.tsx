import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export const BrowsePage = () => (
  <>
    <Helmet>
      <title>Browse | Modes</title>
    </Helmet>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Browse Media
      </Typography>
      <Typography variant="body1">
        Media items will be displayed here.
      </Typography>
    </Box>
  </>
);
