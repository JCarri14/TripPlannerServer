const { makeRequest } = require("../http-client");
const { config } = require("../config");
const { generateResponse } = require("../utils/generateResponse");

async function authenticate(req, res, next) {
  const { email } = req.body;

  try {
    const authRes = await makeRequest({
      baseURL: config.services.auth.url,
    })({
      url: "/account/authenticate",
      requestMethod: "POST",
      body: req.body,
    });

    if (authRes.error) {
      return res.status(400).send(
        generateResponse({
          error: authRes.error,
        }),
      );
    }

    if (authRes.data) {
      const dataRes = await makeRequest({
        baseURL: config.services.data.url,
      })({
        url: "/account/authenticate",
        requestMethod: "POST",
        body: {
          email: email,
          authId: authRes.data.id,
        },
      });

      if (dataRes.error) {
        return res.status(400).send(
          generateResponse({
            error: dataRes.error,
          }),
        );
      }

      if (dataRes.data) {
        return res.status(201).send(
          generateResponse({
            data: authRes.data,
          }),
        );
      }
    }
  } catch (err) {
    return res.status(400).send(
      generateResponse({
        error: err,
      }),
    );
  }
}

module.exports = {
  authenticate: authenticate,
};
