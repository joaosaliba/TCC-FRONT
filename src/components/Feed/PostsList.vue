<template>
  <div id="feed-posts" class="feed">
    <b-card
      border-variant="transparent"
      bg-variant="transparent"
      class="mt-1"
      v-for="(post, index) in posts"
      :key="post.id"
    >
      <b-row>
        <b-col>
          <b-avatar :src="post.created_by.picture" class="mr-4" />

          <b>{{ post.created_by.nome }}</b> postou
        </b-col>

        <b-col class="text-right">
          <small>
            <b>
              {{ post.created_at.split("T")[0].split("-").reverse().join("/") }}
            </b>
          </small>
          <i
            v-if="post.created_by.id == user.id"
            @click="deletePost(post.id)"
            variant="danger"
            class="fas fa-trash danger ml-2"
          />
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

      <b-row>
        <b-col class="text-left">
          <b-btn
            variant="transparent"
            class="fas fa-thumbs-up p-1 like mr-2"
            @click="likePost(post, index, true)"
          >
            {{ post.likes_count }}
          </b-btn>
          <b-btn
            variant="transparent"
            class="fas fa-thumbs-down p-1 danger"
            @click="likePost(post, index, false)"
          >
            {{ post.dislikes_count }}
          </b-btn>
        </b-col>
        <b-col class="text-right">
          <a variant="success" @click="toggleCollapsed(index)">
            <span v-if="collapsed[index]" class="fas fa-minus" />
            <span v-else class="fas fa-plus" />
            Comentarios: {{ post.comments_count }}</a
          >
        </b-col>
      </b-row>
      <b-collapse v-model="collapsed[index]">
        <Comments
          v-if="collapsed[index]"
          @reloadPosts="relaodPost(post, index)"
          ref="comentarios"
          :postID="post.id"
        />
      </b-collapse>
    </b-card>
    <b-col class="text-center mt-2" v-if="!!nextPage">
      <a class="fas fa-plus" @click="loadMore()"> Carregar Mais</a></b-col
    >
  </div>
</template>

<script>
import Comments from "@/components/Comments/Comments";
export default {
  name: "PostsList",
  components: {
    Comments,
  },
  props: ["isProfile"],
  data() {
    return {
      posts: [],
      nextPage: null,
      collapsed: [],
      user: {},
    };
  },
  methods: {
    likePost(post, index, like) {
      const vm = this;
      let param = {
        liked_post: post.id,
        like: like,
      };
      vm.$api
        .post(`likePost/`, param)
        .then((resp) => {
          this.relaodPost(post, index);
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        })
        .finally();
    },
    limparEListarPostsFollowing() {
      this.posts = [];
      this.listarPostsFollowing();
    },
    toggleCollapsed: function (i) {
      this.$set(this.collapsed, i, !this.collapsed[i]);
    },
    deletePost(id) {
      const vm = this;
      vm.$api
        .delete(`post/${id}/`)
        .then((resp) => {
          this.posts = this.posts.filter((p) => p.id != id);
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    relaodPost(post, index) {
      const vm = this;
      vm.$api
        .get(`post/${post.id}/`)
        .then((resp) => {
          post = resp.data;
          this.$set(this.posts, index, post);
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    listarPostsFollowing(id) {
      const vm = this;
      let url = "post/";
      if (id) {
        url += `user/${id}/`;
      }
      this.posts = [];
      vm.$api
        .get(`${url}?page=1&itens=5`)
        .then((resp) => {
          resp.data.results.forEach((p) => this.posts.push(p));
          this.nextPage = resp.data.next;
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    loadMore() {
      this.$api.get(`${this.nextPage}`).then((resp) => {
        resp.data.results.forEach((p) => this.posts.push(p));

        this.nextPage = resp.data.next;
      });
    },
    listarPostsFollowingNext() {
      window.onscroll = () => {
        let bottomOfWindow =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (bottomOfWindow && this.nextPage) {
          this.loadMore();
        }
      };
    },
  },
  computed: {
    userPerfilID() {
      return this.$route.path == "/perfil" ? this.$route.query.userId : null;
    },
  },
  beforeMount() {
    this.listarPostsFollowing(this.userPerfilID);
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
.danger {
  color: red;
  cursor: pointer;
}
.like {
  color: blue;
  cursor: pointer;
}
</style>