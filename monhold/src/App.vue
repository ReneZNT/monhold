<template>
  <v-app>
    <v-app-bar app color="pink" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>
          <span class="ml-10" style="font-family:gabriola; font-size:20px" > Seu Aplicativo de Gestão Financeira </span>   
       </v-app-bar>

    <v-main>
      <Login/>
      <Cadastro/>
    </v-main>
  </v-app>
</template>

<script>
import Login from "@components/Login.vue";
import Cadastro from "@components/Cadastro.vue";

export default {
  name: "App",

  components: {
    Login,
    Cadastro
  },

  data: () => ({
    //
  }),
};
</script>
