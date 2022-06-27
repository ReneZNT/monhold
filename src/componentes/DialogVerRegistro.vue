<template>
  <v-dialog
    dark
    v-model="verDialog"
    v-if="registro.registro_id"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-toolbar class="font-weight-bold">
        <span
          >Visualizar
          {{
            registro.entrada
              ? "Renda"
              : registro.gasto_temporario
              ? "Gasto Temporario"
              : "Gasto"
          }}</span
        >
      </v-toolbar>
      <v-card-text class="pa-6">
        <div class="d-flex justify-center pb-5">
          <span style="font-size: 20px; font-weight: bold; color:white">
            {{ converterMes(registro.mes) + "/" + registro.ano }}</span
          >
        </div>

        <v-row style="font-size: 15px ; color: orange">
          <v-col>
            <b>Categoria: </b>
            <span style="color: white;">{{ procurarNomeDaCategoria(registro.categoria_id) }}</span>
          </v-col>
          <v-col>
            <b>Valor: </b> <span style="color: white;">{{ converterParaDinheiro(registro.valor) }}</span>
          </v-col>
        </v-row >
        <v-row class="pa-0 pt-5 ma-0" style="font-size: 15px ; color: orange">
          <v-col class="pa-0 ma-0">
            <b>Descrição: </b>
            <span style="color: white;">{{ !registro.descricao ? "Sem Descrição" : registro.descricao }}</span>
          </v-col>
        </v-row>

          <v-row style="font-size: 15px ; color: orange">
            <v-col>
              <b>Data inicial: </b> <span style="color: white;">{{ converterMes(registro.mes) + "/" + registro.ano }}</span>
            </v-col>
            <v-col>
              <b>Data final: </b>
              <span style="color: white;">
                {{
                  registro.mes_final && registro.ano_final
                    ? converterMes(registro.mes_final) + "/" + registro.ano_final
                    : "Tempo Indeterminado"
                }}</span>
            </v-col>
          </v-row>
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn color="white black--text darken-1 px-4" @click="editar()">
          <v-icon small class="mr-2">mdi-pencil</v-icon>
          Editar
        </v-btn>
        <v-btn color="green darken-1 px-4" @click="verDialog = false">
          Fechar
        </v-btn>
      </v-card-actions>
    </v-card>
    <DialogEntradaESaida ref="dialogEditar" @editado="atualizarEditado"/>
  </v-dialog>
</template>

<script>
import DialogEntradaESaida from './DialogEntradaESaida.vue';
export default {
    data: () => ({
        usu_id: null,
        verDialog: false,
        isEntrada: null,
        isTemporario: false,
        tempoIndeterminado: false,
        registro: {
            valor: 0,
            categoria_id: null,
            ano: null,
            mes: null,
            ano_final: null,
            mes_final: null,
            descricao: null,
        },
        categorias: [],
        catSaidas: [],
        catEntradas: [],
        catTemporario: [],
    }),
    methods: {
        atualizarEditado(registro){
          this.$emit('editado', registro)
        },
        converterMes(mes) {
            switch (mes) {
                case 1:
                    return "Janeiro";
                case 2:
                    return "Fevereiro";
                case 3:
                    return "Março";
                case 4:
                    return "Abril";
                case 5:
                    return "Maio";
                case 6:
                    return "Junho";
                case 7:
                    return "Julho";
                case 8:
                    return "Agosto";
                case 9:
                    return "Setembro";
                case 10:
                    return "Outubro";
                case 11:
                    return "Novembro";
                case 12:
                    return "Dezembro";
            }
        },
        procurarNomeDaCategoria(id) {
            if (this.categorias.length > 0)
                return this.categorias.filter((c) => c.categoria_id == id)[0].cat_nome;
        },
        buscarCategorias() {
            this.$axios
                .get("/categorias")
                .then((response) => {
                this.categorias = response.data;
                
                this.catTemporario = response.data.filter((cat) => cat.cat_tipo == 2 || cat.cat_tipo == 3);
                this.catSaidas = response.data.filter((cat) => cat.cat_tipo == 1);
                this.catEntradas = response.data.filter((cat) => cat.cat_tipo == 0);
            })
                .catch((error) => {
                console.log(error);
            });
        },
        converterParaDinheiro(valor) {
            if (valor == null)
                return "R$ 0,00";
            if (valor.toString().includes("."))
                return "R$ " + parseFloat(valor).toFixed(2).replace(".", ",");
            else
                return "R$ " + valor + ",00";
        },
        abrir(mes, ano, registro) {
            if (mes && ano) {
                this.registro.mes = mes;
                this.registro.ano = ano;
                this.registro = registro;
                this.verDialog = true;
            }
        },
        editar() {
          this.$refs.dialogEditar.editar({...this.registro});
          this.verDialog = false;
        }
    },
    mounted() {
        this.buscarCategorias();
        this.usu_id = this.$cookies.get("id");
    },
    components: { DialogEntradaESaida }
};
</script>
