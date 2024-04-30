import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;