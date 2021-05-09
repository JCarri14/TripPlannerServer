const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env;

async function verifyAuthToken(token) {
  return new Promise(function verifyAuthTokenHandler(resolve, reject) {
    const res = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!res) reject("JWT validation error!");
    resolve(res);
  });
}

module.exports = {
  verifyAuthToken: verifyAuthToken,
};
