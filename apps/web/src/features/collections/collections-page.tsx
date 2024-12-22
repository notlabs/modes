import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export const CollectionsPage = () => (
  <>
    <Helmet>
      <title>Collections | modes</title>
    </Helmet>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Collections
      </Typography>
      <Typography variant="body1">
        Your collections will be displayed here.
      </Typography>
    </Box>
  </>
);
