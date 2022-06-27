const db = require("../config/database");
const dbes = require("../config/estatico");


class Usuario {

  async getUsuarios() {
    let results =
      await db.query(`SELECT usu_id, nome, email, senha FROM usuario`).
        catch(console.log);
    return results.rows;
  }

  async cadastrarUsuario(nome, email, senha) {
    let getemail = await db.query(`SELECT * FROM usuario where email = $1`, [email]).catch(console.log);
    if (getemail.rowCount > 0) return 10;
    let jaCadastrado = await db.query(`SELECT email FROM usuario
    where email = $1`, [email]).catch(console.log);
    if (jaCadastrado.length > 0) return false;
    else {
      await db.query(`INSERT INTO USUARIO (NOME, EMAIL, SENHA)
      VALUES ($1, $2, md5($3))`, [nome, email, senha]).
        catch(console.log);
      let results = await db.query(`SELECT usu_id, nome FROM usuario
    where email = $1 and senha = md5($2)`, [email, senha]).
        catch(console.log);
      return results.rows;
    }
  }

  async validaLogin(tokenDeAcesso, usu_id) {
    if (tokenDeAcesso && usu_id) {
      try {
        tokenDeAcesso = tokenDeAcesso.replace('token ', '');
        let results = await db.query(`select * from token_de_acesso tda where usu_id = $1 and token_id = $2`, [usu_id, tokenDeAcesso]).catch(console.log);
        if (results.rowCount > 0)
          return true;
        else return false;
      } catch (error) {
        console.log(error);
      }
    } else return false;
  }

  async getDadosDeUsuario(usu_id) {
    if (usu_id) {
      try {
        let results = await db.query(`select nome, email from usuario where usu_id = $1`, [usu_id]).catch(console.log);
        if (results.rowCount > 0)
          return results.rows[0];
        else return false;
      } catch (error) {
        console.log(error);
      }
    } else return false;
  }

  async login(email, senha) {
    let getemail = await db.query(`SELECT * FROM usuario where email = $1`, [email]).catch(console.log);
    if (getemail.rowCount == 0) return 10;
    let userData =
      await db.query(`select usu_id, nome from usuario
  where email = $1 and senha = md5($2)`, [email, senha]).
        catch(console.log);
    if (userData.rowCount > 0) {
      let tokenRegistrado = await db.query(`select * from token_de_acesso tda where usu_id = $1`, [userData.rows[0].usu_id]).
        catch(console.log);
      if (tokenRegistrado.rowCount > 0) {
        await db.query(`delete from token_de_acesso tda where usu_id = $1`, [userData.rows[0].usu_id]).
          catch(console.log);
      }
      var date = new Date();
      var secret = email + senha + 'TPRPsecret' + date.setTime(date.getTime());
      await db.query(`insert into token_de_acesso (token_id, usu_id)
        VALUES (md5($1), $2)`, [secret, userData.rows[0].usu_id]).
        catch(console.log);
      let results = await db.query(`select * from token_de_acesso tda where usu_id = $1`, [userData.rows[0].usu_id]).
        catch(console.log);
        console.log('Teste3' + getemail.rows[0].nome);
      return results.rows;
    } else return userData;
  }

}
module.exports = Usuario;