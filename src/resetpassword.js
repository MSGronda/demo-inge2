
import React, { useState } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';

const ResetPassword = ({ cognitoUser }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleResetPassword = async () => {
        try {
            await cognitoUser.completeNewPasswordChallenge(newPassword, null);
            setSuccessMessage('Password reset successful. You can now log in with your new password.');
        } catch (error) {
            setError(error.message || 'An error occurred during password reset.');
        }
    };

    return (
        <div>
            <h2>Password Reset</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <label>New Password:</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>Confirmation Code:</label>
            <input
                type="text"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
            />
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
};

export default ResetPassword;