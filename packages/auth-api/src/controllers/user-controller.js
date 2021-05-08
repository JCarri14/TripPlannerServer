const { UserRepo, TripRepo } = require("../repositories");
const { encryptString, compareEncrypted } = require("../utils/encrypt");

async function signIn(req, res, next) {
  const { email, password: inputPassword } = req.body;

  try {
    const userResponse = await UserRepo.findOne({
      email: email,
      password: inputPassword,
    });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      const { password } = userResponse.data;

      const isUser = await compareEncrypted({
        plainData: inputPassword,
        encryptedData: password,
      });

      if (isUser) {
        return res.status(200).send({
          data: response.data,
          error: null,
        });
      } else {
        return res.status(401).send({
          data: null,
          error: "Login error, user and/or password not correct!",
        });
      }
    }
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
    next(err);
  }
}

async function signOut(req, res) {
  req.signOut();

  res.status(200).send({
    data: "OK",
    error: null,
  });
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

async function fetchUserTrips(req, res, next) {
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

    if (dbResponse.data) {
      let result = [];
      const { trips } = dbResponse.data;
      result = trips;

      if (fullFetch) {      
        result = trips.map((tripId) => {
          const tripResponse = await TripRepo.findById(tripId);
          if (tripResponse.data) return tripResponse.data;
          return null;
        });
      }
      
      res.status(200).send({
        data: result,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

async function fetchUserFollowings(req, res, next) {
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

    if (dbResponse.data) {
      let result = [];
      const { following } = dbResponse.data;

      result = following;

      if (fullFetch) {      
        result = following.map((tripId) => {
          const userResponse = await UserRepo.findById(tripId);
          if (userResponse.data) return tripResponse.data;
          return null;
        });
      }
      
      res.status(200).send({
        data: result,
        error: null,
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  signIn: signIn,
  signUp: signUp,
  signOut: signOut,
  fetchUsers: fetchUsers,
  fetchUserById: fetchUserById,
};
