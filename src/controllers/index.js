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
