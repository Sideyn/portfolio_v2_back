const { Assets } = require("../models");
// J'importe multer pour pouvoir upload des fichiers
const multer = require("multer");

// Récupére tous les assets de la table assets puis envoies les résultats au format JSON
const getAllAssets = async (req, res) => {
  try {
    const [results] = await Assets.findManyAssets();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Récupére l'asset par son id
const getOneAssetById = async (req, resp) => {
  const id = req.params.id ? req.params.id : req.assets_id;
  try {
    const [result] = await Assets.findOneAssetById(id);
    if (result.length === 0) {
      resp.status(404).send(`Image ${id} non trouvé`);
    } else {
      resp.status(200).json(result[0]);
    }
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

// Télècharge un fichier et le stocke
const uploadOneAsset = async (req, resp, next) => {
  // configuration du dossier où stocker l'image et le nom de l'image
  const assetStorage = multer.diskStorage({
    destination: (_req, asset, cb) => {
      cb(null, `public/assets/`);
    },
    filename: (_, asset, cb) => {
      cb(null, `${asset.originalname}`);
    },
  });
  // Je configure multer pour qu'il sauvegarde bien un seul fichier
  const upload = multer({ storage: assetStorage }).single("asset");
  upload(req, resp, (err) => {
    if (err) {
      resp.status(500).json(err);
    } else {
      next();
    }
  });
};

// Crée un asset
const createOneAsset = async (req, res, next) => {
  let { type } = req.query;
  type =
    type === "image/png"
      ? "image/png"
      : "image/jpg"
      ? "image/jpg"
      : "image/jpeg";

  const newAsset = {
    asset_name: req.file.filename,
    source:
      type === "image/png"
        ? `public/assets/${req.file.filename}`
        : "image/jpg"
        ? `public/assets/${req.file.filename}`
        : "image/jpeg"
        ? `public/assets/${req.file.filename}`
        : null,
  };
  if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
    try {
      const [result] = await Assets.createOneAsset(newAsset);
      req.assets_id = result.insertId;
      next();
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(406).send("Entrer un type correct d'image");
  }
};

// Supprime un asset
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
