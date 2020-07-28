import api from '../utils/api';

import { action, thunk } from 'easy-peasy';

const userModel = {
  // states
  users: [],
  errors: [],
  loading: false,
  customMsg: { msg: '', type: '' },

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
  setCustomMsg: action((state, payload) => {
    state.customMsg = payload;
  }),
  setUsers: action((state, payload) => {
    state.users = payload;
  }),
  fetchUsers: thunk(async (actions, payload) => {
    actions.fetching();
    try {
      const res = await api.get('/users');
      actions.setUsers(res.data);
      actions.fetchingDone();
    } catch (e) {
      console.log(e.message);
    }
  }),
  switchUserStatus: thunk(async (actions, payload) => {
    actions.fetching();
    try {
      await api.post(`/users/setActivity/${payload}`);
      actions.fetchUsers();
      actions.fetchingDone();
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
    }
  }),
  deleteUser: thunk(async (actions, payload) => {
    actions.fetching();
    try {
      await api.delete(`/users/${payload}`);
      // push('/admin');
      actions.fetchUsers();
      actions.setCustomMsg({
        msg: 'Seçili üyenin kaydı silindi!',
        type: 'success',
      });
      actions.fetchingDone();
    } catch (e) {
      const error = e.response.data.msg;
      if (error) {
        actions.setCustomMsg({ type: 'danger', msg: error });
        actions.fetchingDone();
      }
    }
  }),
};

export default userModel;
