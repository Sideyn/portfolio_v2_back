const { Projects } = require("../models");

const getAllProjects = async (req, res) => {
  try {
    const [results] = await Projects.findManyProjects();
    const projects = [];
    results.forEach((project) => {
      const projectWithAssets = {
        id: project.id,
        title: project.title,
        link: project.link,
        description: project.description,
        asset: [{ source: project.source, title: project.asset_name }],
      };
      projects.push(projectWithAssets);
    });
    res.json(projects);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneProjectById = async (req, res) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;
  try {
    const [result] = await Projects.findOneProjectByAssetId(id);
    const projects = [];
    result.forEach((project) => {
      const projectWithAssets = {
        id: project.id,
        title: project.title,
        link: project.link,
        description: project.description,
        asset: [{ source: project.source, title: project.asset_name }],
      };
      projects.push(projectWithAssets);
    });
    res.json(projects);
    if (result.length === 0) {
      res.status(404).send(`Projet avec l'id ${id} non trouvé`);
    } else {
      res.status(statusCode).json(result[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createOneProject = async (req, res, next) => {
  const { title, link, description, assets_id } = req.body;
  try {
    const [result] = await Projects.createOne({
      title,
      link,
      description,
      assets_id,
    });
    req.projects_id = result.insertId;
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateOneProjectById = async (req, res, next) => {
  const { id } = req.params;
  const { title, link, description, assets_id } = req.body;
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
  if (assets_id) {
    newProject.assets_id = assets_id;
  }
  try {
    await Projects.updateOne(newProject, parseInt(id, 10));
    next();
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteOneProject = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Projects.deleteOneById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Projet ${id} non trouvé`);
    } else {
      res.status(200).send(`Projet ${id} supprimé`);
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
