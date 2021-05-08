require("dotenv").config();

const {
  NODE_ENV = "development",
  MONGO_DB_URL_PRODUCTION,
  MONGO_DB_URL_DEVELOPMENT,
  MONGO_DB_URL_TEST,
  PORT = 4000,
  ENCRYPTION_SALT_DEVELOPMENT,
  ENCRYPTION_SALT_PRODUCTION,
} = process.env;

const baseConfig = {
  app: {
    port: PORT || 4000,
  },
};

const config = {
  development: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_DEVELOPMENT,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_DEVELOPMENT,
    },
  },
  production: {
    ...baseConfig,
    db: {
      url: MONGO_DB_URL_PRODUCTION,
    },
    encrypt: {
      salt: ENCRYPTION_SALT_PRODUCTION,
    },
  },
};

module.exports = {
  config: config[NODE_ENV],
};
