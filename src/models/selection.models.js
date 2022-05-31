const { connection } = require("../../db-connection");

class Selection {
  static findMany() {
    const sql = "SELECT * FROM selection_assets";
    return connection.promise().query(sql);
  }

  static findOneLinkById(id) {
    const sql = "SELECT * FROM selection_assets WHERE id=?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(link) {
    const sql = "INSERT INTO selection_assets SET ?";
    return connection.promise().query(sql, [link]);
  }

  static deleteOneById(id) {
    const sql = "DELETE FROM selection_assets WHERE projects_id=?";
    return connection.promise().query(sql, [id]);
  }
}

module.exports = Selection;
