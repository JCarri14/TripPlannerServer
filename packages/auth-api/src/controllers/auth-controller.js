const randtoken = require("rand-token");
const { session } = require("../session");
const { UserRepo } = require("../repositories");
const { compareEncrypted } = require("../utils/encrypt");
const {
  generateAccessToken,
} = require("../services/auth/generate-access-token");
const { generateResponse } = require("../utils/generateResponse");

async function authenticate(req, res, next) {
  const { email, password: inputPassword } = req.body;

  try {
    const userResponse = await UserRepo.findOne({
      email: email,
    });

    if (userResponse.error) {
      return res.status(400).send(
        generateResponse({
          error: userResponse.error,
        }),
      );
    }

    if (userResponse.data) {
      const { password } = userResponse.data;

      const isUser = await compareEncrypted({
        plainData: inputPassword,
        encryptedData: password,
      });

      if (isUser) {
        const accessToken = generateAccessToken({ email: email });
        const refreshToken = randtoken.uid(256);
        session.refreshTokens[refreshToken] = email;

        if (accessToken) {
          return res.status(200).send(
            generateResponse({
              data: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                id: userResponse.data._id,
              },
            }),
          );
        } else {
          return res.status(501).send(
            generateResponse({
              error: "Login error, something went wrong!",
            }),
          );
        }
      } else {
        return res.status(401).send(
          generateResponse({
            error: "Login error, user and/or password not correct!",
          }),
        );
      }
    }
  } catch (error) {
    // console.log(error);
    next(error);
  }
}

async function updateAccessToken(req, res, next) {
  const { email, refreshToken } = req.body;

  if (
    refreshToken in session.refreshTokens &&
    session.refreshTokens[refreshToken] == email
  ) {
    const accessToken = generateAccessToken({ email: email });

    if (accessToken) {
      return res.status(200).send(
        generateResponse({
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        }),
      );
    }
  }
  return res.status(501).send(
    generateResponse({
      error: "Something went wrong!",
    }),
  );
}

async function rejectToken(req, res, next) {
  const { refreshToken } = req.body;

  if (refreshToken in session.refreshTokens) {
    delete session.refreshTokens[refreshToken];
    return res.status(204).send();
  }
  return res.status(501).send(
    generateResponse({
      error: "Something went wrong!",
    }),
  );
}

module.exports = {
  authenticate: authenticate,
  updateAccessToken: updateAccessToken,
  rejectToken: rejectToken,
};
