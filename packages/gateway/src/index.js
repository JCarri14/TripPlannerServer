const { app } = require("./server");
const { config } = require("./config");

if (!config.app.port) {
  throw new Error("App config is invalid");
}

app.listen(config.app.port, () => {
  console.log(`Server listening on ${config.app.port}`);
});
