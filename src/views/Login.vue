<template>
  <div>
    <div back-rede>
    <img alt="logo " id="logo" src="../assets/img/logo.svg">
    
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
            <div class="mt-1" id="botaoAutenticar">
              <button
                type="button"
                class="btn btn-primary btn-block"
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
           name: "Home"
         })
      })
    }
  }
};
</script>

<style>
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
#logo{
  margin-top: 66px;
  text-align: center;
  position: relative;
}
#botaoAutenticar{
  border-radius: 52px;
  width: 80px;
  background-color: #0B4F6C;
}
</style>
