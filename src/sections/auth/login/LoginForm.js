import { useState } from 'react';
// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { useAuth } from '../utils/useAuth';

// ----------------------------------------------------------------------

export default function LoginForm({ setAlert }) {
  const { onLogin } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async () => {
    const response = await onLogin(credentials);
    if (!response) {
      setAlert({
        severity: "error",
        message: "Wrong credentials! Please try again."
      });
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField 
          name="email" 
          label="Email address" 
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton 
        fullWidth 
        size="large" 
        type="submit" 
        variant="contained" 
        sx={{ my: 2 }} 
        onClick={handleLogin}>
          Login
      </LoadingButton>
    </>
  );
}
