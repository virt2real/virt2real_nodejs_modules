fs = require('fs');
fh_export = fs.openSync("/dev/v2r_pins", "w", 0644);

var extpwm_driver;

/* period for PWMs */
var period = 1190;
var period_external = 4095;

/* freq divider for external pwm */
var divider = 50;
var freq = parseInt(25000000 / (divider + 1) / 4096);
var tic =  1 / freq / 4096;

var address;

/* max voltage */
var REF_VOLTAGE = 20;

/* set I2C address */
exports.setAddress = function (addr) {
	address = parseInt(addr);
	extpwm_driver = fs.createWriteStream("/sys/bus/i2c/devices/1-00" + address.toString(16) + "/any");
}

/* set I2C PWM divider */
exports.setDivider = function (value) {
	divider = value;
	freq = parseInt(25000000 / (divider + 1) / 4096);
	tic =  1 / freq / 4096;
	fs.writeFileSync("/sys/bus/i2c/devices/1-00" + address.toString(16) + "/freq", divider);
	console.log("freq divider set to " + value);
}

/* set I2C PWM frequency */
exports.setFreq = function (value) {
	freq = value;
	divider = Math.round(25000000 / (4096 * freq)) -1;
	tic =  1 / freq / 4096;
	fs.writeFileSync("/sys/bus/i2c/devices/1-00" + address.toString(16) + "/freq", divider);
	console.log("freq set to " + value);
}


/* motorshield init */
exports.init = function () {

	fs.writeSync(fh_export, "set con 43 pwm0", null);
	fs.writeSync(fh_export, "set con 44 pwm1", null);
	fs.writeSync(fh_export, "set con 19 pwm2", null);
	fs.writeSync(fh_export, "set con 42 pwm3", null);

	/* init external pwm*/
	fs.writeFileSync("/sys/bus/i2c/devices/1-00" + address.toString(16) + "/init", "1");

	/* turn off sleep on external pwm*/
	fs.writeFileSync("/sys/bus/i2c/devices/1-00" + address.toString(16) + "/sleep", "0");

	/* set default limits for servos */
	for (var i = 1; i <= 8; i++) {
		exports.J17.setLimits (i, 600, 2800, 180);
	}

}

/* get motorshield voltage from ADC0*/
exports.getVoltage = function () {
	var v = parseInt(fs.readFileSync("/proc/v2r_adc/0"));
	var voltage = v * REF_VOLTAGE / (1 << 10);
	return voltage.toFixed(3);
}


/* Bipolar Motors */

var J1 = [
	{
		"id": 0,
		"type": 0,
		"name": "FAKE",
	},
	{
		"id": 1,
		"type": 1,
		"name": "BIPOLARMOTOR1",
		"pwm": 0,
		"pin": 43,
		"dir1": 41,
		"dir2": 40,
	},
	{
		"id": 2,
		"type": 1,
		"name": "BIPOLARMOTOR2",
		"pwm": 1,
		"pin": 44,
		"dir1": 39,
		"dir2": 37,
	},
	{
		"id": 3,
		"type": 2,
		"name": "BIPOLARMOTOR3",
		"pwm": 12,
		"pin": -1,
		"dir1": 31,
		"dir2": 30,
	},
	{
		"id": 4,
		"type": 2,
		"name": "BIPOLARMOTOR4",
		"pwm": 13,
		"pin": -1,
		"dir1": 27,
		"dir2": 26,
	},
	{
		"id": 5,
		"type": 1,
		"name": "BIPOLARMOTOR5",
		"pwm": 2,
		"pin": 19,
		"dir1": 36,
		"dir2": 35,
	},
	{
		"id": 6,
		"type": 1,
		"name": "BIPOLARMOTOR6",
		"pwm": 3,
		"pin": 42,
		"dir1": 34,
		"dir2": 33,
	},
	{
		"id": 7,
		"type": 2,
		"name": "BIPOLARMOTOR7",
		"pwm": 14,
		"pin": -1,
		"dir1": 65,
		"dir2": 61,
	},
	{
		"id": 8,
		"type": 2,
		"name": "BIPOLARMOTOR8",
		"pwm": 15,
		"pin": -1,
		"dir1": 64,
		"dir2": 63,
	},

];

