<template>
  <v-container class="imagem-fundo-app" fluid>
    <div style="background-color: #3f3f3f" class="pa-2 pb-8 px-10">
      <div class="d-flex align-center" style="background-color: #3f3f3f">
        <v-btn color="green" dark icon @click.stop="drawer = !drawer">
          <!-- <v-icon size="35" class="green--text mr-n4 darken-2"> mdi-menu </v-icon> -->
          <v-icon size="35" class="mb-1"> mdi-calculator </v-icon>
        </v-btn>
        <v-spacer />
        <v-navigation-drawer v-model="drawer" dark absolute temporary>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon color="green"> mdi-account-cash </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <h1 class="green--text">MENU</h1>
                FINANCEIRO
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item v-for="item in listaItens" :key="item.title" link>
              <v-list-item-icon>
                <v-icon>{{ item.icone }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.titulo }} </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <h1 style="color: white" class="mr-2">Janeiro</h1>
        <div>
          <v-text-field
            hide-details="auto"
            class="py-2"
            dark
            solo
            danse
            v-model="rendaMensal"
            placeholder="00,00"
            style="width: 600px"
          >
          </v-text-field>
        </div>
      </div>

      <v-row class="ma-0 pa-0 white--text">
        <v-col class="col-2 pl-0 pb-0"> <h4>Categoria</h4></v-col>
        <v-col class="col-5 pl-0 pb-0 green--text"> <h4>Renda Extra</h4></v-col>
        <v-col class="col-5 pl-1 pb-0 error--text"> <h4>Gastos</h4></v-col>
        <!-- <v-col class="col-4 pl-0 pb-0 error--text"><h4>Gastos Fixos</h4></v-col> -->
      </v-row>

      <v-row
        class="d-flex align-center my-0"
        v-for="(lista, i) in listaEntradaSaida"
        :key="i"
      >
        <v-col class="col-2">
          <v-select
            v-model="lista.categoria"
            solo
            label="Categoria"
            class="mr-1"
            dark
            hide-details
            item-color="green"
            :items="categorias"
          ></v-select>
        </v-col>
        <v-col class="col-5 pl-1">
          <v-text-field
            v-show="lista.categoria == 'Renda Extra'"
            solo
            hide-details
            danse
            placeholder="00,00"
            v-model="lista.entrada"
            dark
          >
          </v-text-field>
        </v-col>
        <v-col class="col-5 pl-1">
          <v-text-field
            v-show="lista.categoria != 'Renda Extra' && lista.categoria != ''"
            solo
            hide-details
            danse
            placeholder="00,00"
            v-model="lista.saida"
            dark
          >
          </v-text-field>
        </v-col>
      </v-row>
      <div class="white--text">
        <div class="text-center">
          <v-btn @click="listaEntradaSaida.push({categoria: '', entrada: 0, saida: 0 })" class="primary text-center">Adicionar Coluna de Renda/Gasto</v-btn></div>
        <div>Entrada: R$ {{ somaEntradas }}</div>
        <div>
          Saida: <span class="red--text">R$ -{{ somaSaidas }} </span>
        </div>
        <div v-if="saldoAtual >=0">Saldo Atual: <span class="green--text"> R$ {{ saldoAtual }} </span></div>
        <div v-else>Saldo Atual: <span class="red--text"> R$ {{ saldoAtual }} </span></div>
      </div>
      <v-btn @click="calcularEntradas()" dark color="green">Calcular</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  nome: "App",
  data: () => ({
    rendaMensal: 0,
    email: "",
    drawer: false,
    senha: "",
    somaEntradas: 0,
    somaSaidas: 0,
    saldoAtual: 0,

    listaEntradaSaida: [
      {categoria: "Educação", entrada: 0, saida: 100 },
      {categoria: "Transporte", entrada: 0, saida: 200 },
      {categoria: "Mercado", entrada: 0, saida: 400 },
      {categoria: "Renda Extra", entrada: 200, saida: 0 },
      {categoria: "Roupas", entrada: 0, saida: 100 },
    ],
    listaItens: [
      { titulo: " Tela Inicial", icone: "mdi-fast-forward" },
      { titulo: " Mês", icone: "mdi-dots-horizontal" },
      { titulo: " Relatórios", icone: "mdi-dots-horizontal" },
    ],
    categorias: [
      "Renda Extra", 
      "Educação",
      "Saúde",
      "Transporte",
      "vestimentas",
      "Mercado",
      "Lanches",
      "Outro",
    ],
    confirmacaodesenha: "",
  }),
  methods: {
    calcularEntradas() {
      this.somaEntradas = 0;
      this.somaSaidas = 0;
      this.saldoAtual = 0;
      for (var i = 0; i < this.listaEntradaSaida.length; i++) {
        this.somaEntradas =
          this.somaEntradas + parseInt(this.listaEntradaSaida[i].entrada);
        this.somaSaidas =
          this.somaSaidas + parseInt(this.listaEntradaSaida[i].saida);
      }
      this.saldoAtual =
        parseInt(this.rendaMensal) + this.somaEntradas - this.somaSaidas;
    },
  },

  computed: {},
};
</script>
