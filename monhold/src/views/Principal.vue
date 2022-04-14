<template>
  <v-container class="imagem-fundo-app" fluid  >
 <div class="d-flex py-3" style="background-color:green" >
  <h1 style="background-color:white">
   Janeiro
   </h1>
   <v-spacer/>
   <div>

  <v-text-field outlined danse v-model="valor" placeholder="00,00">
  </v-text-field >
 </div>
 </div>
<div class="d-flex align-center py-8 " style="background-color:pink" v-for="(i,gasto) in listaGastos" :key="i" >
 
  <div>
  <v-text-field outlined danse placeholder="00,00" v-model="gasto[i]">
  </v-text-field>
</div>
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
    listaGastos: [100,20],
    confirmacaodesenha: "",
  }),
  methods: {
    verificacaodesenha() {
      if (this.senha == this.confirmacaodesenha) return true;
    },
  },
};
</script>
