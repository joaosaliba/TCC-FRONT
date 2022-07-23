<template>
  <div>
    <b-modal id="modal-forgot-password" hide-footer>
      <template #modal-title> Esqueci minha senha </template>
      <div class="d-block text-center">
        <h5>Digite seu email para resetar sua senha!</h5>
        <b-input type="email" v-model="email" />
      </div>
      <b-button
        class="mt-3"
        variant="success"
        block
        @click="sendRequestPasswordReset()"
        >Enviar</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  props: ["email"],
  data() {
    return {};
  },
  methods: {
    sendRequestPasswordReset() {
      this.$api.post(`api/password_reset/`, { email: this.email }).then(() => {
        this.$bvModal.hide("modal-forgot-password");
      });
    },
  },
};
</script>

<style>
</style>