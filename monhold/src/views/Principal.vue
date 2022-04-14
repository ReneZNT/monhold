<template>
  <v-container class="imagem-fundo-app" fluid>
    <div class="d-flex px-10 align-center" style="background-color: #3f3f3f">
      <h1 style="color: white">Janeiro</h1>
      <v-spacer />
      <div>
        <v-text-field
          hide-details="auto"
          class="py-2"
          dark
          outlined
          danse
          v-model="valor"
          placeholder="00,00"
          style="width: 600px"
        >
        </v-text-field>
      </div>
    </div>
    <div
      class="d-flex align-center px-3"
      style="background-color: #3f3f3f"
      v-for="(gasto, i) in listaGastos"
      :key="i"
    >
      <v-text-field
        hide-details
        class="py-2"
        outlined
        danse
        placeholder="00,00"
        v-model="gasto.valor"
        dark
      >
      </v-text-field>
      <v-select
        label="Categoria"
        class="pa-3"
        dark
        outlined
        hide-details
        :items="categorias"
      />
    </div>
  </v-container>
</template>

<script>
export default {
  nome: "App",
  data: () => ({
    valor: null,
    email: "",
    senha: "",
    listaGastos: [
      { valor: 100 },
      { valor: 200 },
      { valor: 300 },
      { valor: 400 },
      { valor: 500 },
      { valor: 100 },
      { valor: 200 },
      { valor: 20 },
    ],
    categorias: [
      "Categoria-1",
      "Categoria-2",
      "Categoria-3",
      "Categoria-4",
      "Categoria-5",
      "Categoria-6",
    ],
    confirmacaodesenha: "",
  }),
  methods: {
    verificacaodesenha() {
      if (this.senha == this.confirmacaodesenha) return true;
    },
  },
};
</script>
