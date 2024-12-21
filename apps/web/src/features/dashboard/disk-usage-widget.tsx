import { Box, LinearProgress, Typography } from '@mui/material';
import { trpc } from '../../trpc';
import prettyBytes from 'pretty-bytes';
import { Widget } from '../../shared/ui/widget';

export const DiskUsageWidget = () => {
  const { data: diskUsage } = trpc.system.getDiskUsage.useQuery();

  return (
    <Widget title="Disk Usage">
      <Box sx={{ width: '100%', maxWidth: 400 }}>
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
    </Widget>
  );
};
