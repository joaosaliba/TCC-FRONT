<template>
  <div v-click-outside="clear">
    <b-row>
      <b-col class="mt-2" cols="1">
        <i class="fas fa-search" />
      </b-col>
      <b-col>
        <b-input
          class="rounded"
          @input="search(serachString)"
          v-model="serachString"
          placeholder="Pesquisar"
        />
      </b-col>
    </b-row>
    <b-card class="list-out" v-if="resposta.length > 0">
      <b-row cols="12">
        <b-col> Users: </b-col>
        <b-col class="text-right">
          <i @click="clear" class="fas fa-times" />
        </b-col>
      </b-row>
      <a @click="goToPerfil(r)" cols="12" v-for="r in resposta" :key="r.id">
        <b-card>
          <b-row cols="12">
            <b-col cols="4">
              <b-avatar :src="r.picture" class="" />
            </b-col>
            <b-col cols="8">
              <h6>{{ r.nome }}</h6>
              <small> {{ r.user_type }}</small>
            </b-col>
          </b-row>
        </b-card>
      </a>
      <b-col class="text-center mt-2" v-if="!!nextPage">
        <a class="fas fa-plus" @click="loadMore()"> Mais</a></b-col
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      serachString: "",
      resposta: [],
      nextPage: null,
    };
  },
  methods: {
    search(serachString) {
      let param = {
        page: 1,
        itens: 2,
        search: serachString,
      };
      this.$api.get(`/user/`, { params: param }).then((resp) => {
        this.resposta = resp.data.results;
        this.nextPage = resp.data.next;
      });
    },
    loadMore() {
      this.$api.get(`${this.nextPage}`).then((resp) => {
        resp.data.results.forEach((p) => this.resposta.push(p));

        this.nextPage = resp.data.next;
      });
    },
    clear() {
      this.resposta = [];
      this.serachString = "";
    },

    goToPerfil(e) {
      this.$router.push({
        path: "/perfil",
        query: { userId: e.id },
      });
      this.clear();
    },
  },
};
</script>

<style scoped>
.list-out {
  position: absolute !important;
  z-index: 4;
  width: 100%;
  max-height: 40vh;
  overflow: auto;
}
.rounded {
  border-radius: 20px !important;
  background-color: #ffffff;
  box-shadow: 0 3px 6px #00000029;
}
</style>