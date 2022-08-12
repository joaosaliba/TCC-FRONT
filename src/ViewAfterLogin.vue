<template>
  <div back-rede>
    <Header />
    <div class="wrapper">
      <div>
        <SideMenu />
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Geral/Header.vue";
import SideMenu from "@/components/Geral/SideMenu.vue";

export default {
  name: "ViewAfterLogin",
  components: {
    Header,
    SideMenu,
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 20% 70% 10%;
}
</style>