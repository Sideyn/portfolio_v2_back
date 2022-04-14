const adminControllers = require("./admin.controllers");
const assetsControllers = require("./assets.controllers");
const projectsControllers = require("./projects.controllers");
const selectionControllers = require("./selection.controllers");
const authControllers = require("./auth.controllers");

module.exports = {
  authControllers,
  adminControllers,
  assetsControllers,
  projectsControllers,
  selectionControllers,
};
