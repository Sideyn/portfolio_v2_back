const projectsRouter = require("express").Router();

const { projectsControllers } = require("../controllers");

projectsRouter.get("/", projectsControllers.getAllProjects);
projectsRouter.get("/:id", projectsControllers.getOneProjectById);

projectsRouter.post(
  "/",
  projectsControllers.createOneProject,
  projectsControllers.getOneProjectById
);

projectsRouter.put(
  "/:id",
  projectsControllers.updateOneProjectById,
  projectsControllers.getOneProjectById
);

projectsRouter.delete("/:id", projectsControllers.deleteOneProject);

module.exports = projectsRouter;
