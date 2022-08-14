<template>
  <div back-rede>
    <Header />
    <div class="wrapper">
      <div>
        <SideMenu />
      </div>
      <router-view />
      <div>
        <Followers v-if="$route.path == '/feed' || $route.path == '/perfil'" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Geral/Header.vue";
import SideMenu from "@/components/Geral/SideMenu.vue";
import Followers from "@/components/Geral/Followers";

export default {
  name: "ViewAfterLogin",
  components: {
    Header,
    SideMenu,
    Followers,
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 20% 58% 20%;
}
</style>