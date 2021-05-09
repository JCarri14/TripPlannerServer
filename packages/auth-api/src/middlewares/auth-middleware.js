const { getAuthToken } = require("../services/auth/get-auth-token");
const { verifyAuthToken } = require("../services/auth/verify-auth-token");
const { UserRepo } = require("../repositories");

async function authMiddleware(req, res, next) {
  try {
    const bearerToken = await getAuthToken(req.headers);
    const userClaims = await verifyAuthToken(bearerToken);

    const user = await UserRepo.findOne({
      email: userClaims.email,
    });

    if (!user) {
      throw new Error("Invalid token");
    }

    req.user = {
      email: userClaims.email,
      id: user.data._id,
    };

    next();
  } catch (error) {
    res.status(401).send({
      data: null,
      error: error,
    });
  }
}

module.exports = {
  authMiddleware: authMiddleware,
};
