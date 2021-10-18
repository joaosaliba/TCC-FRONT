<template>
  <div>
    <h2 class="d-flex flex-row"></h2>

    <b-card class="form-style">
      <b-card-title>
        Cadastro Aluno
      </b-card-title>
      <b-card-body>
        <b-form  >
          <b-form-group
            id="input-group-1"
            label="Endereço de email:"
            label-for="input-1"
            description="Digite Email pessoa ou Institucional"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Endereço de email:"
              required
            />
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Nome Completo"
            label-for="input-2"
          >
            <b-form-input
              id="input-1"
              v-model="form.nome"
              type="text"
              placeholder="Nome Completo"
              required
            />
          </b-form-group>
          <b-row cols="12">
            <b-col>
              <b-form-group
                id="input-group-3"
                label="Data de Nascimento:"
                label-for="input-3"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.birthdate"
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
                  v-model="form.phonenumber"
                  name="phone"
                  placeholder="(61)99999-9999"
                  type="text"
                  v-mask="['(##) #####-####']"
                  required
                />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-5" label="CPF:" label-for="input-5">
                <b-form-input
                  id="input-5"
                  v-model="form.cpf"
                  type="tel"
                  placeholder="000.000.000-00"
                  v-mask="['###.###.###-##']"
                  required
                />
              </b-form-group>
            </b-col>
          </b-row>

          <b-form-group
            id="input-group-6"
            label="Endereço Pessoal:"
            label-for="input-6"
          >
            <b-form-input
              id="input-6"
              v-model="form.customer_address"
              type="text"
              placeholder="Endereço de Residencia:"
              required
            />
          </b-form-group>

          <b-row cols="12">
            <b-col>
              <b-form-group
                id="input-group-7"
                label="Senha:"
                label-for="input-7"
              >
                <b-form-input
                  id="input-7"
                  v-model="form.password"
                  type="password"
                  placeholder="Senha:"
                  required
                />
                <b-form-invalid-feedback :state="validation">
                  Senha deve ser igual a confirmação de Senha
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="input-group-7"
                label="Confirmação de Senha:"
                label-for="input-7"
              >
                <b-form-input
                  id="input-7"
                  v-model="form.password_confirmation"
                  type="password"
                  placeholder="Senha:"
                  required
                />
                <b-form-invalid-feedback :state="validation">
                  Senha deve ser igual a confirmação de Senha
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row cols="12">
            <b-col>
              <b-button
                variant="success"
                size="lg"
                 @click="criarEstudande()"
                class="mr-3"
                >Cadastrar</b-button
              >
            </b-col>
            <b-col>
              <b-button type="reset" size="lg" variant="danger"
                >Resete</b-button
              >
            </b-col>
            <b-col>
              <b-button variant="primary" size="lg" @click="voltarParaLogin()"
                >Voltar</b-button
              >
            </b-col>
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        nome: "",
        birthdate: "",
        phonenumber: "",
        cpf: "",
        user_type: "",
        customer_address: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
     criarEstudande() {
      const vm = this;
      vm.form.user_type = "Aluno";
      vm.$api
        .post("Aluno/", vm.form)
        .then((resp) => {
          console.log(resp.data);
          vm.$router.push({
            name: "Login",
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    voltarParaLogin() {
      const vm = this;
      vm.$router.push({
        name: "Login",
      });
    },
  },
  computed: {
    validation() {
      return this.form.password == this.form.password_confirmation;
    },
  },
};
</script>

<style scoped>
.form-style {
  display: grid;
  font-size: 30x;
  padding: 20px 40px 20px 40px;
  background-color: rgba(255, 255, 255, 0.79);
  border-radius: 50px;
  /* opacity: 0.79; */
  max-width: 800px;
  width: auto;
  margin: 0 auto;
  margin-top: 1%;
}

h2 {
  padding: 20px 40px 20px 35%;
  margin: 0 0;
  margin-top: 5%;
  position: flex;
}
</style>
