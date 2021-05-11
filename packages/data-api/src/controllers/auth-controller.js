const { UserRepo } = require("../repositories");
const { encryptString } = require("../utils/encrypt");
const { generateResponse } = require("../utils/generateResponse");

async function signIn(req, res, next) {
  const { email, authId } = req.body;

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
      return res.status(200).send(
        generateResponse({
          data: userResponse.data,
        }),
      );
    }

    await UserRepo.create({
      extraIds: {
        auth_id: authId,
      },
      email: email,
    });

    res.status(201).send(generateResponse({ data: "OK" }));
  } catch (error) {
    next(error);
  }
}

async function signUp(req, res, next) {
  const { username, password, name, lastname, email, thumbnail } = req.body;

  const encryptedPassword = await encryptString(password);
  try {
    const response = await UserRepo.create({
      username: username,
      password: encryptedPassword,
      firstName: name,
      lastName: lastname,
      email: email,
      thumbnail: thumbnail,
    });

    if (response.error) {
      return res.status(400).send(
        generateResponse({
          error: response.error,
        }),
      );
    }

    if (response.data) {
      return res.status(200).send(
        generateResponse({
          data: response.data,
        }),
      );
    }
  } catch (err) {
    next(err);
  }
}

async function signOut(req, res) {
  req.signOut();

  res.status(200).send(
    generateResponse({
      data: "OK",
    }),
  );
}

module.exports = {
  signIn: signIn,
  signUp: signUp,
  signOut: signOut,
};
