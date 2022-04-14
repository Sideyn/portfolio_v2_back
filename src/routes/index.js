const mainRouter = require("express").Router();
const assetsRouter = require("./assets.routes");
const projectsRouter = require("./projects.routes");
const authRouter = require("./auth.routes");
const linkRouter = require("./selection.routes");

mainRouter.use("/assets", assetsRouter);
mainRouter.use("/projects", projectsRouter);
mainRouter.use("./auth", authRouter);
mainRouter.use("./selection", linkRouter);

module.exports = mainRouter;
