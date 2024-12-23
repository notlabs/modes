import type { Preview } from '@storybook/react';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { withProviders } from './helpers';

initialize();

const preview: Preview = {
  decorators: [mswDecorator, withProviders],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

// eslint-disable-next-line import/no-default-export
export default preview;
