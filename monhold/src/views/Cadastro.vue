<template>
  <div fluid class="fill-height imagem-fundo">
    <v-container class="fill-height d-flex justify-center">
      <div>
        <v-card class="elevation-22 py-8" dark style="width: 420px" ref="form">
          <v-card-text>
            <v-text-field
              v-model="nome"
              :rules="[() => !!nome || 'Campo obrigatório']"
              label="Nome completo"
              placeholder="seu nome"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              :rules="[() => !!nome || 'Campo obrigatório']"
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
            ></v-text-field>
          </v-card-text>
        </v-card>
        <div class="mt-10 d-flex px-10">
          <v-btn block @click="verificacaodesenha()" class="py-8" dark>
            proximo
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  nome: "App",
  data: () => ({
    nome: "",
    email: "",
    senha: "",
    confirmacaodesenha: "",
  }),
  methods: {
    verificacaodesenha() {
      if (this.senha == this.confirmacaodesenha) return true;
    },
  },
};
</script>


<style>
.imagem-fundo {
  background: url("../assets/fundo.png") no-repeat center top fixed;
  background-size: cover !important;
}
</style>