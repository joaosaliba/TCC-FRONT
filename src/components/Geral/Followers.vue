<template>
  <nav id="followers" class="sideMenu">
    <b-card class="friends-class">
      <b-row class="text-center">
        <b-col>
          <h4>Seguidores</h4>
        </b-col>
      </b-row>

      <hr />
      <div v-if="followersList.length < 1">
        <h4>Nenhum seguidor</h4>
      </div>
      <b-row
        class="mt-4"
        @click="goToPerfil(r)"
        v-for="r in followersList"
        :key="r.id"
        style="cursor: pointer"
      >
        <b-col cols="4" class="text-center">
          <b-avatar :src="r.picture" class="" />
        </b-col>
        <b-col cols="8" class="text-left">
          <h4>{{ r.nome }}</h4>
          <!-- <small> {{ r.user_type }}</small> -->
        </b-col>
      </b-row>
      <b-col class="text-center mt-2" v-if="!!nextPage">
        <a class="fas fa-plus" @click="loadMore()"> Carregar Mais</a></b-col
      >
    </b-card>
  </nav>
</template>

<script>
export default {
  name: "Followers",
  props: ["usuario"],
  components: {},
  data() {
    return {
      user: {},
      followersList: {},
      nextPage: null,
      serachString: "",
    };
  },
  methods: {
    goToPerfil(e) {
      this.$router.push({
        path: "/perfil",
        query: { userId: e.id },
      });
    },
    followers() {
      const vm = this;
      let querys = {
        page: 1,
        itens: 10,
      };

      vm.$api
        .get(`/user/followers/${this.userPerfilID}/`, { params: querys })
        .then((resp) => {
          this.followersList = resp.data.results;
          this.nextPage = resp.data.next;
        });
    },
    loadMore() {
      this.$api.get(`${this.nextPage}`).then((resp) => {
        resp.data.results.forEach((p) => this.followersList.push(p));

        this.nextPage = resp.data.next;
      });
    },
    // listarFollowersNext() {
    //   window.onscroll = () => {
    //     let bottomOfWindow =
    //       document.documentElement.scrollTop + window.innerHeight ===
    //       document.documentElement.offsetHeight;
    //     if (bottomOfWindow && this.nextPage) {
    //       this.loadMore();
    //     }
    //   };
    // },
  },
  computed: {
    userPerfilID() {
      return this.$route.query.userId;
    },
  },
  watch: {
    userPerfilID() {
      this.followers();
    },
  },
  beforeMount() {
    this.followers();
  },
  mounted() {
    // this.listarFollowersNext();

    this.$bus.$on("atualizarFollowers", () => {
      this.followers();
      console.log("ENTROU FLO");
    });
  },
};
</script>

<style scoped >
.sideMenu {
  justify-content: center !important;
  background-color: transparent;
  max-width: 100%;
  width: auto !important;
  overflow-x: hidden;
  overflow-y: auto;
  color: whitesmoke;

  height: 100%;
  overflow-y: auto;
}

.friends-class {
  background-color: #0b4f6c;
  border-radius: 50px;
}
</style>
