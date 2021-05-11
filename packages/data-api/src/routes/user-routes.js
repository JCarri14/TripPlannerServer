const Router = require("express").Router;

// const { authMiddleware } = require("../middlewares");
const { userController } = require("../controllers");

const userRouter = Router();

userRouter.get("/", userController.fetchUsers);

userRouter.get("/:id", userController.fetchUserById);

module.exports = {
  userRouter: userRouter,
};
