const jwt = require("jsonwebtoken");
require("dotenv").config();

const { ACCESS_TOKEN_SECRET } = process.env;

function generateAccessToken(data) {
  return jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: "1800s" });
}

module.exports = { generateAccessToken };
