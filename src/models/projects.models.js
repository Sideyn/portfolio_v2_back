const { connection } = require("../../db-connection");

class Projects {
  // static findManyProject() {
  //   const sql = "SELECT * FROM projects";
  //   return connection.promise().query(sql);
  // }

  static findManyWithAssets() {
    // selectionne la source et les champs de la table projects via jointure de la table intermédiaire avec projects et assets par project id
    const sql =
      "SELECT source, a.source AS source, p.id, p.title, p.link, p.description FROM assets AS a RIGHT JOIN selection_assets AS s ON s.assets_id=a.id RIGHT JOIN projects AS p ON p.id = s.projects_id ORDER BY p.id DESC";
    return connection.promise().query(sql);
  }

  static findOneProjectById(id) {
    const sql = "SELECT * FROM projects WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static findAssetsByProjectId(id) {
    // selectionne les images liées à un evenement
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
