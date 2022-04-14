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
  projectsControllers.createOneEvent,
  linkControllers.createOneLink,
  projectsControllers.getOneEventById
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
  linkControllers.createOneLink,
  projectsControllers.deleteOneProject
);

module.exports = projectsRouter;
