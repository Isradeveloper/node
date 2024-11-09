const { getAge } = require("./get-age.plugin");
const { getUUID } = require("./get-id.plugin");
const { buildHttpClient } = require("./http-client.plugin");

module.exports = {
  getAge,
  getUUID,
  buildHttpClient,
};
