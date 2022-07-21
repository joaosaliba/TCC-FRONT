<template>
  <div id="feed-posts" class="feed">
    <b-card
      border-variant="transparent"
      bg-variant="transparent"
      class="p-4 mt-2"
      v-for="(post, index) in posts"
      :key="post.id"
    >
      <b-row>
        <b-col>
          <b-avatar :src="post.created_by.picture" class="mr-4" />

          <b>{{ post.created_by.nome }}</b> postou
        </b-col>
      </b-row>
      <b-row class="text-left ml-5 mt-2">
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
      <b-row class="text-left">
        <b-col>
          <a variant="success" @click="toggleCollapsed(index)">
            <span v-if="collapsed[index]" class="fas fa-minus" />
            <span v-else class="fas fa-plus" />
            Comentarios</a
          >
        </b-col>
      </b-row>
      <b-collapse v-model="collapsed[index]">
        <Comments v-if="collapsed[index]" ref="comentarios" :postID="post.id" />
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import Comments from "@/components/Comments/Comments";
export default {
  name: "PostsList",
  components: {
    Comments,
  },
  data() {
    return {
      posts: [],
      collapsed: [],
    };
  },
  methods: {
    limparEListarPostsFollowing() {
      this.posts = [];
      this.listarPostsFollowing();
    },
    toggleCollapsed: function (i) {
      this.$set(this.collapsed, i, !this.collapsed[i]);
    },
    listarPostsFollowing() {
      const vm = this;

      vm.$api
        .get("post/?page=1&itens=4")
        .then((resp) => {
          resp.data.results.forEach((p) => this.posts.push(p));
          this.nextPage = resp.data.next;
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    listarPostsFollowingNext() {
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
    this.listarPostsFollowingNext();
  },
};
</script>

<style scoped>
.feed {
  overflow: auto;
}
.imgPost {
  border-radius: 3rem;
  max-width: 400px;
  width: auto;
  max-height: 300px;
  height: auto;
  justify-content: center;
}
</style>