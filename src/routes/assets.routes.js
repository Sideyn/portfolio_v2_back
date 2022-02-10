const assetsRouter = require("express").Router();

const { assetsControllers } = require("../controllers");

assetsRouter.get("/", assetsControllers.getAllAssets);
assetsRouter.get("/:id", assetsControllers.getOneAssetById);
assetsRouter.delete("/:id", assetsControllers.deleteOneAssetById);
assetsRouter.post(
  "/",
  assetsControllers.createOneAsset,
  assetsControllers.getOneAssetById
);
assetsRouter.post(
  "/upload",
  assetsControllers.uploadOneAsset,
  assetsControllers.createOneAsset,
  assetsControllers.getOneAssetById
);

module.exports = assetsRouter;
