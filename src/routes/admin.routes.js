const adminRouter = require("express").Router();
const { adminControllers, authControllers } = require("../controllers");

adminRouter.get("/", adminControllers.getAllAdmins);
adminRouter.get("/:id", adminControllers.getOneAdminById);

adminRouter.post(
  "/",
  adminControllers.validateNewAdminData,
  adminControllers.createOneAdmin,
  adminControllers.getOneAdminById
);

adminRouter.delete(
  "/:id",
  authControllers.verifyToken,
  adminControllers.deleteOneAdmin
);

module.exports = adminRouter;
