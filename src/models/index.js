// Je crée ce fichier spécialement pour réunir tout mes fichiers models afin de les exporter plus facilement
// pour les importer dans mes controllers

const Admin = require("./admin.models");
const Assets = require("./assets.models");
const Projects = require("./projects.models");
const Selection = require("./selection.models");

module.exports = { Admin, Assets, Projects, Selection };
