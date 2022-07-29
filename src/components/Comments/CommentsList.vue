<template>
  <div>
    <div
      class="list-group pl-5 mt-2"
      v-for="(comment, index) in comments"
      :key="comment.id"
    >
      <b-row>
        <b-col>
          <b-avatar :src="comment.commented_by.picture" class="mr-4" />

          <b>{{ comment.commented_by.nome }}</b> comentou
        </b-col>
        <b-col v-if="comment.commented_by.id == user.id" class="text-right">
          <i
            @click="deleteComment(comment.id)"
            variant="danger"
            class="fas fa-trash fa danger"
            size="sm"
          />
        </b-col>
      </b-row>
      <b-row class="text-left ml-5">
        <b-col>
          {{ comment.comment }}
        </b-col>
      </b-row>
      <b-img
        v-if="comment.comment_image"
        center
        :src="comment.comment_image"
        :blank="comment.comment_image ? false : true"
        class="imgComment"
        thumbnail
      />
      <b-col class="text-left">
        <b-btn
          variant="transparent"
          class="fas fa-thumbs-up p-1 like mr-2"
          @click="likeComment(comment, index, true)"
        >
          {{ comment.likes_count }}
        </b-btn>
        <b-btn
          variant="transparent"
          class="fas fa-thumbs-down p-1 danger"
          @click="likeComment(comment, index, false)"
        >
          {{ comment.dislikes_count }}
        </b-btn>
      </b-col>
    </div>
    <b-row class="text-center">
      <b-col>
        <a v-if="!!nextPage" @click="carregarMais()"> Carregar mais</a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "CommentsList",
  props: ["postID"],

  data() {
    return {
      comments: [],
      nextPage: null,
      user: {},
    };
  },
  methods: {
    likeComment(comment, index, like) {
      const vm = this;
      let param = {
        liked_comment: comment.id,
        like: like,
      };
      vm.$api
        .post(`likeComment/`, param)
        .then((resp) => {
          this.relaodComment(comment, index);
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        })
        .finally();
    },
    relaodComment(comment, index) {
      const vm = this;
      vm.$api
        .get(`comments/${comment.id}/`)
        .then((resp) => {
          comment = resp.data;
          this.$set(this.comments, index, comment);
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    deleteComment(id) {
      const vm = this;
      vm.$api
        .delete(`comments/${id}/`)
        .then((resp) => {
          this.comments = this.comments.filter((c) => c.id != id);
        })
        .catch((e) => {
          vm.$refs["alerta"].mostraErroSimples("Erro", e.response.data);
        });
    },
    async carregarMais() {
      return await this.$api.get(`${this.nextPage}`).then((resp) => {
        resp.data.results.forEach((c) => this.comments.push(c));
        this.nextPage = resp.data.next;
      });
    },
    async buscarComentariosDoPost() {
      this.comments = [];
      return await this.$api
        .get(`/comments/postComments/${this.postID}/?page=1&itens=3`)
        .then((resp) => {
          this.nextPage = resp.data.next;
          resp.data.results.forEach((c) => this.comments.push(c));
        });
    },
  },
  async beforeMount() {
    await this.buscarComentariosDoPost();
    this.user = this.$store.getters.getUser;
  },
};
</script>

<style  scoped>
.imgComment {
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