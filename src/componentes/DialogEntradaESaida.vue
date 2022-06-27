<template>
  <v-dialog dark v-model="esDialog" persistent max-width="800px">
    <v-card v-if="isEntrada == null && esDialog == true">
      <v-toolbar style="width: 100%">
        <v-spacer />
        <v-btn icon @click="esDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <div class="pa-5 d-flex justify-center align-center">
        <v-card
          @click="isEntrada = false"
          width="300"
          height="300"
          class="
            orange
            darken-3
            ma-3
            pa-5
            text-center
            align-center
            d-flex
            justify-center
          "
          style="user-select: none"
        >
          <span style="font-size: 30px; font-weight: bold">
            Adicionar <br />
            Gasto</span
          >
        </v-card>
        <v-card
          @click="isEntrada = true"
          width="300"
          height="300"
          class="
            white
            darken-4
            ma-3
            pa-5
            text-center
            align-center
            d-flex
            justify-center
          "
          style="user-select: none"
          light
        >
          <span style="font-size: 30px; font-weight: bold">
            Adicionar <br />
            Renda Extra
          </span>
        </v-card>
      </div>
    </v-card>
    <v-card v-else>
      <v-toolbar class="font-weight-bold">
        <span
          >Adicionar
          {{
            isEntrada ? "Renda" : isTemporario ? "Gasto Temporario" : "Gasto"
          }}</span
        >
      </v-toolbar>
      <v-card-text class="pa-6">
        <div class="d-flex justify-center pb-5">
          <span style="font-size: 20px; font-weight: bold">
            {{ converterMes(registro.mes) + "/" + registro.ano }}</span
          >
        </div>
        <v-form ref="formulario">
          <v-row>
            <v-col>
              <v-select
                v-if="categorias"
                v-model="registro.categoria_id"
                solo
                label="Categoria"
                item-text="cat_nome"
                item-value="categoria_id"
                class="mr-1"
                background-color="#2f2f2f"
                :rules="[() => !!registro.categoria_id || 'Campo obrigatório']"
                :item-color="isEntrada ? 'green' : 'red'"
                :items="
                  isEntrada
                    ? catEntradas
                    : isTemporario
                    ? catTemporario
                    : catSaidas
                "
              />
            </v-col>
            <v-col>
              <v-text-field
                ref="valor"
                v-model="registro.valor"
                background-color="#2f2f2f"
                solo
                danse
                class="inputPrice mr-1"
                placeholder="0,00"
                type="number"
                @focus="registro.valor == 0 ? (registro.valor = '') : ''"
                :rules="[() => !!registro.valor || 'Campo obrigatório']"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="registro.descricao"
                background-color="#2f2f2f"
                solo
                danse
                placeholder="Descrição (Opcional)"
              />
            </v-col>
          </v-row>
          <div v-if="isTemporario">
            <v-checkbox
              class="pa-0 ma-0"
              v-model="tempoIndeterminado"
              dark
              label="Gasto com Tempo indeterminado"
            />
            <v-row v-if="!tempoIndeterminado">
              <v-col>
                <v-text-field
                  v-model="registro.ano_final"
                  background-color="#2f2f2f"
                  solo
                  danse
                  label="Ano de término"
                  v-mask="'####'"
                  :rules="
                    registro.ano_final
                      ? [
                          () =>
                            (registro.ano_final >= 2022 &&
                              registro.ano_final <= 2200) ||
                            'É necessário um ano válido entre 2022 e 2200',
                        ]
                      : !tempoIndeterminado
                      ? [
                          () =>
                            (registro.ano_final >= 2022 &&
                              registro.ano_final <= 2200) ||
                            'Marque como tempo indeterminado, caso ainda não estimado',
                        ]
                      : []
                  "
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="registro.mes_final"
                  background-color="#2f2f2f"
                  solo
                  danse
                  :rules="
                    registro.ano_final || !tempoIndeterminado
                      ? [
                          () =>
                            (registro.mes_final > 0 &&
                              registro.mes_final <= 12) ||
                            'É necessário um mês válido',
                        ]
                      : []
                  "
                  v-mask="'##'"
                  label="Mês de término"
              /></v-col>
            </v-row>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-6">
        <v-spacer></v-spacer>
        <v-btn dark text @click="esDialog = false"> Cancelar </v-btn>
        <v-btn color="green darken-1" @click="adicionarRegistro()">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    usu_id: null,
    esDialog: false,
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
    adicionarRegistro() {
      if (this.$refs.formulario.validate()) {
        if (this.registro.registro_id) {
          this.alterarRegistro(this.registro);
        } else {
        var registro = { ...this.registro };
        registro.valor = this.removeMaskMoney(registro.valor);
        if (this.isEntrada) this.adicionarEntrada(registro);
        else if (this.isTemporario) this.adicionarGastoTemporario(registro);
        else this.adicionarSaida(registro);
        this.esDialog = false;
        }
      }
    },
    editar(registro) {
      this.registro = registro;
      if (registro.entrada)  this.isEntrada = true;
       else if (registro.gasto_temporario) this.isTemporario = true;
       else this.isEntrada = false;
      this.isEntrada = registro.entrada;
      if (registro.mes_final == null) this.tempoIndeterminado = true;
      this.esDialog = true;
    },

    removeMaskMoney(valor) {
      if (valor == null) return 0;
      valor = valor.toString();
      return valor.replace("R$ ", "").replace(",", ".");
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

    adicionarEntrada(entrada) {
      this.$axios
        .post("/entrada/" + this.usu_id, entrada)
        .then((response) => {
          this.$emit("update");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    adicionarSaida(saida) {
      this.$axios
        .post("/saida/" + this.usu_id, saida)
        .then((response) => {
          this.$emit("update");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    adicionarGastoTemporario(gasto) {
      if (this.tempoIndeterminado) {
        this.mes = null;
        this.ano = null;
      }
      this.$axios
        .post("/saida-temporaria/" + this.usu_id, gasto)
        .then((response) => {
          this.$emit("update");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    alterarRegistro(registro) {
      if (this.tempoIndeterminado = true){
      registro.ano_final = null;
      registro.mes_final = null;
      }
      this.$axios
        .put("/registro/" + this.usu_id + "/" + registro.registro_id, registro)
        .then(() => {
          this.$emit("editado", registro);
          this.esDialog = false;
        })
        .catch((error) => {
          console.log(error);
        })
    },

    buscarCategorias() {
      this.$axios
        .get("/categorias")
        .then((response) => {
          this.categorias = response.data;
          this.catTemporario = response.data.filter(
            (cat) => cat.cat_tipo == 2 || cat.cat_tipo == 3
          );
          this.catSaidas = response.data.filter((cat) => cat.cat_tipo == 1);
          this.catEntradas = response.data.filter((cat) => cat.cat_tipo == 0);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    abrir(mes, ano) {
      if (mes && ano) {
        this.registro.mes = mes;
        this.registro.ano = ano;
        this.esDialog = true;
      }
    },
    abrirTemporario(mes, ano) {
      if (mes && ano) {
        this.registro.mes = mes;
        this.registro.ano = ano;
        this.isEntrada = false;
        this.isTemporario = true;
        this.esDialog = true;
      }
    },
  },
  mounted() {
    this.buscarCategorias();
    this.usu_id = this.$cookies.get("id");
  },
  watch: {
    esDialog() {
      if (!this.esDialog) {
        this.isEntrada = null;
        this.registro.registro_id = null;
        this.isTemporario = false;
        this.registro.valor = "0";
        this.registro.ano_final = null;
        this.registro.mes_final = null;
        this.registro.categoria_id = null;
        this.registro.descricao = null;
      }
    },
  },
};
</script>
