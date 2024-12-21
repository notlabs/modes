import { DiskUsage } from './disk-usage';
import { StatsOverview } from './stats';
import { Providers } from './providers';

export const App = () => {
  return (
    <Providers>
      <div>
        <DiskUsage />
        <StatsOverview />
      </div>
    </Providers>
  );
};

export default App;
