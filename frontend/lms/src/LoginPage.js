import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import './components/LoginForm.css';

const LoginPage = () => {
    return (
        <div>
            <Header />
            <LoginForm />
            <Footer />
        </div>
    );
};

export default LoginPage;