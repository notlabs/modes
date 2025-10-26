import type { Preview } from '@storybook/react-vite';
import { withProviders } from './helpers';

const preview: Preview = {
  decorators: [withProviders],
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

export default preview;
