<template>
  <v-container
    fluid
    class="fill-height imagem-fundo-app"
    style="background-color: #2f2f2f"
  >
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
  }),
  methods: {
    verificacaodesenha() {
      if (this.senha == this.confirmacaodesenha) return true;
    },
  },
};
</script>


<style>
.imagem-fundo-app {
  background: url("../assets/fundo-app.png") no-repeat center top fixed;
  background-size: cover !important;
}
</style>