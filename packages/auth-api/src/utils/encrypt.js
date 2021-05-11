const bcrypt = require("bcrypt");
const { config } = require("../config");

/**
 * Encrypts the string requested
 *
 * @param {String} data orm promise
 * @returns object encrypted data
 */
async function encryptString(data) {
  const salt = await bcrypt.genSalt(Number(config.encrypt.salt));
  const encryptedData = await bcrypt.hash(data, salt);
  return encryptedData;
}

async function compareEncrypted({ plainData, encryptedData }) {
  const isSame = await bcrypt.compare(plainData, encryptedData);
  return isSame;
}

module.exports = {
  encryptString: encryptString,
  compareEncrypted: compareEncrypted,
};
