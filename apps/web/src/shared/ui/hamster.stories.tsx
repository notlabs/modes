import type { Meta, StoryObj } from '@storybook/react';
import { Hamster } from './hamster';

const meta = {
  title: 'UI/Hamster',
  component: Hamster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Hamster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
    height: 200,
    speed: 3,
    delay: 0,
  },
};

export const FastHamster: Story = {
  args: {
    width: 200,
    height: 200,
    speed: 0.5,
    delay: 0,
  },
};

export const SlowHamster: Story = {
  args: {
    width: 200,
    height: 200,
    speed: 5,
    delay: 0,
  },
};

export const DelayedHamster: Story = {
  args: {
    width: 200,
    height: 200,
    speed: 3,
    delay: 1,
  },
};

export const Large: Story = {
  args: {
    width: 400,
    height: 400,
    speed: 3,
    delay: 0,
  },
};

export const MultipleHamsters: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Hamster width={150} height={150} delay={0} speed={2} />
      <Hamster width={150} height={150} delay={0.3} speed={2} />
      <Hamster width={150} height={150} delay={0.6} speed={2} />
    </div>
  ),
};
