import { Typography, styled } from '@mui/material';
import { trpc as api } from '../../trpc';
import { Widget } from '../../shared/ui/widget';

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

export const StatsWidgets = () => {
  const { data: overview } = api.stats.getOverview.useQuery();
  const { data: detailedStats } = api.stats.getDetailedMediaStats.useQuery();

  return (
    <>
      <Widget title="Overview">
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
      </Widget>

      <Widget title="Media by Type">
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
      </Widget>

      <Widget title="Media Versions by Status">
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
      </Widget>
    </>
  );
};
