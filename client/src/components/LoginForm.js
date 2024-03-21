import React from 'react'
import authStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {

    const store = authStore();
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        await store.login();
        navigate("/dashboard")
    }
  return (
    <form onSubmit={handleLogin}>
        <input 
            onChange={store.updateLoginForm}
            value={store.loginForm.email}
            type="email" 
            name="email"
        />
        <input 
            onChange={store.updateLoginForm}
            value={store.loginForm.password}
            type="password" 
            name="password"
        />
        <button type="submit">Login</button>
    </form>
  )
}
