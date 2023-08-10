// store/index.js
import { createStore } from 'vuex';
import auth from './auth';

const store = createStore({
  modules: {
    auth
  }
  // ... state, mutations, actions lainnya
});

export default store;
