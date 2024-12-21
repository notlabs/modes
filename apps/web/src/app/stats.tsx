import { Card, Typography, Box, styled } from '@mui/material';
import { trpc as api } from '../utils/trpc';

const StatsCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
}));

const StatsList = styled('dl')(({ theme }) => ({
  marginTop: theme.spacing(2),
  '& > div': {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
  },
  '& dt': {
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
  },
  '& dd': {
    margin: 0,
    fontFamily: theme.typography.fontFamily,
  },
}));

export function StatsOverview() {
  const { data: overview } = api.stats.getOverview.useQuery();
  const { data: detailedStats } = api.stats.getDetailedMediaStats.useQuery();

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }}
      gap={2}
    >
      <StatsCard>
        <Typography variant="h6">Overview</Typography>
        <StatsList>
          <div>
            <dt>Users</dt>
            <Typography component="dd" fontWeight="medium">
              {overview?.users}
            </Typography>
          </div>
          <div>
            <dt>Media Items</dt>
            <Typography component="dd" fontWeight="medium">
              {overview?.media}
            </Typography>
          </div>
          <div>
            <dt>Media Versions</dt>
            <Typography component="dd" fontWeight="medium">
              {overview?.mediaVersions}
            </Typography>
          </div>
          <div>
            <dt>Collections</dt>
            <Typography component="dd" fontWeight="medium">
              {overview?.collections}
            </Typography>
          </div>
          <div>
            <dt>Tags</dt>
            <Typography component="dd" fontWeight="medium">
              {overview?.tags}
            </Typography>
          </div>
        </StatsList>
      </StatsCard>

      <StatsCard>
        <Typography variant="h6">Media by Type</Typography>
        <StatsList>
          {detailedStats?.byMimeType.map((stat) => (
            <div key={stat.mimeType}>
              <dt>{stat.mimeType}</dt>
              <Typography component="dd" fontWeight="medium">
                {stat._count}
              </Typography>
            </div>
          ))}
        </StatsList>
      </StatsCard>

      <StatsCard>
        <Typography variant="h6">Media Versions by Status</Typography>
        <StatsList>
          {detailedStats?.byStatus.map((stat) => (
            <div key={stat.status}>
              <dt>{stat.status}</dt>
              <Typography component="dd" fontWeight="medium">
                {stat._count}
              </Typography>
            </div>
          ))}
        </StatsList>
      </StatsCard>
    </Box>
  );
}

export default function StatsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Statistics
      </Typography>
      <StatsOverview />
    </Box>
  );
}
