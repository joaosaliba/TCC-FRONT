<template>
  <div back-rede>
    <div class="form-style">
      <img alt="logo " class="logo" src="../assets/img/logo.svg" />

      <form>
        <div class="mb-1">
          <label for="login">
            <b>Login</b>
          </label>
          <input
            type="email"
            class="form-control input-round"
            id="login"
            aria-describedby="usuario"
            placeholder="Seu login"
            v-model="usuario.email"
          />
          <div class="mb-2"></div>
          <label for="senha">
            <b> Senha</b>
          </label>
          <input
            type="password"
            class="form-control input-round"
            id="senha"
            aria-describedby="senha"
            placeholder="Sua senha"
            v-model="usuario.password"
            @keyup.enter="login"
          />
          <div class="mt-1">
            <b-row>
              <b-col class="text-center">
                <b-spinner v-if="loading"></b-spinner>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="text-left">
                <p class="danger" v-if="!!loginErro">{{ loginErro }}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <a class="a" @click="$bvModal.show('modal-forgot-password')">
                  Esqueceu senha ou Login?
                </a>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <router-link to="/novoUsuario"> Novo Usuário </router-link>
              </b-col>
            </b-row>
            <b-row class="text-center">
              <b-col class="text-center">
                <button type="button" class="btn mb-3" @click.prevent="login()">
                  Entrar
                </button>
              </b-col>
            </b-row>
          </div>
        </div>
      </form>
    </div>
    <ForgotPassword :email="usuario.email" />
  </div>
</template>

<script>
import store from "@/utils/store.js";
import ForgotPassword from "@/components/Geral/ForgotPassword";

export default {
  name: "Login",
  components: { ForgotPassword },
  data() {
    return {
      auth: "",
      usuario: {
        email: "",
        password: "",
      },
      user: {},
      loading: null,
      loginErro: "",
    };
  },
  methods: {
    login() {
      this.loading = true;
      this.loginErro = "";
      this.$store
        .dispatch("logarUsuario", this.usuario)
        .then((response) => {
          this.$store.dispatch("getUsuario");
          this.loading = false;
          let user = this.$store.getters.getUser;
          setTimeout(() => {
            this.$router.push({
              path: "/feed",
              query: { userId: user.id },
            });
          }, 50);
        })
        .catch((erro) => {
          console.log(erro);
          this.loading = false;

          Object.entries(erro.response.data).forEach(([key, a]) => {
            this.loginErro += key + "  :" + a + "\n \n";
          });
        })
        .finally(() => {});
    },
  },
};
</script>

<style scoped>
.danger {
  color: red;
}
.input-round {
  border-radius: 15px;
  height: 50px;
  background-color: #ffffff;
  box-shadow: 0 3px 6px #00000029;
}
.form-style {
  display: grid;
  font-size: 30x;
  padding: 20px 40px 20px 40px;
  background-color: rgba(255, 255, 255, 0.79);
  border-radius: 50px;
  /* opacity: 0.79; */
  max-width: 500px;
  width: auto;
  margin: 10% auto;
  @media screen and (max-width: 400px) {
    width: 80%;
  }
}
.a {
  cursor: pointer;
}
a {
  list-style: none;
  font-size: 30x;
  margin-top: 1%;
  color: #0b4f6c;
  opacity: 1 !important;
}
.logo {
  margin: auto auto;
  position: flex;
  opacity: 1 !important;
}

.btn {
  display: block;
  padding: 10px 30px;
  background-color: #0b4f6c;
  border-radius: 25px;
  color: white;
  text-align: right;
  font-size: 1rem;
  margin: 0 auto;
  margin-right: 0%;
  /* margin-top: 5%; */
  /* box-shadow: 0 4px 8px #00000029; */
  opacity: 1 !important;
}

.btn:hover {
  transform: scale(1.05);
}
.redes {
  padding: 10px 30px;

  display: table-cell;
  margin: auto auto;
  background-color: #ffffff;
  color: #0b4f6c;
  width: 400px;
  text-align: center;
  font: 25px Roboto Black;
  border-color: transparent;
  box-shadow: 0px 3px 6px #00000029;
  opacity: 1 !important;
}
.redesImagens {
  display: table;
  float: left;
  width: 50px;
  opacity: 1 !important;
}
.center {
  margin: auto auto !important;
  margin-top: auto !important;
  margin-bottom: auto !important;
}
</style>
