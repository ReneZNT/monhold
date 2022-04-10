<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <h1 class=" green--text">

          Monhold
        </h1>
      </div>
      <span class="ml-10" style="font-family: gabriola; font-size: 20px">
        Seu Aplicativo de Gestão Financeira
      </span>
    </v-app-bar>

    <v-main>
      <PaginaLogin />
      <!-- <PaginaCadastro /> -->
    </v-main>
        <v-footer dark> testandooooooooo </v-footer>
  </v-app>
</template>

<script>
/* eslint-disable */

import PaginaLogin from "@/components/PaginaLogin.vue";
import PaginaCadastro from "@/components/PaginaCadastro.vue";
export default {
  name: "App",

  components: {
    PaginaLogin,
    PaginaCadastro,
  },

  data: () => ({
    //
  }),
};
</script>
