import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { TRPCClientError } from '@trpc/client';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { trpc } from '../../trpc';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const login = trpc.auth.login.useMutation({
    useErrorBoundary: (error) => {
      if (error instanceof TRPCClientError) {
        return error?.data.code !== 'UNAUTHORIZED';
      }
      return true;
    },
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token);
      const params = new URLSearchParams(location.search);
      const returnUrl = params.get('returnUrl') || '/';
      navigate(returnUrl);
    },
  });

  console.error(login.error);

  const onSubmit = handleSubmit((data) => login.mutate(data));

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Paper sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>

        {login.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {login.error instanceof TRPCClientError
              ? login.error.message
              : 'An error occurred during login'}
          </Alert>
        )}

        <form onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={isSubmitting || login.isLoading}
          >
            {login.isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
