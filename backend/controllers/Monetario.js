const db = require("../config/database");

class Monetario {
  
  //===CADASTRO DE REGISTROS===

  //ENTRADAS 
  async cadastrarEntrada(categoria, valor, mes, ano, usu_id, descricao) {
    await db.query(`INSERT INTO registro (categoria_id, VALOR, mes, ano, USU_ID, descricao, entrada)
    VALUES ($1, $2, $3, $4, $5, $6, true)`, [categoria, valor, mes, ano, usu_id, descricao]).catch(console.log);
    return true;
  }
  //SAIDAS 
  async cadastrarSaida(categoria, valor, mes, ano, usu_id, descricao) {
    await db.query(`INSERT INTO registro (categoria_id, VALOR, mes, ano, USU_ID, descricao, entrada)
    VALUES ($1, $2, $3, $4, $5, $6, false)`, [categoria, valor, mes, ano, usu_id, descricao]).catch(console.log);
    return true;
  }

  //SALARIO 
  async cadastrarSalario(valor, ano, mes, usu_id) {
    let jaCadastrado = await db.query(`SELECT * FROM registro where usu_id = $1 and ano = $2 and mes = $3 and salario = true`, [usu_id, ano, mes]).catch(console.log); 
    if (jaCadastrado.rowCount > 0) {
      await db.query(`UPDATE registro SET VALOR = $1 WHERE USU_ID = $2 AND registro_ID = $3;`, [valor, usu_id, jaCadastrado.rows[0].registro_id]).catch(console.log);
    } else {
      await db.query(`INSERT INTO registro (VALOR, ano, mes, USU_ID, entrada, SALARIO)
    VALUES ($1, $2, $3, $4, true, true)`, [valor, ano, mes, usu_id]).catch(console.log);
      return true;
    }
  }

  //GASTO TEMPORARIO
  async cadastrarGastoTemporario(categoria, valor, mes, ano, mesfinal, anofinal, usu_id) { 
    await db.query(`INSERT INTO registro (categoria_id, VALOR, mes, ano, mes_final, ano_final, USU_ID, entrada, gasto_temporario)
    VALUES ($1, $2, $3, $4, $5, $6, $7, false, true)`, [categoria, valor, mes, ano, mesfinal, anofinal, usu_id]).catch(console.log);
    return true;
  }

  //===EDIÇÃO DE REGISTROS===
  async editarRegistro(categoria_id, valor, mes, ano, ano_final, mes_final, descricao, id) {
    console.log(categoria_id, valor, mes, ano, ano_final, mes_final, descricao, id);
    try {
      let registro = await db.query(
        `update registro set categoria_id = $1, valor = $2, mes = $3, ano = $4, ano_final = $5, mes_final = $6, descricao = $7 where registro_id = $8`,
        [categoria_id, valor, mes, ano, ano_final, mes_final, descricao, id]
      ).catch(console.log);
      return registro;
    } catch (error) {
      console.log(error);
    }
  }
  //===EXCLUSÃO DE REGISTROS===
  async deletarRegistro(registro_id, usu_id) {
    try {
      let registro = await db.query(
        `delete from registro where registro_id = $1 and usu_id = $2`,
        [registro_id, usu_id]
      ).catch(console.log);
      return registro;
    } catch (error) {
      console.log(error);
    }
  }

  //===CONSULTA DE REGISTROS===
  //CONSULTAR ENTRADAS
  async getEntradas(usu_id, ano, mes) {
    let entradas =
      await db.query(`SELECT registro_ID, categoria_id, VALOR, ano, mes FROM registro WHERE USU_ID = $1 AND ano = $2 and mes = $3 and salario = false and entrada = true and gasto_temporario = false`, [usu_id, ano, mes]).
        catch(console.log);
    return entradas.rows;
  }
  //TODOS OS REGISTROS 
  async getRegistros(usu_id, ano, mes) {
    let registros =
      await db.query(`SELECT registro_ID, categoria_id, VALOR, ano, mes, entrada, descricao FROM registro WHERE USU_ID = $1 AND ano = $2 and mes = $3 and salario = false and gasto_temporario = false order by entrada desc`, [usu_id, ano, mes]).
        catch(console.log);
    return registros.rows;
  }
  //CONSULTAR OS GASTOS TEMPORÁRIOS
  async getGastoTemporario(usu_id, ano, mes) {
    let gastoTemporario = await db.query("select * from registro r where usu_id = $1 and TO_DATE(concat(ano_final, mes_final),'YYYYMM') >= TO_DATE(concat('"+ ano + "', '"+ mes +"'),'YYYYMM') and TO_DATE(concat('" + ano + "', '" + mes +"'),'YYYYMM') >= TO_DATE(concat(ano, mes),'YYYYMM') and gasto_temporario = true and entrada = false", [usu_id]).catch(console.log);
    let gastoTemporarioFinalNulo = await db.query("select * from registro r where usu_id = $1 and ano_final is null and TO_DATE(concat('" + ano + "', '" + mes +"'),'YYYYMM') >= TO_DATE(concat(ano, mes),'YYYYMM') and gasto_temporario = true and entrada = false", [usu_id]).catch(console.log);
    gastoTemporario.rows = gastoTemporario.rows.concat(gastoTemporarioFinalNulo.rows);
    return gastoTemporario.rows;
  }
  //CONSULTAR SAÍDAS
  async getSaidas(usu_id, ano, mes) {
    let saidas =
      await db.query(`SELECT registro_ID, categoria_id, VALOR, ano, mes FROM registro WHERE USU_ID = $1 AND ano = $2 and mes = $3 and salario = false and entrada = false and gasto_temporario = false`, [usu_id, ano, mes]).
        catch(console.log);
    return saidas.rows;
  }
  //CONSULTAR SALÁRIO
  async getSalario(ano, mes, usu_id) {
    let salario = await db.query(`SELECT * FROM registro where usu_id = $1 and ano = $2 and mes = $3 and salario = true`, [usu_id, ano, mes]).catch(console.log);
    return salario.rows;
  }
}
module.exports = Monetario;