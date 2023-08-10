// store/auth/index.js
const state = {
    authToken: null,
    user: null
  };
  
  const mutations = {
    setAuthToken(state, token) {
      state.authToken = token;
    },
    setUser(state, user) {
      state.user = user;
    },
    clearAuth(state) {
      state.authToken = null;
      state.user = null;
    }
  };
  
  const actions = {
    login({ commit }, { token, user }) {
      commit('setAuthToken', token);
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('clearAuth');
      // Mengatur token ke null saat logout
      commit('setAuthToken', null);
    }
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  };
  