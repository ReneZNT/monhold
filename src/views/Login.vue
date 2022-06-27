<template>
  <div class="fill-height imagem-fundo" style="background-color: #2f2f2f">
    <v-container class="fill-height d-flex justify-center">
      <div>
        <v-card class="elevation-22 py-8" dark style="width: 420px" ref="form">
          <v-card-text>
            <v-form ref="formulario">
              <v-text-field
                v-model="email"
                :rules="[() => !!email || 'Campo obrigatório']"
                label="Digite seu e-mail"
                placeholder="usuario@gmail.com.br"
                required
              ></v-text-field>
              <v-text-field
                @keypress.enter="login()"
                v-model="senha"
                :rules="[
                  () => !!senha || 'Campo obrigatório',
                  () =>
                    (!!senha && senha.length <= 20) ||
                    'Sua senha deve conter no máximo 20 caracteres ',
                ]"
                label="Senha"
                type="password"
                placeholder="********"
                counter="20"
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-card>
        <div class="mt-10 d-flex">
          <v-btn class="px-12 py-6" dark width="150px" to="/cadastro">
            Cadastrar
          </v-btn>
          <v-spacer />
          <v-btn class="px-12 py-6" dark width="150px" @click="login()">
            Entrar
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    email: "",
    senha: "",
  }),

  methods: {
    refreshPage() {
      window.location.reload();
    },
    login() {
      if (this.$refs.formulario.validate()) {
        this.loading = true;
        this.$axios
          .post("/login", {
            login: this.email,
            senha: this.senha,
          })
          .then((response) => {
            this.$cookies.set("token", response.data[0].token_id);
            this.$cookies.set("id", response.data[0].usu_id);
            if (response.data[0].token_id == this.$cookies.get("token")) {
              this.refreshPage();
            }
          })
          .catch((error) => {
            if (error.response.status == 404) {
              this.$mensagem(
                "warning",
                "Email não cadastrado",
                "Faça o cadastro para entrar")
            } else if (error.response.status == 410){
              this.$mensagem(
                "warning",
                "Senha incorreta",
                "Tente novamente"
              )
            }else{
              this.$mensagem(
                "error",
                "Erro",
                "Ocorreu um erro inesperado!"
              )
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },

  mounted() {
    if (this.$cookies.get("token") != undefined && this.$cookies.get("id") != undefined) {
      this.$router.push("/app");
    }
  },
};
</script>
