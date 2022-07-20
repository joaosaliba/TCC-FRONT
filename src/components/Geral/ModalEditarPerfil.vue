<template>
  <div>
    <Alerta ref="alerta" />

    <b-modal
      id="modal-perfil"
      v-model="modalShow"
      title="Editar Perfil"
      size="xl"
      class="mr-4 modal"
      hide-header
    >
      <!-- <div v-if="novaImagem == null" class="foto-perfil center">
        <img :src="user.picture" alt="foto-perfil mb-4" />
      </div>
      <div v-else class="foto-perfil center">
        <img :src="novaImagem.src[0]" alt="foto-perfil mb-4" />
      </div>
      <b-row>
        <b-col>
          <b-form-group label="Imagem de Perfil:" label-cols-sm="4">
            <b-form-file
              id="file-default"
              browse-text="Foto perfil "
              placeholder=""
              v-model="novaImagem"
              accept="image/jpeg, image/png"
            ></b-form-file>
          </b-form-group>
        </b-col>
      </b-row> -->
      <div>
        <div
          v-if="novaImagem == null"
          class="image-input center"
          :style="{ 'background-image': `url(${user.picture})` }"
          @click="chooseImage"
        />
        <div
          v-else
          class="image-input center"
          :style="{ 'background-image': `url(${novaImagemURL})` }"
          @click="chooseImage"
        />
        <b-row class="text-center">
          <b-col>
            <small>Clique e selecione uma nova Imagem de Perfil</small>
          </b-col>
        </b-row>

        <input
          class="file-input"
          ref="fileInput"
          type="file"
          @input="onSelectFile"
          accept="image/jpeg, image/png"
        />
      </div>

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
              v-model="user.profile.birthdate"
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
            id="input-group-6"
            label="Endereço Pessoal:"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              v-model="user.profile.location"
              type="text"
              placeholder="Endereço de Residencia:"
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
        <b-button
          size="sm"
          class="mr-4"
          variant="success"
          @click="salvarAlteracoes()"
        >
          Salvar
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Alerta from "@/components/Geral/Alerta.vue";

export default {
  name: "ModalEditarPerfil",
  props: ["modal"],
  components: {
    Alerta,
  },
  data() {
    return {
      modalShow: this.modal,
      file: null,
      user: {
        profile: {},
      },
      novaImagem: null,
      novaImagemURL: null,
      copiaUser: {},
    };
  },
  methods: {
    pegarUsuario() {
      const vm = this;
      vm.$api
        .get(`user/${this.user.id}/`)
        .then((resp) => {
          this.user = resp.data;
        })
        .catch((r) => {});
    },
    salvarAlteracoes() {
      const vm = this;

      vm.user.user_type = "Aluno";
      let data = new FormData();
      data.append("user_type", "Aluno");
      if (this.user.id) data.append("id", this.user.id);
      if (this.user.nome) data.append("nome", this.user.nome);
      if (this.user.email) data.append("email", this.user.email);
      if (this.novaImagem) data.append("picture", this.novaImagem);
      if (this.user.phonenumber)
        data.append("phonenumber", this.user.phonenumber);
      if (this.user.profile.birthdate)
        data.append("profile.birthdate", this.user.profile.birthdate);
      if (this.user.profile.bio)
        data.append("profile.bio", this.user.profile.bio);
      if (this.user.profile.location)
        data.append("profile.location", this.user.profile.location);
      vm.$api
        .patch("user/" + this.user.id + "/", data)
        .then((resp) => {
          console.log(resp);
          this.$store.dispatch("getUsuario");
          this.user = this.$store.getters.getUser;
          this.$bvModal.hide("modal-perfil");
          this.$emit("buscarDados");
        })
        .catch((e) => {
          vm.mostrarMsgErro(e.response.data);
          Object.assign(this.user, this.copiaUser);
        });
    },

    mostrarMsgErro(msgErro) {
      let vm = this;
      let alertaComp = vm.$refs["alerta"];
      alertaComp.mostraErroSimples("Erro", msgErro);
    },
    chooseImage() {
      this.$refs.fileInput.click();
    },

    onSelectFile(event) {
      this.novaImagem = event.target.files[0];
      this.novaImagemURL = URL.createObjectURL(this.novaImagem);
    },
  },
  mounted() {
    // this.pegarUsuario();
    this.$store.dispatch("getUsuario");
    this.user = this.$store.getters.getUser;
    this.pegarUsuario();
  },
};
</script>

<style scoped>
.modal-content {
  border-radius: 60px !important;
}
.center {
  margin: 0 auto;
}
.image-input {
  display: block;
  width: 200px;
  height: 200px;
  cursor: pointer;
  background-size: cover;
  background-position: center center;
}

.placeholder {
  background: #f0f0f0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
}
.placeholder:hover {
  background: #e0e0e0;
}

.file-input {
  display: none;
}
</style>
