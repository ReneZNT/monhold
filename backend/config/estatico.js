const express = require("express");
const routes = express.Router();
//importando arquivo Usuario.js
const Usuario = require('../controllers/Usuario');
const Monetario = require('../controllers/Monetario');
const Publico = require('../controllers/Publico');

// let db = [
//   { '1': { Mensagem: 'Banco funcionando' } },
//   { '2': { nome: 'teste', idade: '0' } },
// ]

// let categorias = [
//   "Renda Extra",
//   "Educação",
//   "Saúde",
//   "Transporte",
//   "vestimentas",
//   "Mercado",
//   "Lanches",
//   "Outro",
// ]

acesso = async function (req) {
  var validacao = await new Usuario().validaLogin(req.headers.authorization, req.params.usu_id);
  return validacao;
}


module.exports = routes;