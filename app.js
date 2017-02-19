var express = require("express");
var path = require("path");
var app = express();
const spawn = require('child_process').spawn;
 
// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
var port = server.address().port;
console.log("App now running on port", port);
});
 
app.post("/lightsOn", function(req, res) {
	console.log("Turning lights on");
    res.status(200).send("Turning lights on");
    const lightOn = spawn('python', ["/home/pi/Desktop/StepperMotorLightSwitch/LightsOn.py"]);
});
 
app.post("/lightsOff", function(req, res) {
    console.log("Turning lights off");
    res.status(200).send("Turning lights off");
    const lightOn = spawn('python', ["/home/pi/Desktop/StepperMotorLightSwitch/LightsOff.py"]);
});
