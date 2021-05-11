const { userRouter } = require("./user-routes");
const { accountRouter } = require("./account-routes");

module.exports = {
  accountRouter: accountRouter,
  userRouter: userRouter,
};
