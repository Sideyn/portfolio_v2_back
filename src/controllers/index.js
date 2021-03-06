// Je crée ce fichier spécialement pour réunir tout mes fichiers controllers afin de les exporter plus facilement
// pour les importer dans mes routes

const adminControllers = require("./admin.controllers");
const assetsControllers = require("./assets.controllers");
const projectsControllers = require("./projects.controllers");
const authControllers = require("./auth.controllers");
const mailControllers = require("./mail.controllers");

module.exports = {
  authControllers,
  adminControllers,
  assetsControllers,
  projectsControllers,
  mailControllers,
};
