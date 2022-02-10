const mainRouter = require("express").Router();
const assetsRouter = require("./assets.routes");
const projectsRouter = require("./projects.routes");

mainRouter.use("/assets", assetsRouter);
mainRouter.use("/projects", projectsRouter);

module.exports = mainRouter;
