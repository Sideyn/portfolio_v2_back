const { connection } = require("../../db-connection");

class Projects {
  static findManyWithAssets() {
    const sql =
      "SELECT source, a.source, a.asset_name, p.id, p.title, p.link, p.description FROM assets AS a RIGHT JOIN projects AS p ON p.assets_id=a.id";
    return connection.promise().query(sql);
  }

  static findOneProjectById(id) {
    const sql = "SELECT * FROM projects WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findAssetsByProjectId(id) {
    const sql =
      "SELECT source, a.source, a.asset_name FROM assets AS a INNER JOIN projects AS p ON p.assets_id";
    return connection.promise().query(sql, [id]);
  }

  static createOne(projects) {
    const sql = "INSERT INTO projects SET ?";
    return connection.promise().query(sql, [projects]);
  }

  static updateOne(newProject, id) {
    const sql = "UPDATE projects SET ? WHERE id=?";
    return connection.promise().query(sql, [newProject, id]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM projects WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Projects;
