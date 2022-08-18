<template>
  <div>
    <b-modal
      class="form-style"
      id="new-form"
      title="Novo Formulário"
      hide-footer
    >
      <b-row>
        <b-col>
          <label>Descrição:</label>
          <b-input-group id="1" prepend="Título" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input required v-model="form.title" />
          </b-input-group>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col>
          <b-input-group id="2" prepend="Link" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input required type="url" v-model="form.link" />
          </b-input-group>
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
      form: {
        title: "",
        link: "",
      },
    };
  },
  methods: {
    salvar() {
      if (
        !(
          this.form.link.includes("http://") ||
          this.form.link.includes("https://")
        )
      ) {
        this.form.link = "http://" + this.form.link;
      }

      this.$emit("salvar", this.form);
      this.$bvModal.hide("new-form");
    },
  },
};
</script>

<style>
</style>