import { useState } from 'react';
import { trpc } from '../../trpc';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const AdminPage = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const { data: users } = trpc.admin.listUsers.useQuery();
  const setPassword = trpc.admin.setPassword.useMutation({
    onSuccess: () => {
      setSelectedUserId(null);
      setNewPassword('');
    },
  });

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
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedUserId(null)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              if (selectedUserId) {
                setPassword.mutate({
                  userId: selectedUserId,
                  newPassword,
                });
              }
            }}
          >
            Save Password
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
