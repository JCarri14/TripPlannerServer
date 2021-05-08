const db = require("../models");
const normalizeDBResponse = require("../../utils/normalizeDBResponse");

class UserRepository {
  create(options) {
    return normalizeDBResponse(db.User.create(options));
  }

  update(queryFilter, queryData, queryOptions) {
    return normalizeDBResponse(
      db.User.updateOne(queryFilter, queryData, queryOptions),
    );
  }

  find(query) {
    return normalizeDBResponse(db.User.find(query, "-__v"));
  }

  findOne(query) {
    return normalizeDBResponse(db.User.findOne(query, "-__v"));
  }

  findById(id) {
    return normalizeDBResponse(db.User.findById(id, "-__v"));
  }
}

module.exports = new UserRepository();
