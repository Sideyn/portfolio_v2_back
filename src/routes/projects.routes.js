const projectsRouter = require("express").Router();

const { projectsControllers, authControllers } = require("../controllers");

projectsRouter.get("/", projectsControllers.getAllProjects);
projectsRouter.get("/:id", projectsControllers.getOneProjectById);

projectsRouter.post(
  "/",
  authControllers.verifyToken,
  projectsControllers.createOneProject,
  projectsControllers.getOneProjectById
);

projectsRouter.put(
  "/:id",
  authControllers.verifyToken,
  projectsControllers.updateOneProjectById,
  projectsControllers.getOneProjectById
);

projectsRouter.delete(
  "/:id",
  authControllers.verifyToken,
  projectsControllers.deleteOneProject
);

module.exports = projectsRouter;
