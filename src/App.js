import React, { useEffect } from 'react';
import { StoreProvider } from 'easy-peasy';
import store from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppNav from './components/AppNav';
import { Container } from 'react-bootstrap';

// Custom Routes
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

// Components
import Landing from './pages/Landing';
import Tournaments from './pages/Tournaments';
import setAuthToken from './utils/setAuthToken';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import AdminTournaments from './components/AdminTournaments';
import Profile from './components/Profile';
import NewTournament from './components/NewTournament';
import TournamentDetail from './components/TournamentDetail';

const App = () => {
  // const loadUser = useStoreActions((actions) => actions.auth.loadUser);
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.getActions().auth.loadUser();
  }, []);
  return (
    <StoreProvider store={store}>
      <Router>
        <AppNav />
        <Container>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/tournaments' component={Tournaments} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <AdminRoute exact path='/admin' component={AdminTournaments} />
            <AdminRoute
              exact
              path='/new-tournament'
              component={NewTournament}
            />
            <AdminRoute
              exact
              path='/tournamentdetail/:tournamentId'
              component={TournamentDetail}
            />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Router>
    </StoreProvider>
  );
};

export default App;
