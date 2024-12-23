import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import { trpc } from '../../trpc';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = trpc.auth.login.useMutation({
    onSuccess: ({ token }) => {
      localStorage.setItem('token', token);

      const params = new URLSearchParams(location.search);
      const returnUrl = params.get('returnUrl') || '/';
      navigate(returnUrl);
    },
  });

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

        <form
          onSubmit={(e) => {
            e.preventDefault();
            login.mutate({ email, password });
          }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={login.isLoading}
          >
            {login.isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};
