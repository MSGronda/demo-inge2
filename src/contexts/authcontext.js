import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    accessToken: sessionStorage.getItem('accessToken') || null,
  });

  const setAccessToken = (token) => {
    sessionStorage.setItem('accessToken', token);
    setAuthState({ ...authState, accessToken: token });
  };

  // Clear token from sessionStorage and state
  const logout = () => {
    sessionStorage.removeItem('accessToken');
    setAuthState({ ...authState, accessToken: null });
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAccessToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
