const axios = require("axios");

const axiosInst = axios;

function updateHeaders(headers) {
  axiosInst.defaults.headers.common = {
    ...axiosInst.defaults.headers.common,
    ...headers,
  };
}

function defaultResponse() {
  return {
    isSuccessful: false,
    data: null,
    error: null,
  };
}

async function normalizeResponse(promise = Promise.resolve) {
  let result = defaultResponse();
  let res = null;

  try {
    res = await promise;
    result = { ...result, ...res.data };
  } catch (err) {
    result.message = err.message;
  }
  return result;
}

function makeRequest({
  httpClient = axiosInst,
  baseURL,
  baseHeaders = {
    Accept: "application/json",
  },
}) {
  return async function request({
    url = "/",
    requestMethod = "GET",
    body = {},
    headers = {},
  }) {
    return normalizeResponse(
      httpClient({
        url: baseURL + url,
        method: requestMethod,
        data: body,
        headers: {
          ...baseHeaders,
          ...headers,
        },
        validateStatus: (status) => {
          return status >= 200 && status < 400;
        },
      }),
    );
  };
}

module.exports = {
  updateHeaders: updateHeaders,
  makeRequest: makeRequest,
};
