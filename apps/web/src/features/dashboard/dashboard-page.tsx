import styled from 'styled-components';
import { DiskUsageWidget } from './disk-usage-widget';
import { StatsWidgets } from './stats-widgets';

export const DashboardPage = () => (
  <Grid>
    <Full>
      <DiskUsageWidget />
    </Full>
    <Inner>
      <StatsWidgets />
    </Inner>
  </Grid>
);

const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  padding: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Full = styled.div`
  grid-column: 1 / -1;
`;

const Inner = styled.div`
  display: grid;
  gap: 16px;
`;
