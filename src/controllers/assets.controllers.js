const multer = require("multer");
const { Assets } = require("../models");

const getAllAssets = async (req, res) => {
  try {
    const [results] = await Assets.findManyAssets();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneAssetById = async (req, resp) => {
  const id = req.params.id ? req.params.id : req.asset_id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await Assets.findOneAssetById(id);
    if (result.length === 0) {
      resp.status(404).send(`Image ${id} non trouvé`);
    } else {
      resp.status(statusCode).json(result[0]);
    }
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const uploadOneAsset = async (req, resp, next) => {
  const assetStorage = multer.diskStorage({
    destination: (_req, asset, cb) => {
      cb(null, `public/assets/`);
    },
    filename: (_, asset, cb) => {
      cb(null, `${asset.originalname}`);
    },
  });

  const upload = multer({ storage: assetStorage }).single("asset");
  upload(req, resp, (err) => {
    if (err) {
      resp.status(500).json(err);
    } else {
      console.log(req.file);
      next();
    }
  });
};

const createOneAsset = async (req, res, next) => {
  const newAsset = {
    asset_name: req.file.filename,
    source: "image",
  };

  try {
    const [result] = await Assets.createOneAsset(newAsset);
    req.assets_id = result.insertId;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteOneAssetById = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Assets.deleteOneAssetById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Image ${id} non trouvé`);
    } else res.status(200).send(`Image ${id} supprimé`);
  } catch (err) {
    res
      .status(500)
      .send(`Erreur lors de la suppression de l'image ${err.message}`);
  }
};

module.exports = {
  getAllAssets,
  getOneAssetById,
  uploadOneAsset,
  createOneAsset,
  deleteOneAssetById,
};
