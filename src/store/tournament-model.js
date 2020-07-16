import api from '../utils/api';

import { action, thunk } from 'easy-peasy';

const tournamentModel = {
  //states
  tournaments: [],
  loading: false,
  errors: [],
  selectedTournament: {},

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
  addItems: action((state, payload) => {
    state.tournaments = payload;
  }),
  setTournament: action((state, payload) => {
    state.selectedTournament = payload;
  }),
  fetchTournament: thunk(async (actions, payload) => {
    actions.fetching();
    try {
      const result = await api.get(`/tournament/${payload}`);
      actions.setTournament(result.data);
      actions.fetchingDone();
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
    }
  }),
  fetchAllTournaments: thunk(async (actions) => {
    actions.fetching();
    try {
      const result = await api.get('/tournament/list');
      actions.addItems(result.data);
      actions.fetchingDone();
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
    }
  }),
  switchTournamentStatus: thunk(async (actions, payload) => {
    actions.fetching();
    try {
      await api.post(`/tournament/setActivity/${payload}`);
      actions.fetchAllTournaments();
      actions.fetchingDone();
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
    }
  }),
  createTournament: thunk(async (actions, payload) => {
    try {
      const body = {
        ...payload.inputs,
        isActive: payload.tournamentActivity,
      };
      await api.post('/tournament/create', body);

      actions.setErrors([]);
      payload.push('/admin');
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
    }
  }),
  deleteTournament: thunk(async (actions, payload) => {
    try {
      await api.delete(`/tournament/${payload}`);
      actions.fetchAllTournaments();
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
    }
  }),
  joinTournament: thunk(async (actions, payload) => {
    actions.fetching();
    try {
      const { team_name, team_players } = payload;
      const body = { team_name, team_players };
      await api.post(`/tournament/join/${payload.tournamentId}`, body);
      actions.setErrors([]);
      actions.fetchingDone();
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        actions.setErrors(errors);
        actions.fetchingDone();
      }
    }
  }),
};

export default tournamentModel;
