import { Box, Paper, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type WidgetProps = {
  title: string;
  children: ReactNode;
};

export const Widget = ({ title, children }: WidgetProps) => (
  <Paper
    sx={{
      p: 3,
      height: '100%',
      borderRadius: 2,
    }}
  >
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Box>{children}</Box>
  </Paper>
);
