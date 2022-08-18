<template>
  <div>
    <b-col class="text-right mb-4">
      <b-btn
        @click="newFormAdd"
        pill
        style="background-color: #0b4f6c; color: white"
        size="lg"
        v-if="isAdmin"
      >
        Novo Formulário
      </b-btn>
    </b-col>
    <b-col class="text-center mt-4" v-for="form in formList" :key="form.id">
      <h3 style="color: #0b4f6c">
        <i size="lg" class="fas fa-file mr-4" style=""></i>{{ form.title }}
      </h3>

      <a>
        <b-btn size="lg" pill class="botao-azul" @click="goto(form.link)">
          Abrir</b-btn
        >
      </a>
    </b-col>
    <b-row class="text-center">
      <b-col>
        <a v-if="!!nextPage" @click="loadMore()"> Carregar mais</a>
      </b-col>
    </b-row>
    <NewForm @salvar="newform" />
  </div>
</template>

<script>
import NewForm from "@/components/Forms/NewForm";
export default {
  name: "FormsLists",
  components: { NewForm },
  data() {
    return {
      formList: [],
      nextPage: null,
      isAdmin: false,
    };
  },
  methods: {
    newform(form) {
      const vm = this;
      vm.$api.post(`/forms/`, form).then((resp) => {
        this.getFormList();
      });
    },
    newFormAdd() {
      this.$bvModal.show("new-form");
    },
    goto(link) {
      if (!(link.includes("http://") || link.includes("https://"))) {
        this.form.link = "http://" + this.form.link;
      }
      window.open(link);
    },
    getFormList() {
      const vm = this;
      let querys = {
        page: 1,
        itens: 10,
      };

      vm.$api.get(`/forms/`, { params: querys }).then((resp) => {
        this.formList = resp.data.results;
        this.nextPage = resp.data.next;
      });
    },
    loadMore() {
      this.$api.get(`${this.nextPage}`).then((resp) => {
        resp.data.results.forEach((p) => this.formList.push(p));

        this.nextPage = resp.data.next;
      });
    },
  },
  mounted() {
    this.getFormList();
    this.isAdmin = this.$store.getters.isAdmin;
  },
};
</script>

<style scoped>
.botao-azul {
  background-color: #0b4f6c !important;
  color: white;
  border-color: #0b4f6c !important;

  font-size: 1rem;
}

.botao-azul:hover {
  transform: scale(1.05);
}
</style>