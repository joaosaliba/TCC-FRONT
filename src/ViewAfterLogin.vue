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
    <ModalHanking />
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Geral/Header.vue";
import SideMenu from "@/components/Geral/SideMenu.vue";
import Followers from "@/components/Geral/Followers";
import ModalHanking from "@/components/Geral/ModalHanking";

export default {
  name: "ViewAfterLogin",
  components: {
    Header,
    SideMenu,
    Followers,
    ModalHanking,
  },
  mounted() {
    let modalHanking = this.$route.query.modalHanking;
    if (modalHanking) {
      this.$bvModal.show("modal-hanking");
    }
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 20% 58% 20%;
}
</style>