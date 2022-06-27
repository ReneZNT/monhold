<template>
  <v-container class="imagem-fundo-app fill-height align-start" fluid>
    <div
      style="background-color: #3f3f3f; min-width: 100%; height: 100%"
      class="pa-2 pb-8 px-10"
    >
      <div class="d-flex align-center mb-8">
        <!-- <v-btn color="green" dark icon @click.stop="drawer = !drawer">
          <v-icon size="35" class="green--text darken-2"> mdi-menu </v-icon>
        </v-btn> -->
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
          <div class="pa-5 white--text">
            <b>{{ dadosDeUsuario.nome }}</b
            ><br />
            <span style="font-size: 12px">{{ dadosDeUsuario.email }}</span>
          </div>
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
        <v-btn icon @click="alterarMes(false)">
          <v-icon color="white" size="40">mdi-chevron-left</v-icon></v-btn
        >
        <div class="text-center" style="min-width: 200px">
          <h1 style="color: white; user-select: none" class="mx-2">
            {{ converterMes(mes) }}
          </h1>
        </div>
        <v-btn icon @click="alterarMes(true)"
          ><v-icon color="white" size="40">mdi-chevron-right</v-icon></v-btn
        >
        <v-spacer />
        <v-btn icon @click="alterarAno(false)"
          ><v-icon color="white" size="40">mdi-chevron-left</v-icon></v-btn
        >
        <div class="text-center" style="min-width: 200px">
          <h1 style="color: white; user-select: none" class="mx-2">
            {{ ano }}
          </h1>
        </div>
        <v-btn icon @click="alterarAno(true)">
          <v-icon color="white" size="40">mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <div class="d-flex align-center">
        <v-card
          class="py-3 px-2 rounded-r-0 green"
          dark
          style="user-select: none"
        >
          <b>SALÁRIO</b>
        </v-card>
        <v-text-field
          tile
          v-if="editarSalario"
          ref="salario"
          autofocus
          hide-details
          class="inputPrice rounded-0 font-weight-bold"
          type="number"
          dark
          solo
          danse
          @focus="rendaMensal == 0 ? (rendaMensal = '') : ''"
          @keypress.enter="
            postSalario(rendaMensal);
            editarSalario = false;
          "
          v-model="rendaMensal"
          placeholder="0"
          style="max-width: 300px"
          @blur="
            postSalario(rendaMensal);
            editarSalario = false;
          "
        />
        <v-btn
          v-if="editarSalario"
          dark
          class="green py-6 rounded-l-0"
          @click="editarSalario = false"
        >
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
        <v-card
          @click="editarSalario = true"
          :ripple="false"
          v-else
          dark
          class="pa-2 py-3 rounded-l-0 mr-2"
          width="300px"
        >
          <b>{{ converterParaDinheiro(rendaMensal) }}</b>
        </v-card>
        <v-spacer />
      </div>
      <v-row class="ma-0 pa-0" style="user-select: none">
        <v-col v-for="(r, i) in resultados" :key="i" class="pr-1 pl-0 py-1">
          <v-card class="pa-2 rounded-b-0" :class="r.cor" dark>
            <b>{{ r.titulo }}</b>
          </v-card>
          <v-card dark class="pa-2 rounded-t-0" width="100%">
            <b >{{
              r.id == 1
                ? converterParaDinheiro(somaEntradas)
                : r.id == 2
                ? converterParaDinheiro(somaSaidas)
                : r.id == 3
                ? converterParaDinheiro(saldoAtual)
                : r.id == 4
                ? converterParaDinheiro(planejamento)
                : ""
            }}</b>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0" style="user-select: none">
        <v-col class="ma-0 pa-0">
          <v-card dark elevation="0" class="d-flex px-3 py-4 rounded-b-0">
            <b style="font-size: 16px">Gastos e Rendas Extras</b>
            <v-spacer/>
            <v-btn small color="green" @click="adicionarEntrada()">
              <v-icon small class="mr-2"> mdi-plus </v-icon>
              ADICIONAR REGISTRO
            </v-btn>
          </v-card>
          <v-data-table
            no-data-text="Nenhum registro encontrado"
            disable-pagination
            dark
            :headers="headers"
            :items="registros"
            class="elevation-1 rounded-t-0"
            show-group-by
            hide-default-header
            hide-default-footer
            sort-by-desc="entrada"
            @click:row="visualizar"
          >
            <template v-slot:header="{ props: { headers }, on }">
              <tr>
                <th
                  v-for="(header, i) in headers"
                  :key="i"
                  style="font-size: 12px; text-align: start"
                  class="pa-3"
                >
                  <div
                    v-if="header.value == 'deletar'"
                    class="justify-end d-flex mr-1"
                  ></div>
                  <span v-else>
                    {{ header.text }}
                  </span>
                  <v-icon
                    v-if="header.groupable == true"
                    size="20"
                    @click="on.group(header.value)"
                  >
                    mdi-sort
                  </v-icon>
                </th>
              </tr>
            </template>
            <template
              v-slot:[`group.header`]="{ items, isOpen, toggle, remove }"
            >
              <th
                colspan="3"
                @click="toggle"
                style="background-color: #2f2f2f; cursor: pointer"
              >
                <v-icon>
                  {{ isOpen ? "mdi-chevron-down" : "mdi-chevron-right" }}
                </v-icon>
                <span class="mr-1">
                  {{
                    !isOpen
                      ? +procurarItensDaCategoria(items[0].categoria_id)
                      : ""
                  }}
                </span>
                {{ procurarNomeDaCategoria(items[0].categoria_id) }}

                <v-icon v-if="isOpen" size="20" @click.stop="remove">
                  {{ "mdi-close" }}
                </v-icon>
                <span class="ml-1" v-else>
                  {{ "R$ " + somarItensEmUmaCategoria(items[0].categoria_id) }}
                </span>
              </th>
            </template>
            <template v-slot:[`item.valor`]="{ item }">
              <span :class="item.entrada ? 'green--text' : 'red--text'">
                {{ converterParaDinheiro(item.valor) }}
              </span>
            </template>
             <template v-slot:[`item.descricao`]="{ item }">
              <span>
                {{ limitarDescricao(item.descricao) }}
              </span>
            </template>
            <template v-slot:[`item.deletar`]="{ item }">
              <v-btn
                icon
                color="error"
                @click.stop="dialogDelete(item.registro_id)"
              >
                <v-icon size="20"> mdi-delete</v-icon>
              </v-btn>
            </template>
            <template v-slot:[`item.categoria_id`]="{ item }">
              {{ procurarNomeDaCategoria(item.categoria_id) }}
            </template>
          </v-data-table>
        </v-col>
        <v-col class="pa-0 px-1">
          <v-card color="#1f1f1f" class="pa-2" dark style="font-size: 14px">
            <div class="d-flex align-center py-2">
              <b style="font-size: 16px">Gastos Temporários</b>
              <v-spacer />
              <v-btn small @click="adicionarTemporario()" class="green">
              <v-icon small class="mr-2"> mdi-plus </v-icon>
                Adicionar Gasto Temporário
              </v-btn>
            </div>
            <v-divider class="mt-2" />
            <v-row style="color: #cccc00" class="mx-0 my-2 pa-0">
              <v-col
                class="pa-1"
                v-for="(coluna, i) in [
                  'Categorias',
                  'Valor Mensal',
                  'Etapa',
                  '',
                ]"
                :key="i"
                ><b>{{ coluna }}</b></v-col
              >
            </v-row>
            <v-divider class="my-2" />
            <v-row v-for="(gasto, i) in gastosTemporario" :key="i" class="px-2 hoverRow" @click="visualizar(gasto)">
              <v-col  cols="3" :class="gasto.plan ? 'orange--text' : ''">{{
                procurarNomeDaCategoria(gasto.categoria_id)
              }}</v-col>
              <v-col cols="3" :class="gasto.plan ? 'orange--text' : ''">{{ converterParaDinheiro(gasto.valor) }}</v-col>
              <v-col cols="5" :class="gasto.plan ? 'orange--text' : ''">
                {{
                  gasto.ano_final != null
                    ? calcularParcelasPagas(gasto) +
                      "/" +
                      calcularParcelas(
                        gasto.ano,
                        gasto.ano_final,
                        gasto.mes,
                        gasto.mes_final
                      )
                    : "Tempo Indeterminado"
                }}</v-col
              >
              <v-col  cols="1" class="justify-end d-flex pr-5 mt-0 py-1">
                <v-btn
                  icon
                  color="error"
                  @click.stop="dialogDelete(gasto.registro_id)"
                >
                  <v-icon size="20"> mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <template>
      <v-dialog v-model="dialogDeletar" dark width="400px">
        <v-card>
          <v-card-title>Deletar</v-card-title>
          <v-card-text> Deseja deletar o registro? </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="dialogDeletar = false">Cancelar</v-btn>
            <v-btn color="red darken-1 px-4" @click="deletarRegistro()">
              Deletar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <DialogEntradaESaida ref="esDialog" @update="getRegistros()" />
    <DialogVerRegistro ref="visualizar" @editado="getRegistros()"/>
  </v-container>
