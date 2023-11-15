// ConfirmRegistration.js

import React, { useState } from 'react';
import {CognitoUser, CognitoUserPool} from 'amazon-cognito-identity-js';


const ConfirmRegistration = ({ history }) => {
    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleConfirmation = async () => {
        try {
            const poolData = {
                UserPoolId: 'sa-east-1_2I1N7Ajgz',
                ClientId: '5khu253vk5d3fn8oqc9cf27ta3',
            };

            const userPool = new CognitoUserPool(poolData);

            const username = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)

            const user = new CognitoUser({ Username: username, Pool: userPool });

            await user.confirmRegistration(confirmationCode, true, (err, result) => {
                if (err) {
                    setError(err.message || 'An error occurred during confirmation.');
                } else {
                    setSuccessMessage('Confirmation successful. You can now log in.');
                    history.push('/login');
                }
            });
        } catch (error) {
            setError(error.message || 'An error occurred during confirmation.');
        }

    };

    return (
        <div>
            <h2>Confirm Registration</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <label>Confirmation Code:</label>
            <input
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
            />
            <button onClick={handleConfirmation}>Confirm</button>
        </div>
    );
};

export default ConfirmRegistration;
