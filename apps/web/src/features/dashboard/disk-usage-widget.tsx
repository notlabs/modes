import { Progress, Typography } from 'antd';
import prettyBytes from 'pretty-bytes';
import styled from 'styled-components';
import { Widget } from '../../shared/ui/widget';

export const DiskUsageWidget = () => {
  const diskUsage = {} as any;
  const percent = Math.round(diskUsage?.usedPercent || 0);

  return (
    <Widget title="Disk Usage">
      <Container>
        <Row>
          <Grow>
            <Progress percent={percent} showInfo={false} size="small" />
          </Grow>
          <Min>
            <Typography.Text type="secondary">{`${percent}%`}</Typography.Text>
          </Min>
        </Row>

        <Typography.Text type="secondary">
          {`${prettyBytes(diskUsage?.used || 0)} used of ${prettyBytes(
            diskUsage?.total || 0
          )}`}
        </Typography.Text>
      </Container>
    </Widget>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Grow = styled.div`
  flex: 1;
  margin-right: 8px;
`;

const Min = styled.div`
  min-width: 35px;
  text-align: right;
  color: rgba(0, 0, 0, 0.45);
`;
