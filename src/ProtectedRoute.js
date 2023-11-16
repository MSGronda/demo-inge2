import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  console.log('ProtectedRoute - isLoggedIn:', isLoggedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default ProtectedRoute;
