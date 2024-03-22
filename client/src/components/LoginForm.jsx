import React from 'react';
import authStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, useTheme } from '@mui/material';

export const LoginForm = () => {
    const store = authStore();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleLogin = async (e) => {
        e.preventDefault();
        await store.login();
        navigate("/dashboard");
    }

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
                    <Button variant="contained" type="submit" color="primary" size="large">Login</Button>
                </Box>
            </form>
        </Box>
    )
}
