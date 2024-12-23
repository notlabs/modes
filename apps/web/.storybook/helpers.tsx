import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Providers } from '../src/app/providers';

export const withProviders = (
  Story: React.ComponentType,
  // TODO: fix
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  { parameters }: { parameters: any }
) => (
  <MemoryRouter initialEntries={parameters?.initialEntries}>
    <Providers>
      <Story />
    </Providers>
  </MemoryRouter>
);
