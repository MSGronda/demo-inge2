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
    const [isLoading, setLoading] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = () => {
        setLoading(true);
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
                setLoading(false);
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
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <div class="flex items-center justify-center">
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    class="w-8 h-8 text-purple-300 animate-spin fill-white"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        "Login"
                    )}
                </button>
                <div className="text-center">
                    <span className="text-sm text-gray-500">No account?</span>
                    <a
                        href="/register"
                        className="font-semibold text-sm ml-1 text-purple-500 hover:text-pink-500 duration-200 cursor-pointer hover:underline"
                    >
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
