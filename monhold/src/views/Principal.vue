<template>
  <v-container class="imagem-fundo-app" fluid>
    <div class="d-flex px-10 align-center" style="background-color: #3f3f3f">
      <v-btn
          color="green"
          dark
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon size="35">
            mdi-alarm-panel
          </v-icon>
        </v-btn>
           <v-spacer />
            <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-icon style="color:green">
            mdi-account-cash
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="color:green">
             <h1 style="color: green"> MENU </h1>
             FINANCEIRO
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in listaItens"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icone }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            
            <v-list-item-title>{{ item.titulo }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

      <h1 style="color: white"> Janeiro </h1>
 
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

       <v-select
        style="maxwidth: 350px"
        label="Categoria"
        class="pa-3"
        dark
        hide-details
        :items="categorias"

      />
     
        <v-text-field 
        solo
        hide-details


        class="py-2"
      
        danse
        placeholder="00,00"
        v-model="gasto.valor"
        dark
      >
      </v-text-field>
    </div>
  </v-container>
</template>

<script>
export default {
  nome: "App",
  data: () => ({
    valor: null,
    email: "",
    drawer: false,
    senha: "",
    listaGastos: [
      { valor: 100 },
      { valor: 200 },
      { valor: 300 },
      { valor: 500 },
      { valor: 100 },
      { valor: 20 },
    ],
    listaItens: [
      { titulo:" Tela Inicial", icone:"mdi-fast-forward"},
      { titulo:" Mês", icone:"mdi-dots-horizontal"},
      { titulo:" Relatórios", icone:"mdi-dots-horizontal"},
      
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
