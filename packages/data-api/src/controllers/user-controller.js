const { UserRepo, TripRepo } = require("../repositories");

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
        result = await trips.map(async (tripId) => {
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
        result = await following.map(async (tripId) => {
          const userResponse = await UserRepo.findById(tripId);
          if (userResponse.data) return userResponse.data;
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
  fetchUsers: fetchUsers,
  fetchUserById: fetchUserById,
  fetchUserTrips: fetchUserTrips,
  fetchUserFollowings: fetchUserFollowings,
};