</template>

<script>
import DialogEntradaESaida from "@/componentes/DialogEntradaESaida.vue";
import DialogVerRegistro from '@/componentes/DialogVerRegistro.vue';
export default {
  components: { DialogEntradaESaida, DialogVerRegistro },
  name: "Principal",
  data: () => ({
    editarSalario: false,
    ano: 2020,
    mes: 1,
    registro_id: null,
    salario: 0,
    usu_id: null,
    rendaMensal: 0,
    drawer: false,
    dialogDeletar: false,
    categorias: [],
    registros: [],
    gastosTemporario: [],
    somaEntradas: 0,
    dadosDeUsuario: [],
    somaSaidas: 0,
    saldoAtual: 0,
    planejamento: 0,
    headers: [
      {
        text: "CATEGORIA ",
        align: "start",
        value: "categoria_id",
        sortable: false,
        groupable: true,
      },
      { text: "VALOR", value: "valor", sortable: false, groupable: false },
      { text: "DESCRIÇÃO", value: "descricao", sortable: false, groupable: false },
      {
        text: "AÇÕES",
        value: "deletar",
        sortable: false,
        groupable: false,
        align: "end",
      },
    ],
    listaItens: [
      // { titulo: " Tela Inicial", icone: "mdi-fast-forward" },
      // { titulo: " Mês", icone: "mdi-dots-horizontal" },
      { titulo: "Gráficos", icone: "mdi-finance" },
    ],
    resultados: [
      {
        id: 3,
        titulo: "Saldo Atual",
        cor: "blue darken-4",
      },
      {
        id: 4,
        titulo: "Pranejamento",
        cor: "orange darken-3",
      },
      {
        id: 1,
        titulo: "Renda Total",
        cor: "blue darken-1",
      },
      {
        id: 2,
        titulo: "Gasto Total",
        cor: "red",
      },
    ],
    listaMeses: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
  }),
  methods: {
    visualizar(registro){
      this.$refs.visualizar.abrir(this.mes, this.ano, {...registro})
    },
    procurarNomeDaCategoria(id) {
       if (id)
      if (this.categorias.length > 0)
        return this.categorias.filter((c) => c.categoria_id == id)[0].cat_nome;
    },
    procurarItensDaCategoria(id) {
       if (id)
      var resultado = this.registros.filter((e) => e.categoria_id == id).length;
      return resultado;
    },
    somarItensEmUmaCategoria(id) {
      var resultado = 0;
      this.registros.forEach((e) => {
        if (e.categoria_id == id) resultado += e.valor;
      });
      return resultado;
    },
    converterParaDinheiro(valor) {
      if (valor == null) return "R$ 0,00";
      if (valor.toString().includes("."))
        return "R$ " + parseFloat(valor).toFixed(2).replace(".", ",");
      else return "R$ " + valor + ",00";
    },
    converterMes(mes) {
      return this.listaMeses[mes - 1];
    },
    limitarDescricao(desc){
      if (desc)
      if (desc.length > 10)
      desc = desc.substring(1, 10) + '...';
      return desc;
    },

    alterarMes(paraCima) {
      if (!paraCima) {
        if (this.mes == 1) {
          this.mes = 12;
          this.ano--;
        } else {
          this.mes--;
        }
      } else {
        if (this.mes == 12) {
          this.mes = 1;
          this.ano++;
        } else {
          this.mes++;
        }
      }
      this.getRegistros();
    },
    alterarAno(paraCima) {
      if (!paraCima) {
        if (this.ano == 2020) {
          this.ano = 2200;
        } else {
          this.ano--;
        }
      } else {
        if (this.ano == 2200) {
          this.ano = 2020;
        } else {
          this.ano++;
        }
      }
      this.getRegistros();
    },

    adicionarEntrada() {
      this.$refs.esDialog.abrir(this.mes, this.ano);
    },

    adicionarTemporario() {
      this.$refs.esDialog.abrirTemporario(this.mes, this.ano);
    },

    dialogDelete(id) {
      this.registro_id = id;
      this.dialogDeletar = true;
    },

    deletarRegistro() {
      this.$axios
        .delete("/registro/" + this.usu_id + "/" + this.registro_id)
        .then((response) => {
          this.getRegistros();
          this.dialogDeletar = false;
        })
        .catch((error) => {
          this.$mensagem(
            "red",
            "Ocorreu um erro inesperado!",
            "Tente novamente mais tarde"
          );
        });
    },

    getCategories() {
      this.$axios
        .get("/categorias")
        .then((response) => {
          this.categorias = response.data;
          this.catSaidas = response.data.filter((cat) => cat.cat_tipo == 1);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getRegistros() {
      this.$axios
        .get("/registros/" + this.usu_id + "/" + this.mes + "/" + this.ano)
        .then((response) => {
          this.registros = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.getSalario();
          this.getGastosTemporario();
          this.calcularRegistros();
        });
    },

    getSalario() {
      this.$axios
        .get("/salario/" + this.usu_id + "/" + this.mes + "/" + this.ano)
        .then((response) => {
          if (response.data.length > 0) {
            this.rendaMensal = response.data[0].valor;
          }
        });
    },

    getDadosDeUsuario() {
      this.$axios
        .get("/get-dados-de-usuario/" + this.usu_id + "/")
        .then((response) => {
          this.dadosDeUsuario = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          //
        });
    },

    getGastosTemporario() {
      this.$axios
        .get(
          "/saida-Temporaria/" + this.usu_id + "/" + this.mes + "/" + this.ano
        )
        .then((response) => {
          this.gastosTemporario = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.calcularRegistros();
        });
    },

    postSalario(salario) {
      salario = this.removeMaskMoney(salario);
      this.$axios
        .post("/salario/" + this.usu_id, {
          valor: salario,
          ano: this.ano,
          mes: this.mes,
        })
        .then((response) => {
          this.getSalario();
        })
        .catch((error) => {
          console.log(error);
          this.getSalario();
        })
        .finally(() => {
          this.calcularRegistros();
        });
    },

    editarEntrada(entrada) {
      this.$axios
        .put(
          "/entrada/:usu_id/:id" + this.usu_id + "/" + entrada.entrada_id,
          entrada
        )
        .then((response) => {
          this.getEntradas();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    removeMaskMoney(valor) {
      if (valor == null) return 0;
      valor = valor.toString();
      return valor.replace("R$ ", "").replace(",", ".");
    },

    calcularParcelasPagas(gasto) {
      var parcelasTotais = this.calcularParcelas(
        gasto.ano,
        gasto.ano_final,
        gasto.mes,
        gasto.mes_final
      );
      var parcelasPagas =
        parcelasTotais +
        1 -
        this.calcularParcelas(
          this.ano,
          gasto.ano_final,
          this.mes,
          gasto.mes_final
        );
      return parseInt(parcelasPagas);
    },

    calcularParcelas(anoInicial, anoFinal, mesInicial, mesFinal) {
      var anosBrutos = anoFinal - anoInicial;
      var parcelaAnual = anosBrutos * 12;
      var parcelas = parcelaAnual + 1 - mesInicial + mesFinal;
      return parseInt(parcelas);
    },

    calcularRegistros() {
      this.somaEntradas = 0;
      this.somaSaidas = 0;
      this.saldoAtual = 0;
      if (
        this.removeMaskMoney(this.rendaMensal) == "" ||
        this.rendaMensal == null
      ) {
        this.rendaMensal = 0;
      }
      for (var i = 0; i < this.registros.length; i++) {
        if (this.registros[i].entrada)
          this.somaEntradas =
            parseFloat(this.somaEntradas) +
            parseFloat(this.registros[i].valor) +
            parseFloat(this.removeMaskMoney(this.rendaMensal));
        else
          this.somaSaidas =
            parseFloat(this.somaSaidas) + parseFloat(this.registros[i].valor);
      }
      this.somaSaidas =
        parseFloat(this.somaSaidas) +
        this.gastosTemporario
          .map((gasto) => gasto.valor)
          .reduce((a, b) => a + b, 0);
      if (this.somaEntradas == 0)
        this.somaEntradas = parseFloat(this.removeMaskMoney(this.rendaMensal));
      this.saldoAtual =
        parseFloat(this.somaEntradas) - parseFloat(this.somaSaidas);
    },

    pegarDataAtual() {
      var data = new Date();
      this.ano = data.getFullYear();
      this.mes = data.getMonth() + 1;
    },
  },

  computed: {},
  watch: {},
  mounted() {
    if (!this.$cookies.get("token")) {
      this.$router.push("/");
    }
    this.usu_id = this.$cookies.get("id");
    this.pegarDataAtual();
    this.getSalario();
    this.getCategories();
    this.getRegistros();
    this.getGastosTemporario();
    this.getDadosDeUsuario();
  },
};
</script>

<style>
.inputPrice input[type="number"] {
  -moz-appearance: textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.hoverRow {
  transition: 0.1s;
}
.hoverRow:hover {
  background-color: #5f5f5f;
}
</style>
