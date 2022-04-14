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
    const sql = "SELECT id, email FROM admins";
    return connection.promise().query(sql);
  }

  static findOneAdminById(id) {
    const sql = "SELECT * FROM admins WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findOneAdminByEmail(email) {
    const sql = "SELECT * FROM admins WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  static deleteOnebyId(id) {
    const sql = "DELETE FROM admins WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static async verifyPassword(hashedPassword) {
    const sql = "SELECT hashedPassword FROM admin WHERE email=?";
    return connection.promise().query(sql, [hashedPassword]);
  }

  static async verifyPasswordHash(hashedPassword, password) {
    return argon2.verify(hashedPassword, password, hashingOptions);
  }

  static createOne(admin) {
    const sql = "INSERT INTO admins SET ?";
    return connection.promise().query(sql, [admin]);
  }
}

module.exports = Admin;
