import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useStoreState } from 'easy-peasy';

const AdminRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useStoreState((state) => state.auth.isAuthenticated);

  const userStore = useStoreState((state) => state.auth.user);
  let isAdmin;
  if (userStore !== null) {
    isAdmin = userStore.isAdmin;
  }
  // console.log(isAdmin);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && isAdmin === '1' ? (
          <Component {...props} />
        ) : (
          <Redirect to='/' />
        )
      }
    />
  );
};

export default AdminRoute;
