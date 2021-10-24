<template>
  <div class="sideMenu">
    <!-- <b-col cols="1" class="justify-content-center mt-5"> -->
    <div class="foto-perfil">
      <img :src='user.picture' alt="foto-perfil mb-4">
    </div>
    <div>
      <h4>{{user.nome}}</h4>
    </div>
    <div>
      <h5>{{user.user_type}}</h5>
    </div>
    <div>
      Editar Pefil
    </div>
    <div class="box">
      <h2>Forúm</h2>
      <b-row class="justify-content-start">
        Teste
      </b-row>
      <b-row>
        Teste
      </b-row>
      <b-row>
        Teste
      </b-row>
      <h2>Meus Grupo</h2>
      <b-row>
        Teste
      </b-row>
      <b-row>
        Teste
      </b-row>
      <b-row>
        Teste
      </b-row>
      <h2>Formulários</h2>
    </div>
    <!-- </b-col> -->
  </div>
</template>

<script>
import store from '@/utils/store.js'

export default {

  name: "SideMenu",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    getUser(){
      this.user=store.getters.getUser
      console.log(this.user)
    }

  },
  mounted(){
    this.getUser()
  }
};
</script>

<style>
.sideMenu {
  margin: 3% 10px 10px 10px;
  position: relative;
  padding: auto;
  text-align: center;
  z-index: 2;
  background-color: transparent;
  width: 270px;
  overflow-x: hidden;
  overflow-y: auto;
  color: #0b4f6c;
  font-family: sans-serif;
}
.box {
  padding: 10 10;
  margin-left: 10%;
  margin-top: 10%;
  text-align: left;
  align-items: center;
}
.foto-perfil{
  padding: 10 10;
  margin: ;
}
</style>
