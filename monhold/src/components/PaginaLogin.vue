<template>
  <div fluid class="fill-height" style="background: url('/assets/fundo.png') no-repeat center center fixed !important;">
    <v-container class="fill-height d-flex justify-center">
      <div>
        <v-card class="elevation-22 py-8" dark style="width: 420px" ref="form">
          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="[() => !!name || 'Campo obrigatório']"
              
              label="Digite seu e-mail"
              placeholder="usuario@gmail.com.br"
              required
            ></v-text-field>
            <v-text-field
              v-model="senha"
              :rules="[
                () => !!senha || 'Campo obrigatório',
                () =>
                  (!!senha && senha.length <= 20) ||
                  'Sua senha deve conter no máximo 20 caracteres ',
                ]"
              label="Senha"
              type="password"
              placeholder="********"
              counter="20"
              required
            ></v-text-field>
          </v-card-text>
        </v-card>
        <div class="mt-10 d-flex px-10">
          <v-btn class="px-9 py-6" dark width="150px" > cadastrar </v-btn>
          <v-spacer />
          <v-btn class="px-9 py-6" dark width="150px" > proximo </v-btn>
        </div>
      </div>
    </v-container>

  </div>
</template>

<script>
export default {};
</script>