exports.J1 = J1;
exports.J1.setSpeed = function(id, value) {

	var speed = 0;

	if (J1[id].type == 1) {

		if (value)
			speed = parseInt(period * value / 100);
		else 
			speed = 0;

		var buffer = new Buffer(6);
		buffer[0] = 7;
		buffer[1] = J1[id].pwm;
		buffer[2] = speed & 0xFF;
		buffer[3] = (speed >> 8) & 0xFF;
		buffer[4] = period & 0xFF;
		buffer[5] = (period >> 8) & 0xFF;
		fs.writeSync(fh_export, buffer, null, 6);

	} else

	if (J1[id].type == 2) {

		if (value)
			speed = parseInt(period_external * value / 100);
		else 
			speed = 0;

		var buffer = new Buffer(6);
		buffer[0] = 1;
		buffer[1] = J1[id].pwm;
		buffer[2] = 0;
		buffer[3] = 0;
		buffer[4] = speed & 0xFF;
		buffer[5] = (speed >> 8) & 0xFF;
		if (extpwm_driver)
			extpwm_driver.write(buffer);
	}
}

exports.J1.setDirection = function(id, val1, val2) {
		var buffer = new Buffer(3);
		var buffer1 = new Buffer(3);
		buffer[0] = 1;
		buffer[1] = J1[id].dir1;
		buffer[2] = 1 | (val1 << 1);

		buffer1[0] = 1;
		buffer1[1] = J1[id].dir2;
		buffer1[2] = 1 | (val2 << 1);
		fs.writeSync(fh_export, buffer, null, 3);
		fs.writeSync(fh_export, buffer1, null, 3);
}


/* Unipolar Motors */

var J16 = [
	{
		"id": 0,
		"type": 0,
		"name": "FAKE",
	},
	{
		"id": 1,
		"type": 2,
		"name": "UNIPOLARMOTOR1",
		"pwm": 8,
		"pin": -1,
	},
	{
		"id": 2,
		"type": 1,
		"name": "UNIPOLARMOTOR2",
		"pwm": -1,
		"pin": 32,
	},
	{
		"id": 3,
		"type": 2,
		"name": "UNIPOLARMOTOR3",
		"pwm": 9,
		"pin": -1,
	},
	{
		"id": 4,
		"type": 1,
		"name": "UNIPOLARMOTOR4",
		"pwm": -1,
		"pin": 20,
	},
	{
		"id": 5,
		"type": 2,
		"name": "UNIPOLARMOTOR5",
		"pwm": 10,
		"pin": -1,
	},
	{
		"id": 6,
		"type": 1,
		"name": "UNIPOLARMOTOR6",
		"pwm": -1,
		"pin": 62,
	},
	{
		"id": 7,
		"type": 2,
		"name": "UNIPOLARMOTOR7",
		"pwm": 11,
		"pin": -1,
	},
	{
		"id": 8,
		"type": 1,
		"name": "UNIPOLARMOTOR8",
		"pwm": -1,
		"pin": 18,
	},
];

exports.J16 = J16;
exports.J16.setSpeed = function(id, value) {

	var speed;

	if (J16[id].type == 1) {

		speed = parseInt(period_external * value / 100);
		var val = (speed > 127) ? 1 : 0;

		var buffer = new Buffer(3);
		buffer[0] = 1;
		buffer[1] = J16[id].pin;
		buffer[2] = val << 1 | 1;
		fs.writeSync(fh_export, buffer, null, 3);

	} else

	if (J16[id].type == 2) {

		if (value)
			speed = parseInt(period_external * value / 100);
		else 
			speed = 0;

		var buffer = new Buffer(6);
		buffer[0] = 1;
		buffer[1] = J16[id].pwm;
		buffer[2] = 0;
		buffer[3] = 0;
		buffer[4] = speed & 0xFF;
		buffer[5] = (speed >> 8) & 0xFF;
		if (extpwm_driver)
			extpwm_driver.write(buffer);
	}

}

