function generateResponse({ data = null, error = null }) {
  return {
    isSuccessful: data ? true : false,
    data: data,
    error: error,
  };
}

module.exports = {
  generateResponse: generateResponse,
};
