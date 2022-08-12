<template>
  <div id="app" back-rede>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "App",
  components: {},
};
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
@import "assets/css/main.css";
@import "~@/assets/fonts/fontawesome/css/all.css";

* {
  box-sizing: border-box;
}
body,
ul,
li,
h1,
h2,
p {
  padding: 0px;
  margin: 0;
}
ul {
  list-style: none;
}
body {
  font-family: sans-serif;
}
a {
  list-style: none;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}
</style>
