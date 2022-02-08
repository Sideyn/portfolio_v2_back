const { connection } = require("../../db-connection");

class Assets {
  static findManyAssets() {
    const sql = "SELECT * FROM assets";
    return connection.promise().query(sql);
  }

  static findOneAssetById(id) {
    const sql = "SELECT * FROM assets WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static deleteOneAssetById(id) {
    const sql = "DELETE FROM assets WHERE id=?";
    return connection.promise().query(sql, [asset]);
  }
}

module.exports = Assets;
