<template>
  <v-app id="app">
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <h1><b class="green--text">Mon</b><b class="white--text">Hold</b></h1>
        <span class="ml-8 pt-1" style="font-family: gabriola; font-size: 20px">
          Seu Aplicativo de Gestão Financeira
        </span>
      </div>

      <v-spacer />

      <v-btn v-show="$route.name != 'app'" to="/" class="mr-1" tile text>
        Login
      </v-btn>
      <v-btn
        v-show="$route.name != 'app'"
        to="/cadastro"
        class="mr-1"
        tile
        text
      >
        Cadastro
      </v-btn>
      <v-btn v-show="$route.name != 'app'" to="/app" class="mr-1" tile text>
        App
      </v-btn>
      <v-btn @click="exit()" tile text> Sair </v-btn>
      <v-btn v-show="$route.name == 'app'" to="/" text tile>
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer dark class="justify-center py-2 caption">
      <span>MonHold - 2022</span>
    </v-footer>
  </v-app>
</template>

<script>
//const { ipcRenderer } = require("electron");

export default {
  data: () => ({}),
  methods: {
    exit() {
      ipcRenderer.send("exit");
    },
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
