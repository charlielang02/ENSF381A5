import React from 'react';
import './LoginForm.css';

const DisplayStatus = ({ type, message }) => {
    return <div className={`status-message ${type}`}>{message}</div>;
};

export default DisplayStatus;