exports.J16.getSpeed = function(id, value) {

	if (J16[id].type == 1) {

		var val = fs.readFileSync("/proc/v2r_pins/" + J16[id].pin);
		return (val[0]==48) ? 0 : 1;

	} else

	if (J16[id].type == 2) {
	}
}


/* Servo Motors */

var J17 = [
	{
		"id": 0,
		"name": "FAKE",
		"min": 0,
		"max": 0,
		"min_abs": 0,
		"max_abs": 0,
		"positions": 0,
		"scale": 0,
		"value": 0,
		"value_abs": 0
	},
	{
		"id": 1,
		"name": "SERVO1",
		"pwm": 0,
		"min": 0,
		"max": 0,
		"min_abs": 0,
		"max_abs": 0,
		"positions": 0,
		"scale": 0,
		"value": 0,
		"value_abs": 0
	},
	{
		"id": 2,
		"name": "SERVO2",
		"pwm": 1,
		"min": 0,
		"max": 0,
		"min_abs": 0,
		"max_abs": 0,
		"positions": 0,
		"scale": 0,
		"value": 0,
		"value_abs": 0
	},
	{
		"id": 3,
		"name": "SERVO3",
		"pwm": 2,
		"min": 0,
		"max": 0,
		"min_abs": 0,
		"max_abs": 0,
		"positions": 0,
		"scale": 0,
		"value": 0,
		"value_abs": 0
	},
	{
		"id": 4,
		"name": "SERVO4",
		"pwm": 3,
		"min": 0,
		"max": 0,
		"min_abs": 0,
		"max_abs": 0,
		"positions": 0,
		"scale": 0,
		"value": 0,
		"value_abs": 0
	},
	{
		"id": 5,
		"name": "SERVO5",
		"pwm": 4,
		"min": 0,
		"max": 0,
		"min_abs": 0,
		"max_abs": 0,
		"positions": 0,
		"scale": 0,
		"value": 0,
		"value_abs": 0
	},
	{
		"id": 6,
		"name": "SERVO6",
		"pwm": 5,
		"min": 0,
		"max": 0,
		"min_abs": 0,
		"max_abs": 0,
		"positions": 0,
		"scale": 0,
		"value": 0,
		"value_abs": 0
	},
	{
		"id": 7,
		"name": "SERVO7",
		"pwm": 6,
		"min": 0,
		"max": 0,
		"min_abs": 0,
		"max_abs": 0,
		"positions": 0,
		"scale": 0,
		"value": 0,
		"value_abs": 0
	},
	{
		"id": 8,
		"name": "SERVO8",
		"pwm": 7,
		"min": 0,
		"max": 0,
		"min_abs": 0,
		"max_abs": 0,
		"positions": 0,
		"scale": 0,
		"value": 0,
		"value_abs": 0
	},
];

exports.J17 = J17;


exports.J17.setLimits = function(id, minimal, maximal, positions) {
	J17[id].min = minimal;
	J17[id].max = maximal;
	J17[id].positions = positions;

	J17[id].min_abs = parseInt(minimal / 1000000 / tic);
	J17[id].max_abs = parseInt(maximal / 1000000 / tic);

	J17[id].scale = (J17[id].max_abs - J17[id].min_abs) / J17[id].positions;

}


exports.J17.setPos = function(id, value) {

	if (value < 0) value = 0;
	if (value > (J17[id].positions - 1) ) value = J17[id].positions - 1;

	var duty = parseInt(J17[id].min_abs + J17[id].scale * value);

	J17[id].value = value;
	J17[id].value_abs = duty;

	var buffer = new Buffer(6);
	buffer[0] = 1;
	buffer[1] = J17[id].pwm;
	buffer[2] = 0;
	buffer[3] = 0;
	buffer[4] = duty & 0xFF;
	buffer[5] = (duty >> 8) & 0xFF;
	if (extpwm_driver)
		extpwm_driver.write(buffer);

}

exports.J17.getPos = function(id) {
	return J17[id].value;
}
