const { connection } = require("../../db-connection");

class Projects {
  // Cette méthode sélectionne via une jointure toutes les colonnes de la table assets et de la table projects
  // et je les joint ensemble sur la colonne assets_id
  static findManyProjects() {
    const sql =
      "SELECT a.id, a.source, a.asset_name, p.id, p.title, p.link, p.description FROM assets AS a RIGHT JOIN projects AS p ON p.assets_id=a.id";
    return connection.promise().query(sql);
  }

  // Cette méthode sélectionne via une jointure tous les champs de la table projects pour joindre les données
  // de la table assets afin qu'elles soient liées par le même id
  static findOneProjectByAssetId(id) {
    const sql =
      "SELECT * FROM projects INNER JOIN assets ON projects.assets_id = assets.id WHERE projects.id=?";
    return connection.promise().query(sql, [id]);
  }

  // Crée un projet
  static createOne(projects) {
    const sql = "INSERT INTO projects SET ?";
    return connection.promise().query(sql, [projects]);
  }

  // Met à jour un projet
  static updateOne(newProject, id) {
    const sql = "UPDATE projects SET ? WHERE id=?";
    return connection.promise().query(sql, [newProject, id]);
  }

  // Supprime un projet
  static deleteOneById(id) {
    const sql = "DELETE FROM projects WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Projects;
