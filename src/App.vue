<template>
  <v-app>
    <v-app-bar app dark style="user-select: none">
      <div class="d-flex align-center">
        <h1><b class="green--text">Mon</b><b class="white--text">Hold</b></h1>
        <span class="ml-8 pt-1" style="font-family: gabriola; font-size: 20px">
          Seu Aplicativo de Gestão Financeira
        </span>
      </div>
      <v-btn v-show="$route.name == 'cadastro'" to="/" class="mr-1" tile text>
        Login
      </v-btn>
      <v-btn
        v-show="$route.name == 'login'"
        to="/cadastro"
        class="mr-1"
        tile
        text>
        Cadastrar
      </v-btn>
      <v-btn @click="DialogDeFechar()" tile text color="error"
        ><b>Fechar App</b>
      </v-btn>
      <v-btn @click="logout()" v-show="$route.name == 'app'" text tile>
        Sair da conta
        <v-icon class="ml-2">mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main id="app">
      <router-view />
    </v-main>
    <v-footer dark class="justify-center py-2 caption">
      <span>MonHold - 2022</span>
    </v-footer>

    <template>
      <DialogDeAlerta ref="dialogDeAlerta" />
      <DialogConfirmarSair ref="dialogDeFechar" />
    </template>
  </v-app>
</template>

<script>
import Vue from "vue";
import DialogDeAlerta from "./componentes/DialogDeAlerta.vue";
import DialogConfirmarSair from "./componentes/DialogConfirmarSair.vue";
export default {
  name: "app",
  components: {
    DialogDeAlerta,
    DialogConfirmarSair,
  },
  data: () => ({}),
  methods: {
    DialogDeFechar() {
      this.$refs.dialogDeFechar.exibir();
    },
    mensagem(cor, titulo, mensagem) {
      this.$refs.dialogDeAlerta.exibir(cor, titulo, mensagem);
    },
    logout() {
      this.$cookies.remove("token");
      this.$cookies.remove("id");
      this.$router.push("/");
    },
    checkInvalidRoute() {
      if (this.$route.name != "login" ||
        this.$route.name != "cadastro" ||
        this.$route.name != "app")
        this.$router.push("/");
    },
  },
  created() {
    this.checkInvalidRoute();
    Vue.prototype.$mensagem = this.mensagem;
  },
};
</script>

<style>
body,
html {
  overflow: auto;
}
.v-application,
.v-application [class*="text-"] {
  font-family: "Montserrat" !important;
  /*Essa fonte foi importada no arquivo index.html que fica na pasta public (linha 12 >Nesse momento<)*/
}

.imagem-fundo {
  background: url("./assets/fundo.png") no-repeat center top fixed;
  background-size: cover !important;
}

.imagem-fundo-app {
  background: url("./assets/fundo-app.png") no-repeat center top fixed;
  background-size: cover !important;
}
</style>
