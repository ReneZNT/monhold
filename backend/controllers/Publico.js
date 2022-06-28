const db = require("../config/database");

class Publico {

  //BUSCAR CATEGORIAS DEFINIDAS NA CRIAÇÃO DO BANCO
  async getCategorias() {
    let categorias =
      await db.query(`select * from categoria`).catch(console.log);
    return categorias.rows;
  }
}
module.exports = Publico;