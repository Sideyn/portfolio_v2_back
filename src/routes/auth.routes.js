const authRouter = require("express").Router();
const { adminControllers, authControllers } = require("../controllers");

authRouter.get("/", adminControllers.getOneAdminById);
authRouter.post(
  "/",
  adminControllers.verifyAdminLogin,
  authControllers.createToken
);

module.exports = authRouter;
