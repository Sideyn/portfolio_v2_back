const argon2 = require("argon2");
const { connection } = require("../../db-connection");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

class Admin {
  static findMany() {
    const sql = "SELECT id, mail FROM admin";
    return connection.promise().query(sql);
  }

  static findOneAdminById(id) {
    const sql = "SELECT * FROM admin WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneAdminByEmail(mail) {
    const sql = "SELECT * FROM admin WHERE mail=?";
    return connection.promise().query(sql, [mail]);
  }

  static deleteOnebyId(id) {
    const sql = "DELETE FROM admin WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static async mailAlreadyExists(mail) {
    const sql = "SELECT * FROM admin WHERE mail=?";
    const [result] = await connection.promise().query(sql, [mail]);
    return result.length > 0;
  }

  static async verifyPassword(hashedPassword) {
    const sql = "SELECT hashedPassword FROM admin WHERE mail=?";
    return connection.promise().query(sql, [hashedPassword]);
  }

  static async passwordHashing(password) {
    const hashedPassword = await argon2.hash(password, hashingOptions);
    return hashedPassword;
  }

  static async verifyPasswordHash(hashedPassword, password) {
    return argon2.verify(hashedPassword, password, hashingOptions);
  }

  static createOne(admin) {
    const sql = "INSERT INTO admin SET ?";
    return connection.promise().query(sql, [admin]);
  }
}

module.exports = Admin;
