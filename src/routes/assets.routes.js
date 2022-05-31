const assetsRouter = require("express").Router();

const { assetsControllers, authControllers } = require("../controllers");

assetsRouter.get("/", assetsControllers.getAllAssets);
assetsRouter.get("/:id", assetsControllers.getOneAssetById);
assetsRouter.delete(
  "/:id",
  authControllers.verifyToken,
  assetsControllers.deleteOneAssetById
);
assetsRouter.post(
  "/",
  authControllers.verifyToken,
  assetsControllers.createOneAsset,
  assetsControllers.getOneAssetById
);
assetsRouter.post(
  "/upload",
  authControllers.verifyToken,
  assetsControllers.uploadOneAsset,
  assetsControllers.createOneAsset,
  assetsControllers.getOneAssetById
);

module.exports = assetsRouter;
