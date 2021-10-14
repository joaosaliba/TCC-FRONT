<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "App",
  components: {
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
@import "assets/css/main.css";

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
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
