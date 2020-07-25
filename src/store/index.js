import { createStore } from 'easy-peasy';
import tournamentModel from './tournament-model';
import authModel from './auth-model';
import setAuthToken from '../utils/setAuthToken';

const store = createStore(
  {
    tournament: tournamentModel,
    auth: authModel,
  },
  {
    name: 'Tournament Registration Store',
    devTools: true, // TODO: it will be false in production
  }
);
let currentState = store.getState();
store.subscribe(() => {
  let previousState = currentState;
  currentState = store.getState();
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

export default store;
