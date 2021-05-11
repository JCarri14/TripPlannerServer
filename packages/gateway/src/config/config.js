require("dotenv").config();

const {
  NODE_ENV = "development",
  GATEWAY_PORT,
  AUTH_SERVICE_BASE_URL,
  DATA_SERVICE_BASE_URL,
} = process.env;

const baseConfig = {
  app: {
    port: GATEWAY_PORT,
  },
  services: {
    auth: {
      url: AUTH_SERVICE_BASE_URL,
    },
    data: {
      url: DATA_SERVICE_BASE_URL,
    },
  },
};

const config = {
  development: {
    ...baseConfig,
  },
  production: {
    ...baseConfig,
  },
};

module.exports = {
  config: config[NODE_ENV],
};
