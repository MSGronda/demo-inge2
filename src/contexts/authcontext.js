import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: null,
    isLoggedIn: false,
    userSession: null,
    isLoading: true, // Add an isLoading flag
  });

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    const userSessionData = sessionStorage.getItem('userSession');

    if (token && userSessionData) {
      setAuthState({
        accessToken: token,
        isLoggedIn: true,
        userSession: JSON.parse(userSessionData),
        isLoading: false, // Set isLoading to false after state is initialized
      });
    } else {
      setAuthState({
        accessToken: null,
        isLoggedIn: false,
        userSession: null,
        isLoading: false, // Set isLoading to false if there is no data
      });
    }
  }, []);
  
  console.log('AuthProvider state:', authState);

  const setAccessToken = (token, sessionData) => {
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('userSession', JSON.stringify(sessionData)); // Store user session data
    setAuthState({ accessToken: token, isLoggedIn: !!token, userSession: sessionData });
};

  // Clear token and session data from sessionStorage and state
  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userSession'); // Clear user session data
    setAuthState({ accessToken: null, isLoggedIn: false, userSession: null });
  };

  if (authState.isLoading) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  return (
    <AuthContext.Provider value={{ ...authState, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
