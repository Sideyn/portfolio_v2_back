// Je crée ce fichier spécialement pour réunir tout mes fichiers routes afin de les exporter plus facilement
// pour les importer directement via mainRouter dans mon fichier App

const mainRouter = require("express").Router();
const adminRouter = require("./admin.routes");
const assetsRouter = require("./assets.routes");
const projectsRouter = require("./projects.routes");
const authRouter = require("./auth.routes");

mainRouter.use("/admin", adminRouter);
mainRouter.use("/assets", assetsRouter);
mainRouter.use("/projects", projectsRouter);
mainRouter.use("/login", authRouter);

module.exports = mainRouter;
