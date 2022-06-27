<template>
<v-dialog dark width="500px" v-model="mostrar">
  <v-card class="pb-2">
    <v-card :class="cor" class="rounded-0" elevation="0" height="5px"></v-card>
    <v-card-title>
      <span class="headline">{{ titulo }}</span>
    </v-card-title>
    <v-card-text>
      {{mensagem}}
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn @click="mostrar = false">OK</v-btn>
    </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
      mostrar: false,
      titulo: "",
      mensagem: "",
      cor: "white",
  }),

  methods: {
    exibir(cor, titulo, mensagem,){
      this.titulo = titulo;
      this.mensagem = mensagem;
      this.mostrar = true;
      if(cor != null) this.cor = cor;
    },
  },
}
</script>