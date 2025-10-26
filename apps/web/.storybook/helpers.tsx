import React from 'react';
import { Providers } from '../src/app/providers';

export const withProviders = (Story: React.ComponentType) => (
  <Providers>
    <Story />
  </Providers>
);
