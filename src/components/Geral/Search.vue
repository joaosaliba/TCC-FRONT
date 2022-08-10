<template>
  <div>
    <b-row>
      <b-col class="mt-2" cols="1">
        <i class="fas fa-search" />
      </b-col>
      <b-col>
        <b-input
          @input="search(serachString)"
          v-model="serachString"
          placeholder="Pesquisar"
        />
      </b-col>
    </b-row>
    <b-card class="list-out" v-if="resposta.length > 0">
      <b-row cols="12">
        <b-col class="text-right">
          <i @click="resposta = []" class="fas fa-times" />
        </b-col>
      </b-row>
      <a
        class="mb-2"
        @click="goToPerfil(r)"
        cols="12"
        v-for="r in resposta"
        :key="r.id"
      >
        <b-row cols="12">
          <b-col cols="4">
            <b-avatar :src="r.picture" class="" />
            <small> {{ r.user_type }}</small>
          </b-col>
          <b-col>
            <h5 class="mt-2">{{ r.nome }}</h5>
          </b-col>
        </b-row>
        <b-row> </b-row>
      </a>
      <b-col class="text-center mt-2" v-if="!!nextPage">
        <a class="fas fa-plus" @click="loadMore()"> Carregar Mais</a></b-col
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
    goToPerfil(e) {
      this.$router.push({
        path: "/perfil",
        query: { userId: e.id },
      });
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
</style>