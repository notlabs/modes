import { zodResolver } from '@hookform/resolvers/zod';
import { TRPCClientError } from '@trpc/client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { trpc } from '../../trpc';
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = trpc.auth.login.useMutation({ useErrorBoundary: false });

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const token = login.data?.token;
    if (!token) return;
    localStorage.setItem('token', token);
    const params = new URLSearchParams(location.search);
    const returnUrl = params.get('returnUrl') || '/';
    navigate(returnUrl);
  }, [location.search, login.data?.token, navigate]);
  const handleLogin = form.handleSubmit((data) => login.mutate(data));

  const getErrorMessage = (error: unknown) =>
    error instanceof TRPCClientError
      ? error.message
      : 'An error occurred during login';

  return {
    login,
    form,
    handleLogin,
    getErrorMessage,
  };
};
