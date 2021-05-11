const Router = require("express").Router;

const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.get("/", authMiddleware, userController.fetchUsers);

module.exports = {
  userRouter: userRouter,
};
