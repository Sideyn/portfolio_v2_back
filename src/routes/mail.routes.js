const mailRouter = require("express").Router();
const { mailControllers } = require("../controllers");

mailRouter.post("/", mailControllers.send);

module.exports = mailRouter;
