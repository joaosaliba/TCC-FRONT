<template>
  <div>
    <NewComment
      @atualizaListaComentarios="atualizaListaComentarios"
      :postID="postID"
    />
    <CommentsList ref="commentsList" :postID="postID" />
  </div>
</template>

<script>
import CommentsList from "@/components/Comments/CommentsList";
import NewComment from "@/components/Comments/NewComment";
export default {
  name: "Comments",
  components: {
    CommentsList,
    NewComment,
  },
  props: ["postID"],
  methods: {
    atualizaListaComentarios() {
      this.$refs.commentsList.buscarComentariosDoPost();
      this.$emit("reloadPosts");
    },
  },
};
</script>

<style>
</style>