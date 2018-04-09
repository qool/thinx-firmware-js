/*
 * JavaScript client library for Remote Things Management using THiNX platform.
 */

var defaults = require("./conf/config.json");
var thinx = require('./lib/thinx/thinx.js');

/*
  Custom settings START
*/

thinx.setCheckinInterval(300);
thinx.setLocation(51,14);

thinx.setMQTTCallback(function(message) {
  // incoming mqtt message
});

thinx.setPushConfigCallback(function(configuration) {
  // incoming configuration change
});

thinx.setFinalizeCallback(function() {
  // mqtt connection estabilished
  console.log("// Finalize callback");

  /*
    SetStatus message can be processed by transformers.
    Set one at https://rtm.thinx.cloud
  */
  thinx.setStatus("[SLACKME]");
});

thinx.setCheckinCallback(function() {
  // checkin completed
  console.log("// Checkin callback")
});

/*
  Custom settings END
*/

thinx.init(defaults.thinx.api_key, defaults.thinx.owner);

// get the necessary modules
var gpio = require('omega_gpio');
var Button = gpio.Button;
var LED = gpio.LED;

// Button connected to pin 23 that is wired to read a digital high when pressed
var myButton = new Button(3);

// LED connected to pin 26 that is wired so that it turns on when the output
// pin is set to a digital low
var myLED = new LED(1, {on_when:"low"});

// Clean up the pins on exit
process.on('SIGINT', function(){
  console.log("Cleaning up...");
    myButton.destroy();
    myLED.destroy();
    process.exit();
});

// Infinite loop checking the button
var checkButton = function(){
  if(myButton.isPressed()){
    myLED.on();
  }
  else{
    myLED.off();
  }
  setImmediate(checkButton);
}

setImmediate(checkButton);
