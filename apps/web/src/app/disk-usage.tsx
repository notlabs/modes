import { Box, LinearProgress, Typography } from '@mui/material';
import { trpc } from '../utils/trpc';
import prettyBytes from 'pretty-bytes';

export const DiskUsage = () => {
  const { data: diskUsage, isLoading } = trpc.system.getDiskUsage.useQuery();

  if (isLoading) return <div>Loading disk usage...</div>;

  return (
    <Box sx={{ width: '100%', maxWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Disk Usage
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={diskUsage?.usedPercent || 0}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {`${Math.round(diskUsage?.usedPercent || 0)}%`}
          </Typography>
        </Box>
      </Box>

      <Typography variant="caption" color="text.secondary">
        {`${prettyBytes(diskUsage?.used || 0)} used of ${prettyBytes(
          diskUsage?.total || 0
        )}`}
      </Typography>
    </Box>
  );
};
