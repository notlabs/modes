import { Typography } from 'antd';
import styled from 'styled-components';
import { Widget } from '../../shared/ui/widget';

const StatsList = styled.dl`
  margin-top: 16px;
  & > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }
  & dt {
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.45);
  }
  & dd {
    margin: 0;
  }
`;

export const StatsWidgets = () => {
  const overview = {} as any;
  const detailedStats = {} as any;

  return (
    <>
      <Widget title="Overview">
        <StatsList>
          <div>
            <dt>Users</dt>
            <dd>
              <Typography.Text strong>{overview?.users}</Typography.Text>
            </dd>
          </div>
          <div>
            <dt>Media Items</dt>
            <dd>
              <Typography.Text strong>{overview?.media}</Typography.Text>
            </dd>
          </div>
          <div>
            <dt>Media Versions</dt>
            <dd>
              <Typography.Text strong>
                {overview?.mediaVersions}
              </Typography.Text>
            </dd>
          </div>
          <div>
            <dt>Collections</dt>
            <dd>
              <Typography.Text strong>{overview?.collections}</Typography.Text>
            </dd>
          </div>
          <div>
            <dt>Tags</dt>
            <dd>
              <Typography.Text strong>{overview?.tags}</Typography.Text>
            </dd>
          </div>
        </StatsList>
      </Widget>

      <Widget title="Media by Type">
        <StatsList>
          {detailedStats?.byMimeType.map(
            (stat: { mimeType: string; _count: number }) => (
              <div key={stat.mimeType}>
                <dt>{stat.mimeType}</dt>
                <dd>
                  <Typography.Text strong>{stat._count}</Typography.Text>
                </dd>
              </div>
            )
          )}
        </StatsList>
      </Widget>

      <Widget title="Media Versions by Status">
        <StatsList>
          {detailedStats?.byStatus.map(
            (stat: { status: string; _count: number }) => (
              <div key={stat.status}>
                <dt>{stat.status}</dt>
                <dd>
                  <Typography.Text strong>{stat._count}</Typography.Text>
                </dd>
              </div>
            )
          )}
        </StatsList>
      </Widget>
    </>
  );
};
