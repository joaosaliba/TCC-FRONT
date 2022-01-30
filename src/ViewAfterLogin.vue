<template>
  <div back-rede>
    <Header />
      <router-view />

  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";

export default {
  name: "ViewAfterLogin",
  components: {
    Header,    
  },
};
</script>
