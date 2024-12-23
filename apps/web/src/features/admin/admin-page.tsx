import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { trpc } from '../../trpc';

export const AdminPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { data: users } = trpc.admin.listUsers.useQuery();
  const setPassword = trpc.admin.setPassword.useMutation({
    onSuccess: () => {
      setSelectedUserId(null);
      setNewPassword('');
    },
  });

  const handlePasswordReset = () => {
    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    if (selectedUserId) {
      setPassword.mutate(
        {
          userId: selectedUserId,
          newPassword,
        },
        {
          onSuccess: () => {
            // Show success message
            setPasswordError('');
            setSelectedUserId(null);
            setNewPassword('');
          },
          onError: (error) => {
            setPasswordError(error.message);
          },
        }
      );
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <AdminPanelSettingsIcon />
        User Management
      </h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedUserId(user.id)}
                  >
                    Set Password
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedUserId} onClose={() => setSelectedUserId(null)}>
        <DialogTitle>Set New Password</DialogTitle>
        <DialogContent>
          <TextField
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setPasswordError('');
            }}
            placeholder="Enter new password"
            fullWidth
            margin="dense"
            error={!!passwordError}
            helperText={passwordError}
            autoComplete="new-password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedUserId(null)}>Cancel</Button>
          <Button variant="contained" onClick={handlePasswordReset}>
            Save Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
