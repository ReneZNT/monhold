<template>
  <v-container
    fluid
    class="fill-height d-flex justify-center imagem-fundo"
    style="background-color: #2f2f2f"
  >
    <div>
      <v-card class="elevation-22 py-8" dark style="width: 420px" ref="form">
        <v-card-text>
          <span class="text-h5">CADASTRO</span>
          <v-form ref="formulario">
            <v-text-field
              v-model="nome"
              :rules="[() => !!nome || 'Campo obrigatório',
              () => (!!nome && nome.length >= 3) || 'Nome deve ter no mínimo 3 caracteres']"
              label="Nome completo"
              placeholder="seu nome"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="[() => !!email || 'Campo obrigatório',
              () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || 'E-mail inválido']"
              label="Digite seu e-mail"
              placeholder="e-mail"
              required
            ></v-text-field>
            <v-text-field
              v-model="senha"
              :rules="[
                () => !!senha || 'Campo obrigatório',
                () =>
                  (!!senha && senha.length <= 20) ||
                  'Sua senha deve conter no máximo 20 caracteres ',
                () =>
                  (!!senha && senha.length >= 8) ||
                  'Sua senha deve conter no mínimo 8 caracteres ',
              ]"
              label="Crie uma senha"
              type="password"
              placeholder="********"
              counter="20"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmacaodesenha"
              :rules="[
                () => !!senha || 'Campo obrigatório',
                () =>
                  !!verificacaodesenha() || 'Senha deve ser igual a anterior',
                () =>
                  (!!senha && senha.length <= 20) ||
                  'Sua senha deve conter no máximo 20 caracteres ',
              ]"
              label="Confirmação da senha"
              type="password"
              placeholder="********"
              counter="20"
              required
              @keypress="cadastrar()"
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
      <div class="mt-10 d-flex">
        <v-btn block @click="cadastrar()" class="py-8" dark> Cadastrar </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  nome: "App",
 
  data: () => ({
    nome: "",
    email: "",
    senha: "",
    confirmacaodesenha: "",
    carregando: "",
  }),
  methods: {
    verificacaodesenha() {
      if (this.senha == this.confirmacaodesenha) return true;
    },
    cadastrar() {
      if (this.$refs.formulario.validate()) {
        this.carregando = true;
        this.$axios
          .post("/cadastrar", {
            nome: this.nome,
            email: this.email,
            senha: this.senha,
          })
          .then((response) => {
            this.$router.push("/");
          })
          .catch((error) => {
            if (error.response.status == 409) {
              this.$mensagem(
                "red",
                "Email já cadastrado",
                "Tente outro email"
              );
            } else if (error.response.status == 400) {
              this.$mensagem(
                "red",
                "Dados incorretos",
                "Verifique se o email é válido, o nome deve conter 3 ou mais caracteres e senha deve conter 8 ou mais caracteres"
              );
            } else {
              this.$mensagem(
                "red",
                "Ocorreu um erro inesperado!",
                "Tente novamente mais tarde"
              );
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>


