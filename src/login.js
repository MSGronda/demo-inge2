// Login.js
// Login.js

import React, { useState } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserPool } from 'amazon-cognito-identity-js';

const Login = ({ history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const authenticationData = {
            Username: username,
            Password: password,
        };

        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const poolData = {
            UserPoolId: 'sa-east-1_2I1N7Ajgz',
            ClientId: '5khu253vk5d3fn8oqc9cf27ta3',
        };

        const userPool = new CognitoUserPool(poolData);

        const user = new CognitoUser({ Username: username, Pool: userPool });

        user.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
                console.log('Authentication successful', session);

                window.localStorage.setItem("SESSION", JSON.stringify(session))

                history.push('/home');
            },
            onFailure: (error) => {
                if (error.code === 'UserNotConfirmedException') {
                    // User exists but has not been confirmed, handle as needed (e.g., resend confirmation code).
                } else if (error.code === 'PasswordResetRequiredException') {
                    // User needs to set a new password, show the password reset form.
                    console.log('New password required');
                } else {
                    console.error('Authentication failed', error);
                }
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                // User needs to set a new password, show the password reset form.
                console.log('New password required');
            },
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;

