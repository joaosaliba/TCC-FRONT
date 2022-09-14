<template>
  <nav class="sideMenu text-center">
    <!-- <b-col cols="1" class="justify-content-center mt-5"> -->
    <div>
      <b-btn
        class="my-1"
        v-if="userLogado.user_type == 'Professor'"
        @click="changeUserType(user)"
        :variant="userIsProfessor ? 'outline-danger' : 'outline-success'"
        size="sm"
        pill
      >
        {{ user.user_type }}
      </b-btn>
      <div class="foto-perfil">
        <img :src="user.picture" alt="foto-perfil " />
      </div>
      <h5>{{ user.user_type }}</h5>
      <h4><b>Nome:</b>{{ user.nome }}</h4>
      <h6><b>Email:</b>{{ user.email }}</h6>

      <h5 v-if="user.profile.birthdate">
        <b>Idade:</b>
        {{
          idade(
            user.profile.birthdate.split("-")[0],
            user.profile.birthdate.split("-")[2],
            user.profile.birthdate.split("-")[2]
          )
        }}
        anos
      </h5>

      <div>
        <b-btn
          v-if="user.id == userLogado.id"
          @click="showModal()"
          class="btn-clear"
        >
          Editar Perfil
        </b-btn>

        <b-btn
          v-else
          @click="follow(user)"
          :variant="atualUserAtualSegue ? 'outline-danger' : 'outline-success'"
        >
          {{ atualUserAtualSegue ? "Unfollow" : "Follow" }}
        </b-btn>
      </div>
      <i class="fas fa-user mt-2" /> {{ user.profile.follower_count }}
    </div>
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
  </nav>
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
        profile: {
          follower: 0,
          birthdate: null,
        },
      },
      userLogado: {},
    };
  },
  methods: {
    idade(ano, mes, dia) {
      var d = new Date(),
        ano_atual = d.getFullYear(),
        mes_atual = d.getMonth() + 1,
        dia_atual = d.getDate(),
        ano_aniversario = +ano,
        mes_aniversario = +mes,
        dia_aniversario = +dia,
        quantos_anos = ano_atual - ano_aniversario;

      if (
        mes_atual < mes_aniversario ||
        (mes_atual == mes_aniversario && dia_atual < dia_aniversario)
      ) {
        quantos_anos--;
      }

      return quantos_anos < 0 ? 0 : quantos_anos;
    },
    follow(user) {
      const vm = this;
      let obj = {
        followin: user.id,
      };
      vm.$api.post(`/follow/`, obj).then((resp) => {
        this.$bus.$emit("atualizarFollowers");
        this.pegarUsuario();
      });
    },
    async pegarUsuario() {
      const vm = this;
      await vm.$api
        .get(`user/${this.userPerfilID}/`)
        .then((resp) => {
          return (this.user = resp.data);
        })
        .catch((r) => {});
    },
    async buscarDadosUser() {
      await this.$store.dispatch("getUsuario");
      this.userLogado = store.getters.getUser;
    },
    async buscarDados() {
      await this.buscarDadosUser();
      this.pegarUsuario();
    },
    showModal() {
      this.$bvModal.show("modal-perfil");
    },
    changeUserType(user) {
      const vm = this;

      user.user_type = user.user_type == "Professor" ? "Aluno" : "Professor";
      let data = new FormData();
      data.append("user_type", user.user_type);
      vm.$api
        .patch("user/" + user.id + "/", data)
        .then((resp) => {
          console.log(resp);
          this.pegarUsuario();
        })
        .catch((e) => {});
    },
  },
  computed: {
    atualUserAtualSegue() {
      return this.user.profile.follower.length > 0
        ? this.user.profile.follower.includes(this.userLogado.email)
        : false;
    },
    userIsProfessor() {
      return this.user.user_type == "Professor";
    },
    userPerfilID() {
      return this.$route.query.userId;
    },
  },
  watch: {
    userPerfilID() {
      this.buscarDados();
    },
  },
  mounted() {
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
  justify-content: center !important;
  z-index: 2;
  background-color: transparent;
  max-width: 100%;
  width: auto;
  overflow-x: hidden;
  overflow-y: auto;
  color: #0b4f6c;

  margin: 2% 5% 0% 5%;
}
@media screen {
}
.box {
  padding: 10 10;
  text-align: center;
  align-items: center;
}
.foto-perfil {
  border-radius: 5%;
  padding: 3% 3%;
  max-width: 285px;
  width: auto;
  max-height: 285px;
  height: auto;

  justify-content: center;
  margin: auto;
  background-color: rgba(255, 255, 255);
}
.foto-perfil img {
  border-radius: 5%;
}
.btn-clear {
  background-color: transparent;
  color: #0b4f6c;
  border-color: transparent;
  padding: 0;
  font-size: 100%;
}
.btn-clear:hover {
  text-decoration: underline;
  background-color: transparent;
  color: #0b4f6c;
  border-color: transparent;
  padding: 0;
  font-size: 100%;
}
.btn-clear:focus {
  text-decoration: underline;
  background-color: transparent;
  color: #0b4f6c;
  border-color: transparent;
  padding: 0;
  font-size: 100%;
  box-shadow: none;
}
.btn-clear:active {
  text-decoration: underline;
  background-color: transparent;
  color: #0b4f6c;
  border-color: transparent;
  padding: 0;
  font-size: 100%;
  box-shadow: none;
}
</style>
