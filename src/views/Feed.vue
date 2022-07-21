<template>
  <div back-rede>
    <div class="wrapper" id="feed">
      <div>
        <SideMenu />
      </div>
      <b-card class="feed-class p-4 mt-2">
        <NewPost @atualizarPost="atualizarLista" />
        <PostsList onscroll="getNextUser" ref="postList" />
      </b-card>
    </div>

    <router-view class="container-fluid"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

import SideMenu from "@/components/Geral/SideMenu.vue";
import NewPost from "@/components/Feed/NewPost.vue";
import PostsList from "@/components/Feed/PostsList";

export default {
  name: "ViewAfterLogin",
  components: {
    SideMenu,
    NewPost,
    PostsList,
  },
  methods: {
    atualizarLista() {
      this.$refs["postList"].listarPostsFollowing();
    },
    getNextUser() {
      this.$refs["postList"].listarPostsFollowing();
    },
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 3.5fr 1fr;
}
.feed-class {
  background-color: rgba(255, 255, 255, 0.79);
  border-radius: 50px;
}
</style>