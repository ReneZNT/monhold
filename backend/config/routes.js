const express = require("express");
const routes = express.Router();
//importando arquivo Usuario.js
const Usuario = require('../controllers/Usuario');
const Publico = require('../controllers/Publico');
const Monetario = require("../controllers/Monetario");


// let db = [
//   { '1': { Mensagem: 'Banco funcionando' } },
//   { '2': { nome: 'teste', idade: '0' } },
// ]
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

acesso = async function (req) {
  var validacao = await new Usuario().validaLogin(req.headers.authorization, req.params.usu_id);
  return validacao;
}

// routes.delete("/entrada/:usu_id/:id", (req, res) => {
//   const id = req.params.id;
//   res.send(newDB);
// });

routes.delete("/registro/:usu_id/:id", async (req, res) => {
  try {
    if (await acesso(req) == true) {
      const id = req.params.id;
      let entrada = await new Monetario().deletarRegistro(id, req.params.usu_id);
        res.status(200).json({msg: "Registro deletado com sucesso"});
    } else {
      res.status(401).send({ error: "Acesso negado" });
    }
  } catch (error) {
    res.status(500).send({ error: "Erro interno" });
  }
});


  routes.get("/categorias", async (req, res) => {
    try {
      let categorias = await new Publico().getCategorias();
      res.status(200).json(categorias);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });


  // routes.get('/usuarios', async (req, res) => {
  //   let usuarios = await new Usuario().getUsuarios();
  //   res.status(200).json(usuarios);
  // });

  routes.get('/entradas/:usu_id/:mes/:ano', async (req, res) => {
    try {
      if (await acesso(req) == true) {
        if (!req.params.ano || !req.params.mes || req.params.mes > 12 || req.params.mes <= 0) res.status(400).json({ error: 'Data inválida' });
        let entradas = await new Monetario().getEntradas(req.params.usu_id, req.params.ano, req.params.mes);
        res.status(200).json(entradas);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

  routes.get('/usuarios', async (req, res) => {
    let usuarios = await new Usuario().getUsuarios();
    res.status(200).json(usuarios);
  });

  routes.get('/registros/:usu_id/:mes/:ano', async (req, res) => {
    try {
      if (await acesso(req) == true) {
        if (!req.params.ano || !req.params.mes || req.params.mes > 12 || req.params.mes <= 0) res.status(400).json({ error: 'Data inválida' });
        let registros = await new Monetario().getRegistros(req.params.usu_id, req.params.ano, req.params.mes);
        res.status(200).json(registros);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

  routes.get('/saidas/:usu_id/:mes/:ano', async (req, res) => {
    try {
      if (await acesso(req) == true) {
        if (!req.params.ano || !req.params.mes || req.params.mes > 12 || req.params.mes <= 0) res.status(400).json({ error: 'Data inválida' });
        let saidas = await new Monetario().getEntradas(req.params.usu_id, req.params.ano, req.params.mes);
        res.status(200).json(saidas);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

  routes.get('/salario/:usu_id/:mes/:ano', async (req, res) => {
    try {
      if (await acesso(req) == true) {
        if (!req.params.ano || !req.params.mes || req.params.mes > 12 || req.params.mes <= 0) res.status(400).json({ error: 'Data inválida' });
        let salario = await new Monetario().getSalario(req.params.ano, req.params.mes, req.params.usu_id);
        res.status(200).json(salario);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

  routes.get('/saida-temporaria/:usu_id/:mes/:ano', async (req, res) => {
    try {
      if (await acesso(req) == true) {
        if (!req.params.ano || !req.params.mes || req.params.mes > 12 || req.params.mes <= 0) res.status(400).json({ error: 'Data inválida' });
        let saidaTemporaria = await new Monetario().getGastoTemporario(req.params.usu_id, req.params.ano, req.params.mes);
        res.status(200).json(saidaTemporaria);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });
  routes.get('/get-dados-de-usuario/:usu_id', async (req, res) => {
    try {
      if (await acesso(req) == true) {
        let userData = await new Usuario().getDadosDeUsuario(req.params.usu_id);
        res.status(200).json(userData);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

  routes.post('/entrada/:usu_id', async (req, res) => {
    try {
      let { categoria_id, valor, mes, ano, descricao} = req.body;
      if (!ano || !mes || mes > 12 || mes <= 0) return res.status(400).json({ error: 'Data inválida' });
      if (!categoria_id) return res.status(400).json({ error: 'Categoria não informada' });
      if (await acesso(req)) {
        let entrada = await new Monetario().cadastrarEntrada(categoria_id, valor, mes, ano, req.params.usu_id, descricao);
        res.status(200).json(entrada);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

  routes.post('/saida/:usu_id', async (req, res) => {
    try {
      let { categoria_id, valor, mes, ano, descricao } = req.body;
      if (!ano || !mes || mes > 12 || mes <= 0) res.status(400).json({ error: 'Data inválida' });
      if (await acesso(req)) {
        let saida = await new Monetario().cadastrarSaida(categoria_id, valor, mes, ano, req.params.usu_id, descricao);
        res.status(200).json(saida);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

  routes.post('/saida-temporaria/:usu_id/', async (req, res) => {
    try {
      let { categoria_id, valor, mes, ano, mes_final, ano_final} = req.body;
      if (!ano || !mes || mes > 12 || mes <= 0) res.status(400).json({ error: 'Data inválida' });
      if (await acesso(req)) {
        let saida = await new Monetario().cadastrarGastoTemporario(categoria_id, valor, mes, ano, mes_final, ano_final, req.params.usu_id);
        res.status(200).json(saida);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });



  routes.post('/salario/:usu_id', async (req, res) => {
    try {
      let { valor, ano, mes } = req.body;
      if (valor == '' || valor == null) valor = 0;
      valor = parseFloat(valor);
      if (!ano || !mes || mes > 12 || mes <= 0) res.status(400).json({ error: 'Data inválida' });
      if (await acesso(req)) {
        let salario = await new Monetario().cadastrarSalario(valor, ano, mes, req.params.usu_id);
        res.status(200).json(salario);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });


  routes.put('/registro/:usu_id/:id', async (req, res) => {
    try {
      let { categoria_id, valor, mes, ano, ano_final, mes_final, descricao } = req.body;
      if (await acesso(req)) {
        let entrada = await new Monetario().editarRegistro(categoria_id, valor, mes, ano, ano_final, mes_final, descricao, req.params.id);
        res.status(200).json(entrada);
      } else {
        return res.status(401).json({ error: 'Usuário não autorizado' });
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  });

  routes.post('/cadastrar', async (req, res) => {
    try {
      if (validateEmail(req.body.email) && req.body.senha.length >= 8 && req.body.nome.length >= 3) {
        let { nome, email, senha } = req.body
        let usuario = await new Usuario().cadastrarUsuario(nome, email, senha);
        if (usuario == 10) {
          res.status(409).json({ error: 'Usuário já cadastrado' });
        } else if (usuario.length > 0)
          res.status(200).json(usuario);
      } else {
        res.status(400).end();
      }
    } catch {
      res.status(500).end();
    }
  });

  routes.post('/login', async (req, res) => {
    let { login, senha } = req.body
    let usuario = await new Usuario().login(login, senha);
    if (usuario.length > 0)
      res.status(200).json(usuario);
    else if (usuario == 10) res.status(404).end();
    else res.status(410).end();
  });


  module.exports = routes;