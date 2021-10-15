<template>
  <header>
    <nav>
      <router-link to="/home" class="logo">
        <img alt="logo " src="../assets/img/logo.svg" />
      </router-link>
      <router-link to="/login">
        Feed
      </router-link>
      <router-link to="/login">
        Perfil
      </router-link>
      <router-link to="/login">
        Grupos
      </router-link>
      <router-link to="/login">
        Formulários
      </router-link>
      <router-link to="/login"  >
        <b-btn class="btn" @click=" logout()">Logout</b-btn>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods:{
     logout(){
      this.$store.dispatch("logOutUsuario").then(response=>{
        console.log("deu")
         this.$router.push({
           path: '/login',
         })
      })
    }
  }
};
</script>

<style scoped>
.btn {
  display: block;
  padding: 10px 30px;
  background-color: #0b4f6c;
  border-radius: 4px;
  color: white;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 4px 8px #00000029;
  cursor: pointer;
}

nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
  box-shadow: 3px 3px 80px #00000029;
  background-color: #e6c94c;
}

.logo {
  padding: 1px 3px;
}

.logo img {
  top: 33px;
  left: 48px;
  width: 239px;
  height: 42px;
}
</style>
