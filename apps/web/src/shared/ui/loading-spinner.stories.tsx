import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from './loading-spinner';

const meta = {
  title: 'UI/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 40,
    color: 'primary',
    fullScreen: false,
  },
};

export const Secondary: Story = {
  args: {
    size: 40,
    color: 'secondary',
    fullScreen: false,
  },
};

export const Large: Story = {
  args: {
    size: 80,
    color: 'primary',
    fullScreen: false,
  },
};

export const FullScreen: Story = {
  args: {
    size: 40,
    color: 'primary',
    fullScreen: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

// Example of using decorators to show spinner in a contained space
export const InContainer: Story = {
  args: {
    size: 40,
    color: 'primary',
  },
  decorators: [
    (Story) => (
      <div
        style={{ width: '300px', height: '300px', border: '1px solid #ccc' }}
      >
        <Story />
      </div>
    ),
  ],
};

export const ManyHamsters: Story = {
  args: {
    size: 40,
    color: 'primary',
    count: 5,
  },
};

export const SingleHamster: Story = {
  args: {
    size: 40,
    color: 'primary',
    count: 1,
  },
};
