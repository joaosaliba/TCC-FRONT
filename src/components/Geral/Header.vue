<template>
  <header>
    <nav>
      <router-link to="/feed" class="logo">
        <img alt="logo " src="@/assets/img/logo.svg" />
      </router-link>
      <div v-for="(item, index) in items" :key="index">
        <b-btn
          pill
          :class="{ selecionado: item.rota == $route.path }"
          @click="irPara(item.rota)"
        >
          {{ item.nome }}
        </b-btn>
      </div>

      <router-link to="/login">
        <b-btn class="btn" @click="logout()">Logout</b-btn>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      items: [
        { nome: "Feed", rota: "/feed" },
        { nome: "Perfil", rota: "/perfil" },
        { nome: "Forum", rota: "/forum" },
        { nome: "Grupos", rota: "/grupos" },
        { nome: "Formulários", rota: "/formularios" },
      ],
    };
  },

  methods: {
    irPara(rota) {
      this.$router.push({
        path: rota,
      });
    },

    logout() {
      this.$store.dispatch("logOutUsuario").then((response) => {
        this.$router.push({
          path: "/login",
        });
      });
    },
  },
};
</script>

<style scoped>
.btn {
  display: block;
  padding: 10px 30px;
  background-color: transparent !important;
  color: #0b4f6c;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 0 0;
  cursor: pointer;
  border: 0px;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  box-shadow: 3px 3px 80px #00000029;
  background-color: #e6c94c;
}

.logo {
  padding: 1px 3px;
}

.logo img {
  top: 33px;
  left: 48px;
  width: 239px;
  height: 42px;
}
.selecionado {
  background-color: rgba(255, 255, 255, 0.79) !important;
  color: #0b4f6c !important;
  font-weight: bold;
}
</style>
