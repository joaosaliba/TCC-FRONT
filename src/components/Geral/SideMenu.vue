<template>
  <div class="sideMenu">
    <!-- <b-col cols="1" class="justify-content-center mt-5"> -->
    <div class="foto-perfil">
      <img :src="user.picture" alt="foto-perfil mb-4" />
    </div>
    <div>
      <h4>{{ user.nome }}</h4>
    </div>
    <div>
      <h5>{{ user.user_type }}</h5>
    </div>
    <div v-if="user.id == userLogado.id">
      <b-btn @click="showModal()" class="btn-clear"> Editar Perfil </b-btn>
    </div>
    <div v-else>
      <b-btn
        @click="follow(user)"
        :variant="atualUserAtualSegue ? 'outline-danger' : 'outline-success'"
      >
        {{ atualUserAtualSegue ? "Unfollow" : "Follow" }}
      </b-btn>
    </div>
    <i class="fas fa-user mt-2" /> {{ user.profile.follower_count }}

    <!-- <div class="box">
      <h2>Forúm</h2>
      <b-row class="justify-content-start"> Teste </b-row>
      <b-row> Teste </b-row>
      <b-row> Teste </b-row>
      <h2>Meus Grupo</h2>
      <b-row> Teste </b-row>
      <b-row> Teste </b-row>
      <b-row> Teste </b-row>
      <h2>Formulários</h2>
    </div> -->
    <!-- </b-col> -->

    <ModalEditarPerfil @buscarDados="buscarDados()" />
  </div>
</template>

<script>
import store from "@/utils/store.js";
import ModalEditarPerfil from "@/components/Geral/ModalEditarPerfil.vue";

export default {
  name: "SideMenu",
  props: ["usuario"],
  components: {
    ModalEditarPerfil,
  },
  data() {
    return {
      user: {
        picture: null,
      },
      userLogado: {},
    };
  },
  methods: {
    follow(user) {
      const vm = this;
      let obj = {
        followin: user.id,
      };
      vm.$api.post(`/follow/`, obj).then((resp) => {
        this.pegarUsuario();
      });
    },
    pegarUsuario() {
      const vm = this;
      vm.$api
        .get(`user/${this.userPerfilID}/`)
        .then((resp) => {
          this.user = resp.data;
        })
        .catch((r) => {});
    },
    async buscarDados() {
      await this.$store.dispatch("getUsuario");
      this.userLogado = store.getters.getUser;
    },

    showModal() {
      this.$bvModal.show("modal-perfil");
    },
  },
  computed: {
    atualUserAtualSegue() {
      return this.user.profile.follower.includes(this.userLogado.email);
    },
    userPerfilID() {
      return this.$route.query.userId;
    },
  },
  mounted() {
    this.pegarUsuario();
    this.buscarDados();
  },
  // computed:{
  //   user(){

  //     return store.getters.getUser
  //   }
  // },
};
</script>

<style>
.sideMenu {
  margin: 3% 10px 10px 10px;
  position: relative;
  text-align: center;
  z-index: 2;
  background-color: transparent;
  max-width: 250px;
  width: auto;
  overflow-x: hidden;
  overflow-y: auto;
  color: #0b4f6c;
}
.box {
  padding: 10 10;
  margin-left: 10%;
  margin-top: 10%;
  text-align: left;
  align-items: center;
}
.foto-perfil {
  display: flex;
  border-radius: 15px;
  padding: 10px 10px;
  max-width: 240px;
  width: auto;
  max-height: 240px;
  height: auto;
  justify-content: center;

  background-color: rgba(255, 255, 255);
}
.foto-perfil img {
  border-radius: 15px;
  max-width: 220px;
  max-height: 220px;
  height: auto;
  width: auto;
}
.btn-clear {
  background-color: transparent;
  color: #0b4f6c;
  border-color: transparent;
  padding: 0;
  font-size: 18px;
}
.btn-clear:hover {
  text-decoration: underline;
  background-color: transparent;
  color: #0b4f6c;
  border-color: transparent;
  padding: 0;
  font-size: 18px;
}
.btn-clear:focus {
  text-decoration: underline;
  background-color: transparent;
  color: #0b4f6c;
  border-color: transparent;
  padding: 0;
  font-size: 18px;
  box-shadow: none;
}
.btn-clear:active {
  text-decoration: underline;
  background-color: transparent;
  color: #0b4f6c;
  border-color: transparent;
  padding: 0;
  font-size: 18px;
  box-shadow: none;
}
</style>
