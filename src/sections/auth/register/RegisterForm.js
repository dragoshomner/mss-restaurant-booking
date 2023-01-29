import { useState } from 'react';
// @mui
import { Stack, IconButton, InputAdornment, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { isEmail } from '../utils/isEmail';
import { isPassword } from '../utils/isPassword';
import { register } from 'src/requests';

// ----------------------------------------------------------------------
const DEFAULT_EMAIL = "register@email.com";
const DEFAULT_PASSWORD = "123456";

export default function RegisterForm({ goToLoginView }) {
  const [showPassword, setShowPassword] = useState({
    default: false,
    confirm: false,
  });
  const [credentials, setCredentials] = useState({
    email: DEFAULT_EMAIL,
    password: DEFAULT_PASSWORD
  });
  const [confirmPassword, setConfirmPassword] = useState(DEFAULT_PASSWORD);
  const [error, setError] = useState("");

  const isValidEmail = isEmail(credentials.email);
  const isValidPassword = isPassword(credentials.password);
  const isValidConfirmPassword = confirmPassword === credentials.password;
  const showEmailError = !isValidEmail && credentials.email.length > 0;
  const showPasswordError = !isValidPassword && credentials.password.length > 0;
  const showConfirmPasswordError = !isValidConfirmPassword && confirmPassword.length > 0;
  const isRegisterButtonEnabled = isValidEmail && 
    isValidPassword && 
    credentials.password === confirmPassword;

  const handleRegisterClick = async () => {
    const response = await register(credentials);
    if (response.success) {
        goToLoginView(response.message);
    }
    else {
        setError(response.message ?? "");
    }
  }

  return (
    <>
      <Stack spacing={3}>
        { error.length > 0 && 
            <Alert severity="error">{ error }</Alert>
        }
        <TextField 
          required
          error={showEmailError}
          helperText={showEmailError && "Not valid email"}
          name="email" 
          label="Email address" 
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
        />

        <TextField
          required
          error={showPasswordError}
          helperText={showPasswordError && "Password must have at least 4 characters"}
          name="password"
          label="Password"
          type={showPassword.default ? 'text' : 'password'}
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword({ ...showPassword, default: !showPassword.default })} edge="end">
                  <Iconify icon={showPassword.default ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          required
          error={showConfirmPasswordError}
          helperText={showConfirmPasswordError && "Passwords do not match"}
          name="confirm_password"
          label="Confirm password"
          type={showPassword.confirm ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })} edge="end">
                  <Iconify icon={showPassword.confirm ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton 
        fullWidth 
        disabled={!isRegisterButtonEnabled}
        size="large" 
        type="submit" 
        variant="contained" 
        sx={{ my: 2 }} 
        onClick={handleRegisterClick}>
            Register
      </LoadingButton>
    </>
  );
}
