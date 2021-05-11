const { makeRequest } = require("../http-client");
const { generateResponse } = require("../utils/generateResponse");

async function handleCall({
  req,
  res,
  baseURL,
  url,
  requestMethod,
  headers = {},
}) {
  try {
    const serviceRes = await makeRequest({
      baseURL: baseURL,
    })({
      url: url,
      requestMethod: requestMethod,
      body: req.body,
      headers: {
        ...req.headers,
        headers,
      },
    });

    console.log(serviceRes);

    if (serviceRes.error) {
      return res.status(400).send(
        generateResponse({
          error: serviceRes.error,
        }),
      );
    }

    return res.status(200).send(
      generateResponse({
        data: serviceRes.data.data,
      }),
    );
  } catch (err) {
    return res.status(400).send(
      generateResponse({
        error: err,
      }),
    );
  }
}

module.exports = {
  handleCall: handleCall,
};
