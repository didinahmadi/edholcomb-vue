import Vue from "vue";
import Vuex from "vuex";
import Auth from "../models/Auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      token: "",
      user: {},
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.auth.user.id,
  },

  mutations: {
    setToken(state, token) {
      state.auth.token = token;
    },
    setUser(state, user) {
      state.auth.user = user;
    },
    removeAuth(state) {
      return Auth.logout().then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("stopLogin");
        state.auth = {
          token: "",
          user: {},
        };          
        window.location.replace('/logout');
      });
    },
  },
});
