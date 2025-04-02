import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import DisplayStatus from './DisplayStatus';

const AuthMessage = () => {
    const { authStatus } = useContext(AuthContext);
    return authStatus ? <DisplayStatus type={authStatus.type} message={authStatus.message} /> : null;
};

export default AuthMessage;
