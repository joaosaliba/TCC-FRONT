<template>
  <div>
    <div back-rede>
        <div id="autentica">
          <h2>Felicidade ES</h2>

          <div class="mb-1">
            <input
              type="text"
              class="form-control"
              name
              id="login"
              aria-describedby="usuario"
              placeholder="Seu login"
              v-model="usuario.email"
            />
            <div class="mb-1"></div>
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
                Login
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
  padding: 40px 40px 20px 40px;
  background-color: #fff;
  width: 500px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10%;
  border-radius: 30px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  @media screen and (max-width: 400px) {
    width: 80%;
    
  }
  
}
</style>
