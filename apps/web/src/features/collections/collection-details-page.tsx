import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export const CollectionDetailsPage = () => (
  <Box sx={{ p: 3 }}>
    <Helmet>
      <title>Collection | modes</title>
    </Helmet>
    <Typography variant="h4" gutterBottom>
      Collection Details
    </Typography>
    <Typography variant="body1">Placeholder</Typography>
  </Box>
);
