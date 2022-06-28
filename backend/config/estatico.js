const express = require("express");
const routes = express.Router();
//importando arquivo Usuario.js
const Usuario = require('../controllers/Usuario');
const Monetario = require('../controllers/Monetario');
const Publico = require('../controllers/Publico');

//VUNÇÃO QUE VALIDA O ACESSO DO USUÁRIO AS INFORMAÇÕES
acesso = async function (req) {
  var validacao = await new Usuario().validaLogin(req.headers.authorization, req.params.usu_id);
  return validacao;
}


module.exports = routes;