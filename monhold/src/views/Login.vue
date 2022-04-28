<template>
  <div class="fill-height imagem-fundo" style="background-color: #2f2f2f">
    <v-container class="fill-height d-flex justify-center">
      <div>
        <v-card class="elevation-22 py-8" dark style="width: 420px" ref="form">
          <v-card-text>
            <v-text-field
              v-model="email"
              :rules="[() => !!email || 'Campo obrigatório']"
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
          <v-btn class="px-9 py-6" dark width="150px" to="/cadastro">
            Cadastrar
          </v-btn>
          <v-spacer />
          <v-btn class="px-9 py-6" dark width="150px"> Entrar </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
   data: () => ({ 
    email: "",
    senha: "",
  }),
};
</script>
