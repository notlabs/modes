import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { ReactNode } from 'react';

type PageProps = {
  title?: string;
  children: ReactNode;
};

export const Page = ({ title, children }: PageProps) => (
  <>
    <Helmet>
      <title>{title ? `${title} | modes` : 'modes'}</title>
    </Helmet>
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  </>
);
