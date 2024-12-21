import { Typography, Box } from '@mui/material';
import { DiskUsageWidget } from '../features/dashboard/disk-usage-widget';
import { StatsWidgets } from '../features/dashboard/stats-widgets';

export const StatsPage = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4" sx={{ mb: 4 }}>
      Statistics
    </Typography>

    <Box sx={{ mb: 4 }}>
      <DiskUsageWidget />
    </Box>

    <StatsWidgets />
  </Box>
);
