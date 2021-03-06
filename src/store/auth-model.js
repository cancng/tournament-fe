import api from '../utils/api';

import { action, thunk } from 'easy-peasy';

const authModel = {
  // states
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: null,
  errors: [],
  responseMsg: '',
  swalMsg: { head: null, msg: null, type: null },

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
  setResponseMsg: action((state, payload) => {
    state.responseMsg = payload;
  }),
  setSwalMsg: action((state, payload) => {
    state.swalMsg = payload;
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
    const { email, password, captcha } = payload;
    const body = { email, password, captcha };
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
    }
  }),
  registerUser: thunk(async (actions, payload) => {
    const { name, email, password, captcha } = payload;
    const body = { name, email, password, captcha };
    actions.fetching();
    try {
      const res = await api.post('/users', body);
      actions.setResponseMsg(res.data.msg);
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
  changePassword: thunk(async (actions, payload) => {
    const { password, new_password } = payload;
    const body = { password, new_password };
    // return;
    actions.fetching();
    try {
      const res = await api.post('/auth/changepassword', body);
      console.log(res.data);
      actions.fetchingDone();
      actions.setResponseMsg(res.data.msg);
      actions.setErrors([]);
      actions.setAuthError();
      payload.push('/login');
    } catch (e) {
      console.log(e);
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
    }
  }),
  activateAccount: thunk(async (actions, payload) => {
    try {
      const res = await api.get(`/auth/activate/${payload.userToken}`);
      const resMsg = res.data.msg;
      if (resMsg === 'Üyeliğiniz aktifleştirildi, giriş yapabilirsiniz') {
        // console.log(resMsg);
        actions.setSwalMsg({ head: 'OK!!', msg: resMsg, type: 'success' });
        payload.push('/login');
      }
    } catch (e) {
      actions.setSwalMsg({
        head: 'Hata!!',
        msg: 'Bir hata oluştu',
        type: 'error',
      });
      payload.push('/login');
    }
  }),
};

export default authModel;
