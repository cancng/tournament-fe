import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useStoreState((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default PrivateRoute;
