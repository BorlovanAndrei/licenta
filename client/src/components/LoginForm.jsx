import React, { useEffect } from 'react';
import authStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Snackbar, Alert, useTheme } from '@mui/material';

export const LoginForm = () => {
  const store = authStore();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    await store.login();
  };

  useEffect(() => {
    if (store.loggedIn) {
      navigate("/dashboard");
    }
  }, [store.loggedIn, navigate]);

  const handleClose = () => {
    store.hideError();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor={theme.palette.primary[700]}
    >
      <form onSubmit={handleLogin}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
          bgcolor={theme.palette.background.default}
          borderRadius={8}
          boxShadow={4}
          width={400}
        >
          <TextField
            onChange={store.updateLoginForm}
            value={store.loginForm.email}
            type="email"
            name="email"
            label="Email"
            variant="outlined"
            color="primary"
            margin="normal"
            fullWidth
            size="large"
            mb={2}
          />
          <TextField
            onChange={store.updateLoginForm}
            value={store.loginForm.password}
            type="password"
            name="password"
            label="Password"
            variant="outlined"
            color="primary"
            margin="normal"
            fullWidth
            size="large"
            mb={2}
          />
          <Button variant="contained" type="submit" color="primary" size="large">
            Login
          </Button>
        </Box>
      </form>
      <Snackbar open={store.showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {store.errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
