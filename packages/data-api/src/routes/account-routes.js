const Router = require("express").Router;

// const { authMiddleware } = require("../middlewares");
const { authController } = require("../controllers");

const accountRouter = Router();

accountRouter.post("/authenticate", authController.signIn);
accountRouter.post("/sign-out", authController.signOut);

module.exports = {
  accountRouter: accountRouter,
};
