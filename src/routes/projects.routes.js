const projectsRouter = require("express").Router();

const {
  projectsControllers,
  authControllers,
  linkControllers,
} = require("../controllers");

projectsRouter.get("/", projectsControllers.getAllProjects);
projectsRouter.get("/:id", projectsControllers.getOneProjectById);

projectsRouter.post(
  "/",
  authControllers.verifyToken,
  projectsControllers.createOneProject,
  linkControllers.createOneLink,
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
  linkControllers.deleteOneLink,
  projectsControllers.deleteOneProject
);

module.exports = projectsRouter;
