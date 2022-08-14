<template>
  <div>
    <div id="feed">
      <b-card class="perfil-class p-4 mt-2">
        <PostsList onscroll="getNextUser" ref="postList" />
      </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PostsList from "@/components/Post/PostsList";

export default {
  name: "Perfil",
  components: { PostsList },
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