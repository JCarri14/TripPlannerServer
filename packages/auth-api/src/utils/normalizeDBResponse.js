/**
 * Normalizes mongodb response
 *
 * @param {Promise} promise orm promise
 * @returns object { data: null | Promise, error: null | error.message }
 */
async function normalizeDBResponse(promise) {
  let result = {
    data: null,
    error: null,
  };

  try {
    const data = await promise;
    result.data = data;
  } catch (error) {
    result.error = error.message;
  }

  return result;
}

module.exports = normalizeDBResponse;
