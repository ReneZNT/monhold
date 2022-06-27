<template>
  <v-dialog dark v-model="mostrar" max-width="450px">
    <v-card tile>
      <div style="background-color: red; height: 5px"></div>
      <v-card-title>Deseja mesmo fechar o programa?</v-card-title>
      <v-card-actions class="pt-10 pb-5 px-10"
        ><v-spacer />
        <v-btn @click="mostrar = false"><b>Não</b></v-btn>
        <v-btn @click="exit()" class="error"><b>Sim</b></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    mostrar: false,
  }),

  methods: {
    exibir() {
      this.mostrar = true;
    },
    exit() {
      window.api.send("proBack", { funcao: "print" });
    },
  },
};
</script>