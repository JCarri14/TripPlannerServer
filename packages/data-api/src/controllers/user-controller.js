const { UserRepo, TripRepo } = require("../repositories");

async function signUp(req, res, next) {
  const { uid, email } = req.user;

  try {
    const response = await UserRepo.findOne({ email: email });

    if (response.error) {
      return res.status(400).send({
        data: null,
        error: response.error,
      });
    }

    if (response.data) {
      return res.status(200).send({
        data: "OK",
        error: null,
      });
    }

    await UserRepo.create({
      extraIds: {
        authServiceId: uid
      },
      email: email,
    });

    res.status(201).send({
      data: "OK",
      error: null,
    });
  } catch (error) {
    next(error);
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
  signUp: signUp,
  fetchUsers: fetchUsers,
  fetchUserById: fetchUserById,
  fetchUserTrips: fetchUserTrips,
  fetchUserFollowings: fetchUserFollowings,
};
