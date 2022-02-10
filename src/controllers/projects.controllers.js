const { Projects } = require("../models");

const getAllProjects = async (req, res) => {
  try {
    const [results] = await Projects.findManyProjects();
    res.json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneProjectById = async (req, res) => {
  const id = req.params.id ? req.params.id : req.projects_id;
  const statusCode = req.method === "POST" ? 201 : 200;

  let projectsResult;
  let assetsResult;
  try {
    [projectsResult] = await Projects.findOneProjectById(id);
  } catch (err) {
    res.status(500).send(err.message);
  }
  try {
    [assetsResult] = await Projects.findAssetsByProjectId(id);
  } catch (err) {
    res.status(500).send(err.message);
  }
  if (projectsResult.length === 0) {
    res.status(404).send(`Projet ${id} non trouvé`);
  } else if (assetsResult.length === 0) {
    res.status(statusCode).json(projectsResult[0]);
  } else {
    projectsResult[0].assets = assetsResult[0];
    res.status(statusCode).json(projectsResult[0]);
  }
};

const createOneProject = async (req, res, next) => {
  const { assets_id, title, link, description } = req.body;
  try {
    const [result] = await Projects.createOne({
      assets_id,
      title,
      link,
      description,
    });
    req.projects_id = result.insertId;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateOneProjectById = async (req, res, next) => {
  const { id } = req.params;
  const { title, link, description } = req.body;
  const newProject = {};
  if (title) {
    newProject.title = title;
  }
  if (link) {
    newProject.link = link;
  }
  if (description) {
    newProject.description = description;
  }
  try {
    await Projects.updateOne(newProject, parseInt(id, 10));
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteOneProject = async (req, res, next) => {
  const projects_id = req.params.id;
  try {
    const [result] = await Projects.deleteOneById(projects_id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Projet ${projects_id} non trouvé`);
    } else {
      res.status(200).send(`Projet ${projects_id} supprimé`);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllProjects,
  getOneProjectById,
  createOneProject,
  deleteOneProject,
  updateOneProjectById,
};
