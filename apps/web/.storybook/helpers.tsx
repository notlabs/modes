import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Providers } from '../src/app/providers';

export const withProviders = (
  Story: React.ComponentType,
  { parameters }: { parameters: any }
) => (
  <MemoryRouter initialEntries={parameters?.initialEntries}>
    <Providers>
      <Story />
    </Providers>
  </MemoryRouter>
);
