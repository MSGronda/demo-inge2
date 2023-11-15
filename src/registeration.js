// Registration.js

import React, { useState } from 'react';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';

const Registration = ({ history }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleRegistration = async () => {
        try {
            const poolData = {
                UserPoolId: 'sa-east-1_2I1N7Ajgz',
                ClientId: '5khu253vk5d3fn8oqc9cf27ta3',
            };

            const userPool = new CognitoUserPool(poolData);

            const attributeList = [
                new CognitoUserAttribute({ Name: 'email', Value: email }),
            ];

            await userPool.signUp(username, password, attributeList, null, (err, result) => {
                if (err) {
                    setError(err.message || 'An error occurred during registration.');
                } else {
                    setSuccessMessage(`Registration successful. Confirmation code sent to ${result.user.getUsername()}.`);
                    history.push(`/confirm-registration/${result.user.getUsername()}`);
                }
            });
        } catch (error) {
            setError(error.message || 'An error occurred during registration.');
        }


    };

    return (
        <div>
            <h2>Registration</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <label>Username:</label>
            <input
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label>Email:</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegistration}>Register</button>
        </div>
    );
};

export default Registration;
