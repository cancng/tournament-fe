import axios from 'axios';
import store from '../store';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.data.msg === 'Token is not valid') {
      // store.dispatch({ type: 'LOGOUT' });
      store.getActions().auth.setAuthError();
    }
    return Promise.reject(error);
  }
);

export default api;
