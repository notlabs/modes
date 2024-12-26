import { createMockHandler } from '@modes/api';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, screen, userEvent } from '@storybook/test';
import { http, HttpResponse } from 'msw';
import { LoginPage } from './login-page';

const meta = {
  title: 'Pages/Auth/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
    msw: {
      handlers: [
        createMockHandler('auth', 'login', {
          data: { token: 'custom-token' },
        }),
      ],
    },
  },
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};

export const SuccessfulLogin: Story = {
  play: async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    expect(await screen.findByText(/logging in/i)).toBeInTheDocument();
  },
};

export const InvalidCredentials: Story = {
  parameters: {
    msw: {
      // handlers: [
      //   http.post('*/api/trpc/auth.login?batch=1', () =>
      //     HttpResponse.json(
      //       {
      //         error: {
      //           message: 'Invalid email or password',
      //           code: 'UNAUTHORIZED',
      //         },
      //       },
      //       { status: 401 }
      //     )
      //   ),
      // ],
    },
  },
  play: async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'wrong@example.com');
    await userEvent.type(passwordInput, 'wrongpass');
    await userEvent.click(submitButton);

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  },
};

export const NetworkError: Story = {
  parameters: {
    msw: {
      handlers: [http.post('/api/trpc/auth.login', () => HttpResponse.error())],
    },
  },
  play: async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/an error occurred during login/i)
    ).toBeInTheDocument();
  },
};

export const ValidationErrors: Story = {
  play: async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.type(passwordInput, '12345');
    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/invalid email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  },
};
