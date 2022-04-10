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

      <v-btn class="mr-2" to="/" tile text>Login</v-btn>
      <v-btn to="/cadastro" tile text>Cadastro</v-btn>
      <v-btn to="/app" tile text>App</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer dark class="justify-center py-2 caption">
      <span>MonHold - 2022</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
