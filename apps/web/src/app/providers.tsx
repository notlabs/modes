import { ConfigProvider } from 'antd';
import { JazzReactProvider } from 'jazz-tools/react';
import React from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <JazzReactProvider
    sync={{ peer: 'wss://cloud.jazz.tools/?key=example@modes.app' }}
  >
    <ConfigProvider>{children}</ConfigProvider>
  </JazzReactProvider>
);
