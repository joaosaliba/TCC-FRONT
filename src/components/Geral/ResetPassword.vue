<template>
  <div>
    <b-card class="form-style">
      <img alt="logo " class="logo" src="@/assets/img/logo.svg" />
      <label> Digite a nova senha:</label>
      <b-input v-model="password" type="password" />
      <b-row class="mt-4">
        <b-col class="text-right">
          <b-btn variant="danger" @click="pushToLogin">Cancelar</b-btn>
        </b-col>
        <b-col class="text-left">
          <b-btn variant="success" @click="saveNewPassword">Salvar</b-btn>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return { password: "", token: "" };
  },
  mounted() {
    this.token = this.$route.query.token;
  },
  methods: {
    pushToLogin() {
      this.$router.push({
        path: "/login",
      });
    },
    saveNewPassword() {
      const vm = this;
      let params = {
        password: this.password,
        token: this.token,
      };
      vm.$api.post("api/password_reset/confirm/", params).then((resp) => {
        this.pushToLogin();
      });
    },
  },
};
</script>

<style scoped>
.form-style {
  display: grid;
  padding: 20px 40px 20px 40px;
  background-color: rgba(255, 255, 255, 0.79);
  border-radius: 50px;
  width: 400px;
  margin: 10% auto;
  vertical-align: middle;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  @media screen and (max-width: 400px) {
    width: 80%;
  }
}
</style>