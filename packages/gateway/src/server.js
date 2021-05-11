const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { json } = require("body-parser");
const cors = require("cors");

const { config } = require("./config");
const { authController, baseController } = require("./controllers");
const { errorMiddleware } = require("./middlewares");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(cors());

app.post("/api/account/authenticate", authController.authenticate);

app.post("/api/account/register", (req, res) => {
  baseController.handleCall({
    req: req,
    res: res,
    baseURL: config.services.auth.url,
    url: "/account/register",
    requestMethod: "POST",
  });
});

app.post("/api/account/sign-out", (req, res) => {
  baseController.handleCall({
    req: req,
    res: res,
    baseURL: config.services.auth.url,
    url: "/account/sign-out",
    requestMethod: "POST",
  });
});

app.post("/api/account/refresh-token", (req, res) => {});

app.get("/api/users", (req, res) => {
  baseController.handleCall({
    req: req,
    res: res,
    baseURL: config.services.data.url,
    url: "/users",
    requestMethod: "GET",
  });
});

app.get("/api/users/:id", (req, res) => {});

app.get("/", (req, res) => {
  res.status(200).send({
    data: "hello-world",
  });
});

app.use(errorMiddleware);

module.exports = {
  app: app,
};
