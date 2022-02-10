const { connection } = require("../../db-connection");

class Projects {
  static findManyProjects() {
    const sql = "SELECT * FROM projects";
    return connection.promise().query(sql);
  }

  static findManyWithAssets() {
    const sql =
      "SELECT a.source, a.asset_name FROM projects AS p JOIN assets AS a ON p.assets_id=a.id WHERE p.id=?";
    return connection.promise().query(sql);
  }

  static findOneProjectById(id) {
    const sql = "SELECT * FROM projects WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findAssetsByProjectId(id) {
    const sql =
      "SELECT a.source, a.asset_name FROM projects AS p JOIN assets AS a ON p.assets_id=a.id WHERE p.id=? ";
    return connection.promise().query(sql, [id]);
  }

  static createOne(projects) {
    const sql = "INSERT INTO projects SET ?";
    return connection.promise().query(sql, [projects]);
  }

  static updateOne(newProject, id) {
    const sql = "UPDATE projects SET ? WHERE id=?";
    return connection.promise().query(sql, [newEvent, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM projects WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Projects;
