<template>
  <v-app>
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <h1><b class="green--text">Mon</b><b class="white--text">Hold</b></h1>
        <span class="ml-8 pt-1" style="font-family: gabriola; font-size: 20px">
          Seu Aplicativo de Gestão Financeira
        </span>
      </div>
    </v-app-bar>

    <v-main>
      <!-- <PaginaLogin /> -->
      <PaginaCadastro />
    </v-main>
    <v-footer dark class="justify-center py-2 caption"
      ><span>MonHold - 2022</span></v-footer
    >
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
