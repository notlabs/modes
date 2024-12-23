import {
  Alert,
  Box,
  Button,
  Grow,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { useAuth } from './hooks';

export const LoginPage = () => {
  const { login, form, handleLogin, getErrorMessage } = useAuth();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;

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
          <Grow in={!!login.error}>
            <Alert severity="error" sx={{ mb: 2 }}>
              {getErrorMessage(login.error)}
            </Alert>
          </Grow>
        )}

        <form onSubmit={handleLogin}>
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
