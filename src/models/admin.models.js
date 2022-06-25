// J'importe les infos pour me connecter à ma BDD
const { connection } = require("../../db-connection");
// J'importe le package argon2 qui sert à hasher un password
const argon2 = require("argon2");

// Je configure argon2
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

class Admin {
  // Trouve un admin via son mail ainsi que son id
  static findAdmin() {
    const sql = "SELECT id, mail FROM admin";
    return connection.promise().query(sql);
  }

  // Trouve un admin via son id
  static findOneAdminById(id) {
    const sql = "SELECT * FROM admin WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  // Trouve un admin via son email
  static findOneAdminByEmail(mail) {
    const sql = "SELECT * FROM admin WHERE mail=?";
    return connection.promise().query(sql, [mail]);
  }

  // Hash le password via argon2
  static async passwordHashing(password) {
    const hashedPassword = await argon2.hash(password, hashingOptions);
    return hashedPassword;
  }

  // Je vérifie que le password a bien été hashé et qu'il est valide
  static async verifyPasswordHash(password, hashedPassword) {
    const valid = await argon2.verify(hashedPassword, password, hashingOptions);
    return valid;
  }

  // Crée un admin
  static createOne(admin) {
    const sql = "INSERT INTO admin SET ?";
    return connection.promise().query(sql, [admin]);
  }
}

// J'exporte mon model Admin pour créer mes controllers
module.exports = Admin;
