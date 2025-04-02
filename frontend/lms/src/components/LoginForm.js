import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';
import AuthMessage from './AuthMessage';
import './LoginForm.css';
import { useAuth } from './AuthProvider';
import { loginUser } from '../api';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authStatus, setAuthStatus] = useState(null);
    const { login } = useAuth();
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus?.type === 'success') {
            login(userData);
            setTimeout(() => navigate('/courses'), 2000);
        }
    }, [authStatus, navigate, login, userData]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setAuthStatus({ type: 'error', message: 'Username and password cannot be empty.' });
            return;
        }
        if (password.length < 8) {
            setAuthStatus({ type: 'error', message: 'Password must be at least 8 characters long.' });
            return;
        }
        try {
            const data = await loginUser(username, password);
                setUserData({
                    id: data.student_id,
                    username: username
                });
            if (data.message === "Login successful") {
                setAuthStatus({ type: 'success', message: 'Login successful! Redirecting...' });
            } else {
                setAuthStatus({ type: 'error', message: 'Invalid username or password.' });
            }
        } catch (error) {
            setAuthStatus({ type: 'error', message: 'Error connecting to the server.' });
        }
    };

    return (
        <AuthContext.Provider value={{ authStatus }}>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
                <a href="#" className="forgot-password">Forgot Password?</a>
                <AuthMessage />
            </div>
        </AuthContext.Provider>
    );
};

export default LoginForm;
