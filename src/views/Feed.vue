<template>
  <div back-rede>
    <div class="wrapper" >
    <div>
      <SideMenu />
    </div>
    <div>

    <FeedComponent />
    </div>
    </div>

      <router-view class="container-fluid"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

import SideMenu from "@/components/SideMenu.vue";
import FeedComponent from "@/components/FeedComponent.vue";



export default {
  name: "ViewAfterLogin",
  components: {
    SideMenu,
    FeedComponent,
  },
};
</script>
<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: 1fr 3.5fr 1fr;
}

</style>