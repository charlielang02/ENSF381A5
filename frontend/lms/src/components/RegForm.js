import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayStatus from './DisplayStatus';
import '../SignupPage.css';

const RegForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const navigate = useNavigate();

    const validateForm = () => {
        const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{}|;:'",.<>?/`~]).{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|io)$/;

        if (!usernameRegex.test(username)) {
            return "Username must start with a letter, be 3-20 characters long, and only contain letters, numbers, hyphens, and underscores.";
        }
        if (!passwordRegex.test(password)) {
            return "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.";
        }
        if (password !== confirmPassword) {
            return "Passwords do not match.";
        }
        if (!emailRegex.test(email)) {
            return "Invalid email format. Must be a valid email with .com, .net, or .io.";
        }
        return null;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const validationError = validateForm();
        if (validationError) {
            setStatus({ type: 'error', message: validationError });
            return;
        }

        try {
            const response = await fetch('https://your-backend-api.com/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, email }),
            });

            if (response.ok) {
                setStatus({ type: 'success', message: 'Signup successful! Redirecting to login...' });
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setStatus({ type: 'error', message: 'Signup failed. Try again later.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Network error. Please try again.' });
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="signup-btn">Sign Up</button>
            </form>
            {status && <DisplayStatus type={status.type} message={status.message} />}
        </div>
    );
};

export default RegForm;
