<template>
  <div>
    <div class="wrapper" id="feed">
      <div>
        <SideMenu />
      </div>
      <b-card class="perfil-class p-4 mt-2">
        <PostsList onscroll="getNextUser" ref="postList" />
      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PostsList from "@/components/Feed/PostsList";
import SideMenu from "@/components/Geral/SideMenu.vue";

export default {
  name: "Perfil",
  components: { PostsList, SideMenu },
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 3.5fr 1fr;
}
.perfil-class {
  background-color: rgba(255, 255, 255, 0.79);
  border-radius: 50px;
}
</style>