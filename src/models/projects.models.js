const { connection } = require("../../db-connection");

class Projects {
  static findManyWithAssets() {
    const sql =
      "SELECT a.source, a.asset_name FROM projects AS p JOIN assets AS a ON p.assets_id=a.id WHERE p.id=?";
    return connection.promise().query(sql);
  }

  static findOneProjectById(id) {
    const sql = "SELECT * FROM projects WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(projects) {
    const sql = "INSERT INTO events SET ?";
    return connection.promise().query(sql, [projects]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM projects WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Projects;
