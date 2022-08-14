<template>
  <div>
    <b-modal id="new-forum" title="Novo Fórum" hide-footer>
      <b-row>
        <b-col>
          <label>Descrição:</label>
          <b-input v-model="descricao" />
        </b-col>
      </b-row>
      <b-row class="mt-2 text-center" align-h="around">
        <b-col cols="4">
          <b-btn variant="outline-danger"> Cancelar</b-btn>
        </b-col>
        <b-col cols="4">
          <b-btn
            pill
            style="background-color: #0b4f6c; color: white"
            @click="salvar"
          >
            Salvar
          </b-btn>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "NewForum",
  data() {
    return {
      descricao: "",
    };
  },
  methods: {
    salvar() {
      this.$emit("salvar", this.descricao);
      this.$bvModal.hide("new-forum");
    },
  },
};
</script>

<style>
</style>