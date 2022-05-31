const { connection } = require("../../db-connection");

// Sélectionne la source et les champs de la table projects via jointure de la table intermédiaire avec projects et assets par project id

class Projects {
  static findManyWithAssets() {
    const sql =
      "SELECT source, a.source AS source, p.id, p.title, p.link, p.description FROM assets AS a RIGHT JOIN selection_assets AS s ON s.assets_id=a.id RIGHT JOIN projects AS p ON p.id = s.projects_id ORDER BY p.id DESC";
    return connection.promise().query(sql);
  }

  static findOneProjectById(id) {
    const sql = "SELECT * FROM projects WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  // Sélectionne les images liées à un projet
  static findAssetsByProjectId(id) {
    const sql =
      "SELECT source, a.source  FROM assets AS a INNER JOIN selection_assets AS s ON s.assets_id=a.id INNER JOIN projects AS p ON p.id = s.projects_id WHERE p.id=?";
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
