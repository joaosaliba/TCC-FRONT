<template>
  <div>
    <Alerta ref="alerta"/>

    <b-modal
      id="modal-perfil"
      v-model="modalShow"
      title="Editar Perfil"
      size="xl"
      class="mr-4 modal"
      hide-header
    >
      <div class="foto-perfil  center">
        <img :src="user.picture" alt="foto-perfil mb-4" />
      </div>
{{img}}
      <b-row>
        <b-col>
      <b-form-group label="Imagem de Perfil:" label-cols-sm="4">
        <b-form-file
          id="file-default"
          browse-text="Procurar Outra Imagem"
          placeholder="Trocar Imagem de perfil"
          v-model="file"
          v-bind="user.picture"
        ></b-form-file>
      </b-form-group>
      </b-col>
      </b-row>

      <!-- <b-button class="justify-content-righ" @click="file = null"
        >Limpar Seleção</b-button
      > -->

      <b-row>
        <b-col>
          <b-form-group
            id="input-group-2"
            label="Nome Completo"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="user.nome"
              type="text"
              placeholder="Nome Completo"
              required
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Endereço de email:"
            label-for="input-1"
            description="Digite Email pessoa ou Institucional"
          >
            <b-form-input
              id="input-1"
              v-model="user.email"
              type="email"
              placeholder="Endereço de email:"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-group-3"
            label="Data de Nascimento:"
            label-for="input-3"
          >
            <b-form-input
              id="input-3"
              v-model="user.birthdate"
              type="date"
              required
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-4"
            label="Telefone:"
            label-for="input-4"
          >
            <b-form-input
              id="input-4"
              v-model="user.phonenumber"
              name="phone"
              placeholder="(61)99999-9999"
              type="text"
              v-mask="['(##) #####-####']"
              required
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-group-2"
            label="Biografia"
            label-for="input-2"
          >
            <b-form-textarea
              id="input-2"
              v-model="user.profile.bio"
              placeholder="Digite aqui algo sobre você"
              required
            />
          </b-form-group>
        </b-col>

      </b-row>

      <template #modal-footer="">
        <!-- Emulate built in modal footer ok and cancel button actions -->
        <b-button size="sm" class="mr-4" variant="success" @click="salvarAlteracoes()">
          Salvar
        </b-button>
     
        
        
      </template>
    </b-modal>
  </div>
</template>

<script>
import Alerta from "@/components/Alerta.vue"


export default {
  name: "ModalEditarPerfil",
  props: ["modal"],
  components: {
    Alerta
  },
  data() {
    return {
      modalShow: this.modal,
      file: null,
      user: {},
      img:{}
    };
  },
  methods:{
    salvarAlteracoes(){
      const vm =this;
      vm.user.user_type = "Aluno";
      let obj ={
        id:this.user.id,
        nome:this.user.nome,
        email:this.user.email,
        birthdate:this.user.birthdate,
        picture:this.user.picture,
        phonenumber:this.user.phonenumber
      }
      vm.$api
        .put("aluno/"+this.user.id+"/", vm.user)
        .then((resp) => {
       
        })
        .catch((e) => {
         vm.mostrarMsgErro(e.response.data);
        });
    },
    getImg(){
      let vm = this;
      vm.$api
        .get(this.user.picture)
        .then((resp) => {
          this.img = resp.data
       
        })
        .catch((e) => {
         vm.mostrarMsgErro(e.response.data);
        });
    },
    mostrarMsgErro(msgErro) {
      let vm = this;
      let alertaComp = vm.$refs["alerta"];
      alertaComp.mostraErroSimples("Erro", msgErro);
    },

  },
  mounted() {
    this.user = this.$store.getters.getUser;
  },
};
</script>

<style>
.modal-content {
  border-radius: 60px !important;
}
.center {
  margin: 0 auto;
}
</style>
