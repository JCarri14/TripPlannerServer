const { UserRepo } = require("../repositories");
const { encryptString } = require("../utils/encrypt");

async function signUp(req, res, next) {
  const { username, password, name, lastname, email, thumbnail } = req.body;

  try {
    const encryptedPassword = await encryptString(password);
    const response = await UserRepo.create({
      username: username,
      password: encryptedPassword,
      firstName: name,
      lastName: lastname,
      email: email,
      thumbnail: thumbnail,
    });

    console.log(response);
    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: response.data,
        error: null,
      });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function fetchUsers(req, res, next) {
  try {
    const dbResponse = await UserRepo.find();

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    res.status(200).send({
      data: dbResponse.data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

async function fetchUserById(req, res, next) {
  const {
    params: { id: userId },
    query: { fullFetch },
  } = req;

  try {
    const dbResponse = await UserRepo.findById(userId);

    if (dbResponse.error) {
      res.status(400).send({
        data: null,
        error: dbResponse.error,
      });
    }

    res.status(200).send({
      data: dbResponse.data,
      error: null,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signUp: signUp,
  fetchUsers: fetchUsers,
  fetchUserById: fetchUserById,
};
