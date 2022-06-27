const db = require("../config/database");

class Publico {

  async getCategorias() {
    let categorias =
      await db.query(`select * from categoria`).catch(console.log);
    return categorias.rows;
  }
}
module.exports = Publico;