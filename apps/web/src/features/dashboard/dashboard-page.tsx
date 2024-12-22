import { Box } from '@mui/material';
import { StatsWidgets } from './stats-widgets';
import { DiskUsageWidget } from './disk-usage-widget';

export const DashboardPage = () => (
  <Box
    sx={{
      display: 'grid',
      gap: 2,
      gridTemplateColumns: {
        xs: '1fr',
        md: 'repeat(2, 1fr)',
      },
      p: 2,
    }}
  >
    <Box sx={{ gridColumn: '1/-1' }}>
      <DiskUsageWidget />
    </Box>
    <Box
      sx={{
        display: 'grid',
        gap: 2,
      }}
    >
      <StatsWidgets />
    </Box>
  </Box>
);
