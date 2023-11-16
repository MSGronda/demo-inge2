import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/useAuth'; // Adjust the import path to your useAuth hook

const LoginRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export default LoginRoute;
