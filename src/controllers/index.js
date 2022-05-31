// Je crée ce fichier spécialement pour réunir tout mes fichiers controllers afin de les exporter plus facilement
// pour les importer dans mes routes

const adminControllers = require("./admin.controllers");
const assetsControllers = require("./assets.controllers");
const projectsControllers = require("./projects.controllers");
const linkControllers = require("./selection.controllers");
const authControllers = require("./auth.controllers");

module.exports = {
  authControllers,
  adminControllers,
  assetsControllers,
  projectsControllers,
  linkControllers,
};
