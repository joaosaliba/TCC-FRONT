<template>
  <div back-rede>
    <Header />
    <SideMenu />

      <router-view class="container-fluid"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import SideMenu from "@/components/SideMenu.vue";


export default {
  name: "ViewAfterLogin",
  components: {
    Header,
    SideMenu,
  },
};
</script>