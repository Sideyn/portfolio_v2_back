const { connection } = require("../../db-connection");

class Assets {
  // Trouve tous les fichiers
  static findManyAssets() {
    const sql = "SELECT * FROM assets";
    return connection.promise().query(sql);
  }

  static findOneAssetById(id) {
    const sql = "SELECT * FROM assets WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOneAsset(asset) {
    const sql = "INSERT INTO assets SET ?";
    return connection.promise().query(sql, [asset]);
  }

  // Supprimer un fichier
  static deleteOneAssetById(id) {
    const sql = "DELETE FROM assets WHERE id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Assets;
