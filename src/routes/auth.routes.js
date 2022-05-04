const authRouter = require("express").Router();
const { adminControllers, authControllers } = require("../controllers");

// authRouter.post("/login", (req, res) => {
//   res.send("You're login");
// });

authRouter.get("/", adminControllers.getOneAdminById);
authRouter.post(
  "/",
  adminControllers.verifyAdminLogin,
  authControllers.createToken
);

module.exports = authRouter;
