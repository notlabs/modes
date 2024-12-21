import { DiskUsageWidget } from './features/dashboard/disk-usage-widget';
import { Providers } from './app/providers';
import { StatsWidgets } from './features/dashboard/stats-widgets';

export const App = () => (
  <Providers>
    <div>
      <DiskUsageWidget />
      <StatsWidgets />
    </div>
  </Providers>
);
