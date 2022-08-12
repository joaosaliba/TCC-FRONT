<template>
  <div back-rede>
    <div id="feed">
      <b-card class="feed-class p-3 mt-2">
        <NewPost @atualizarPost="atualizarLista" />
        <PostsList onscroll="getNextUser" ref="postList" />
      </b-card>
    </div>

    <router-view class="container-fluid"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

import NewPost from "@/components/Feed/NewPost.vue";
import PostsList from "@/components/Feed/PostsList";

export default {
  name: "Feed",
  components: {
    NewPost,
    PostsList,
  },
  methods: {
    atualizarLista() {
      this.$refs["postList"].limparEListarPostsFollowing();
    },
  },
};
</script>
<style >
.feed-class {
  background-color: rgba(255, 255, 255, 0.79);
  border-radius: 50px;
}
</style>