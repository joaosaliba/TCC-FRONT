<template>
  <div id="feed-posts" class="feed">
    <div variant="transparent" class="p-4" v-for="post in posts" :key="post.id">
      <b-row>
        <b-col>
          <b-avatar :src="post.created_by.picture" class="mr-4" />

          <b>{{ post.created_by.nome }}</b> postou
        </b-col>
      </b-row>
      <b-row class="text-center m-2">
        <b-col>
          {{ post.body }}
        </b-col>
      </b-row>
      <b-img
        v-if="post.post_image"
        center
        :src="post.post_image"
        :blank="post.post_image ? false : true"
        class="imgPost"
        thumbnail
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "PostsList",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    listarPostsFollowing() {
      const vm = this;

      vm.$api
        .get("post/?itens=6")
        .then((resp) => {
          this.posts = resp.data.results;
          this.nextPage = resp.data.next;
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    getNextUser() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && this.nextPage) {
          console.log(this.nextPage);
          this.$api.get(`${this.nextPage}`).then((resp) => {
            resp.data.results.forEach((p) => this.posts.push(p));

            this.nextPage = resp.data.next;
          });
        }
      };
    },
  },
  beforeMount() {
    this.listarPostsFollowing();
  },
  mounted() {
    this.getNextUser();
  },
};
</script>

<style scoped>
.feed {
  overflow: auto;
}
.imgPost {
  border-radius: 3rem;
  max-width: 340px;
  width: auto;
  max-height: 240px;
  height: auto;
  justify-content: center;
}
</style>