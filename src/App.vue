<template>
  <div id="app">
    <!-- <div id="nav">
      Felicidade
      <router-link to="/">Feed</router-link> |
      <router-link to="/about">Perfil</router-link> | 
      <router-link to="/about">Grupos</router-link>  |
      <router-link to="/about">Formulários</router-link>  |
      <router-link to="/about">SEARCH</router-link>  |

      <router-link to="/about">Login/Logout</router-link>  


    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
@import "assets/css/main.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
