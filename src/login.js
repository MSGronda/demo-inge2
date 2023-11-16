// Login.js
// Login.js

import React, { useState, useContext } from "react";
import { AuthContext } from "./contexts/authcontext";
import {
    CognitoUser,
    AuthenticationDetails,
    CognitoUserPool,
} from "amazon-cognito-identity-js";

const Login = ({ history }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setAccessToken } = useContext(AuthContext);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        const authenticationData = {
            Username: username,
            Password: password,
        };

        const authenticationDetails = new AuthenticationDetails(
            authenticationData
        );

        const poolData = {
            UserPoolId: process.env.REACT_APP_USERPOOL_ID,
            ClientId: process.env.REACT_APP_CLIENT_ID,
        };

        const userPool = new CognitoUserPool(poolData);

        const user = new CognitoUser({ Username: username, Pool: userPool });

        user.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
                console.log("Authentication successful", session);

                const idToken = session.getIdToken().getJwtToken();
                const accessToken = session.getAccessToken().getJwtToken();
                const refreshToken = session.getRefreshToken().getToken();

                const userSession = {
                    idToken,
                    accessToken,
                    refreshToken,
                };
                setAccessToken(idToken, userSession);

                history.push("/");
            },
            onFailure: (error) => {
                if (error.code === "UserNotConfirmedException") {
                    // User exists but has not been confirmed, handle as needed (e.g., resend confirmation code).
                } else if (error.code === "PasswordResetRequiredException") {
                    // User needs to set a new password, show the password reset form.
                    console.log("New password required");
                } else {
                    console.error("Authentication failed", error);
                }
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
                // User needs to set a new password, show the password reset form.
                console.log("New password required");
            },
        });
    };

    return (
        <div className="h-screen w-screen flex bg-neutral-100">
            <div className="m-auto bg-white shadow-md w-1/4 px-8 py-8 rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-12">
                🦄 Login
                </h2>
                <input
                    className="mb-8 block w-full p-4 text-gray-900 border border-gray-200 border-solid rounded-lg bg-gray-50 sm:text-md focus:ring-purple-500 focus:border-transparent focus:ring-2 duration-200 shadow-none hover:shadow-none selection:bg-purple-200"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    className="mb-4 block w-full p-4 text-gray-900 border border-gray-200 border-solid rounded-lg bg-gray-50 sm:text-md focus:ring-purple-500 focus:border-transparent focus:ring-2 duration-200 shadow-none hover:shadow-none selection:bg-purple-200"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div class="flex items-center mb-12">
                    <input
                        checked={showPassword}
                        onChange={togglePasswordVisibility}
                        id="default-checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 shadow-none border border-solid hover:shadow-none"
                    />
                    <label
                        for="default-checkbox"
                        class="ms-2 text-sm text-gray-500 "
                    >
                        Show password
                    </label>
                </div>
                <button
                    className="w-full  text-white bg-gradient-to-r from-purple-500 to-pink-500 focus:ring-2 focus:outline-none hover:hue-rotate-15 duration-200 ease-in-out font-bold rounded-lg text-sm p-4 text-center me-2 mb-2 hover:shadow-none focus:ring-purple-500"
                    onClick={handleLogin} 
                >
                    Login
                </button>
                <div className="text-center">
                    <span className="text-sm text-gray-500">No account?</span>
                    <a href="/register" className="font-semibold text-sm ml-1 text-purple-500 hover:text-pink-500 duration-200 cursor-pointer hover:underline">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
