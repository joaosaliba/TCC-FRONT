import Vue from "vue";
import Vuex from "vuex";
import { api } from "./api";
import createPersistedState from 'vuex-persistedstate';


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
      cpf: "",
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
        api
        .get("aluno/")
        .then((resp) => {
          context.commit("UPDATE_LOGIN", true);
          context.commit("UPDATE_USUARIO", resp.data[0]);
          console.log(resp.data[0])
        })
        .catch((r) => {
          api.get("professor/").then((resp) => {
            context.commit("UPDATE_LOGIN", true);
            context.commit("UPDATE_ADMIN", true);
            context.commit("UPDATE_USUARIO", resp.data[0]);
            // console.log(this.state.usuario)

          })
        });
    },
    async logarUsuario(context, payload) {
        return await api
        .login({
          email: payload.email,
          password: payload.password,
          device_type: "ANDROID",
          device_id: "device-id-ficticio",
        })
        .then((response) => {
          context.commit("UPDATE_LOGIN", true);
          // context.commit("UPDATE_USUARIO", response.data.user);
         
          window.localStorage.token = `JWT ${response.data.token}`;
          // console.log( window.localStorage.token)
        });
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
    getUser: (state) =>{
      return state.usuario
    },
    
  },
  plugins: [createPersistedState()]
});
