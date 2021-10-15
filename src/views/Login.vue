<template>
  <div>
    <div back-rede>
    <img alt="logo " class="logo" src="../assets/img/logo.svg">
    
       <div id="autentica">

          <div class="mb-1">
           <label for="login">
             <b>Login</b>
           </label>
            <input
              type="text"
              class="form-control"
              name
              id="login"
              aria-describedby="usuario"
              placeholder="Seu login"
              v-model="usuario.email"
            />
            <div class="mb-2"></div>
                 <label for="senha">
             <b> Senha</b>
           </label>
            <input
              type="password"
              class="form-control"
              name
              id="senha"
              aria-describedby="senha"
              placeholder="Sua senha"
              v-model="usuario.password"
              @keyup.enter="login"
            />
            <div class="mt-1" >
              <button
                type="button"
                class="btn"
                @click.prevent="login()"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      auth: "",
      usuario: {
        email: "",
        password: "",
        device_type:"ANDROID",
        device_id:"device-id-ficticio"
      },
    };
  },
  methods:{
    login(){
      this.$store.dispatch("logarUsuario",this.usuario).then(response=>{
         this.$store.dispatch("getUsuario")
         this.$router.push({
           path: '/home',
         })
      })
    }
  }
};
</script>

<style scoped>
#autentica {
  font-size: 16px;
  padding: 20px 40px 20px 40px;
  background-color: #fff;
  width: 500px;
  text-align: left;
  margin: 0 auto;
  margin-top: 1%;
  border-radius: 50px;
  opacity: 0.79;
  
  
}
.logo{
  margin-top: 5%;
  margin-left: 42%;
  text-align: center;
  position: flex;
}

.btn{
    display: block;
    padding: 10px 30px;
    background-color: #0B4F6C;
    border-radius: 4px;
    color: white;
    text-align: right;
    font-size: 1rem;
    /* box-shadow: 0 4px 8px #00000029; */
}
.btn:hover{
  transform: scale(1.1);
}
</style>
