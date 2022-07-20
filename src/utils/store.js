import Vue from "vue";
import Vuex from "vuex";
import { api } from "./api";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    admin: false,
    usuario: {
      id: "",
      nome: "",
      email: "",
      birthdate: "",
      phonenumber: "",
      picture: "",
      user_type: "",
    },
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USUARIO(state, payload) {
      state.usuario = payload;
    },
    UPDATE_ADMIN(state, payload) {
      state.admin = payload;
    },
  },
  actions: {
    getUsuario(context) {
      let userId = context.getters.getUser.id;

      api
        .get(`user/${userId}/`)
        .then((resp) => {
          context.commit("UPDATE_LOGIN", true);

          context.commit("UPDATE_USUARIO", resp.data);
        })
        .catch((r) => {
          console.error(r);
        });
    },
    async logarUsuario(context, payload) {
      return await api
        .login({
          email: payload.email,
          password: payload.password,
        })
        .then((response) => {
          context.commit("UPDATE_LOGIN", true);
          context.commit("UPDATE_USUARIO", response.data.user);

          window.localStorage.token = `JWT ${response.data.token}`;
          // console.log( window.localStorage.token)
        })
        .catch(() => context.commit("UPDATE_LOGIN", false));
    },

    logOutUsuario(context) {
      context.commit("UPDATE_USUARIO", {
        usuario: {
          id: "",
          nome: "",
          email: "",
          birthdate: "",
          phonenumber: "",
          picture: "",
          user_type: "",
          cpf: "",
        },
      });

      context.commit("UPDATE_LOGIN", false);
      context.commit("UPDATE_ADMIN", false);
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("logged");
    },
  },
  getters: {
    isLogged: (state) => {
      return state.login;
    },
    isAdmin: (state) => {
      return state.admin;
    },
    getUser: (state) => {
      return state.usuario;
    },
  },
  plugins: [createPersistedState()],
});
