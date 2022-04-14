const linkRouter = require("express").Router();

const { linkControllers, authControllers } = require("../controllers");

linkRouter.get("/", linkControllers.getAllLinks);
linkRouter.get("/:id", linkControllers.getOneLinkById);
linkRouter.delete(
  "/:id",
  authControllers.verifyToken,
  linkControllers.deleteOneLink
);
linkRouter.post(
  "/",
  authControllers.verifyToken,
  linkControllers.createOneLink,
  linkControllers.getOneLinkById
);

module.exports = linkRouter;
