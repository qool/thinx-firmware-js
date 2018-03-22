/*
 * JavaScript client library for Remote Things Management using THiNX platform.
 */

var defaults = require("./conf/config.json");
console.log("Initializing remote log...");

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: defaults.rollbar.client_token,
  handleUncaughtExceptions: false,
  handleUnhandledRejections: false,
  captureUncaught: false,
  captureUnhandledRejections: false,
  payload: {
    environment: "development"
  }
});

var thinx = require('./lib/thinx/thinx.js');
thinx.init(defaults.thinx.api_key, defaults.thinx.owner);
thinx.setCheckinCallback(function(){
  console.log("Test completed, exiting...");
  process.exit();
});

Rollbar.info("thinx-lib-js started", {postId: 123});
