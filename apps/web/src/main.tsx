import 'antd/dist/reset.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Providers } from './app/providers';
import { Hamster } from './shared/ui/hamster';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Providers>
      <div
        style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}
      >
        <Hamster width={200} height={200} />
      </div>
    </Providers>
  </StrictMode>
);
