const Logger = require("r7insight_node");
const keys = require("./config/keys");

let logger = null;

function init() {
  if (logger) {
    return logger;
  }

  logger = new Logger({
    token: keys.logentriesApiKey,
    region: "us",
  });

  return logger;
}

function getLogger() {
  if (!logger) {
    return init();
  }
  return logger;
}

module.exports = { getLogger };
