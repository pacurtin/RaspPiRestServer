var express = require("express");
var path = require("path");
var app = express();
const spawn = require('child_process').spawn;
var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://rasppiserver:12345678@ds157509.mlab.com:57509/pirestserverdb', function(err, database){
	if (err) return console.log(err)
	db = database
	// Initialize the app.
	var server = app.listen(process.env.PORT || 8080, function () {
		var port = server.address().port;
		console.log("Node rest server now running on port", port);
	});
})

app.post("/lightsOn", function(req, res) {
	var collection = db.collection('lightStatus');
	collection.findOne({mykey:1}, function(err, item) {
		var status = item.status;
		if (status == 'lightsOff'){
			const lightOn = spawn('python', ["/home/pi/Desktop/StepperMotorLightSwitch/LightsOn.py"]);
			collection.update({mykey:1},{$set:{status:'lightsOn'}}, {w:1}, function(err, result) {});
			console.log("Turning lights on");
			res.status(200).send("Turning lights on");}
		else
			res.status(200).send("Lights already on(probably...)");
	});
});

app.post("/lightsOff", function(req, res) {
	var collection = db.collection('lightStatus');
	collection.findOne({mykey:1}, function(err, item) {
		var status = item.status;
		if (status == 'lightsOn'){
			const lightOff = spawn('python', ["/home/pi/Desktop/StepperMotorLightSwitch/LightsOff.py"]);
			collection.update({mykey:1},{$set:{status:'lightsOff'}}, {w:1}, function(err, result) {});
			console.log("Turning lights off");
			res.status(200).send("Turning lights off");}
		else
			res.status(200).send("Lights already off(probably...)");
	});
});
