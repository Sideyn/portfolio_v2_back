const { Selection } = require("../models");

const getAllLinks = async (req, res) => {
  try {
    const [results] = await Selection.findMany();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneLinkById = async (req, res, next) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await Selection.findOneLinkById(id);
    if (result.length === 0) {
      res.status(404).send(`Lien intermédiaire avec l'id ${id} non trouvé`);
    } else {
      res.status(statusCode).json(result[0]);
      next();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createOneLink = async (req, res, next) => {
  const assets_id = req.body ? req.body.assets_id : req.assets_id;
  const { projects_id } = req;
  console.log(assets_id, projects_id);
  if (assets_id && projects_id) {
    try {
      await Selection.createOne({ assets_id, projects_id });
      next();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  } else if (projects_id && !assets_id) {
    next();
  } else {
    res.status(404).send("erreur en récupérant les id");
  }
};

const deleteOneLink = async (req, res, next) => {
  const { projects_id } = req.params;
  try {
    await Selection.deleteOneById(projects_id);
    next();
  } catch (err) {
    res.status(500).send(`Erreur lors de la suppression`, err.message);
  }
};

module.exports = {
  getAllLinks,
  getOneLinkById,
  createOneLink,
  deleteOneLink,
};
