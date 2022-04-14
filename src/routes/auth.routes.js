const authRouter = require("express").Router();
const { adminsControllers, authControllers } = require("../controllers");

authRouter.get("/", adminsControllers.getOneAdminById);
authRouter.post(
  "/",
  adminsControllers.verifyAdminLogin,
  authControllers.createToken
);

module.exports = authRouter;
