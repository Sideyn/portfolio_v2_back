// Je crée mon router adminRouter
const adminRouter = require("express").Router();

// J'importe mon controller
const { adminControllers } = require("../controllers");

// Je crée ma premiére route get en appelant mon controller suivi de la fonction getAdmin pour récupérer l'admin
adminRouter.get("/", adminControllers.getAdmin);
adminRouter.get("/:id", adminControllers.getOneAdminById);

adminRouter.post(
  "/",
  adminControllers.createOneAdmin,
  adminControllers.getOneAdminById
);

// J'exporte mon router, adminRouter pour l'envoyer vers le fichier index.js
module.exports = adminRouter;
