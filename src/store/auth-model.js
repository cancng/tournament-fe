import api from '../utils/api';

import { action, thunk } from 'easy-peasy';

const authModel = {
  // states
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: null,
  errors: [],

  // actions
  fetching: action((state) => {
    state.loading = true;
  }),
  fetchingDone: action((state) => {
    state.loading = false;
  }),
  setErrors: action((state, payload) => {
    state.errors = payload;
  }),
  setAuthError: action((state) => {
    state.token = null;
    state.isAuthenticated = false;
    state.user = null;
    state.loading = false;
  }),
  userLoaded: action((state, payload) => {
    state.isAuthenticated = true;
    state.user = payload;
  }),
  loadUser: thunk(async (actions) => {
    try {
      const res = await api.get('/auth');
      actions.userLoaded(res.data);
    } catch (e) {
      actions.setAuthError();
    }
  }),
  loginSuccess: action((state, payload) => {
    state.token = payload.token;
    state.isAuthenticated = true;
  }),
  loginUser: thunk(async (actions, payload) => {
    const { email, password } = payload;
    const body = { email, password };
    actions.fetching();
    try {
      const res = await api.post('/auth', body);
      actions.loginSuccess(res.data);
      actions.loadUser();
      actions.fetchingDone();
      actions.setErrors([]);
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
      // console.log('hata', e);
    }
  }),
  registerUser: thunk(async (actions, payload) => {
    const { name, email, password } = payload;
    const body = { name, email, password };
    actions.fetching();
    try {
      const res = await api.post('/users',body);
      actions.loginSuccess(res.data);
      actions.loadUser();
      actions.fetchingDone();
      actions.setErrors([]);
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
    }
  }),
};

export default authModel;
