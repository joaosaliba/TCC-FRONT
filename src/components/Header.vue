<template>
  <header>
    <nav>
         <router-link to="/feed" class="logo">
        <img alt="logo " src="../assets/img/logo.svg" />
      </router-link>
<div v-for="(item, index) in items" :key="index">
  
            
           <b-btn 
           :visible="$route.path == item.rota"
           class="btn-light" @click=" irPara(item.rota)"> {{ item.nome }} </b-btn> 
           
            
            </div>
   
     
      <router-link to="/login"  >
        <b-btn class="btn" @click=" logout()">Logout</b-btn>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      items:[
        {nome:"Feed", rota:"/feed"},
        {nome:"Perfil", rota:"/perfil"},
        {nome:"Grupos", rota:"/grupos"},
        {nome:"Formulários", rota:"/formularios"},

      ]
    }
  },
  methods:{
    irPara(rota){
      
         this.$router.push({
           path: rota,
         })
      
    },
    
     logout(){
      this.$store.dispatch("logOutUsuario").then(response=>{
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
.btn-light {
  display: block;
  border-radius: 0px;

  color: #212529;
  border-radius: 9px;
  background-color: #0b4f6c;
  color: white;
  box-shadow: 0 4px 8px #00000029;


}
.btn-light:hover {
  color: #212529;
  background-color: #0b4f6c;
  border-color: #ffc107;
  color: white;
  box-shadow: 0 4px 8px #00000029;


}
.tipo-parcela-text {
  color: white;
  text-align: left;
  padding: 3%;
}

.tipo-color {
  background: sustentacao;
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
