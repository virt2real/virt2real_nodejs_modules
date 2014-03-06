//fs = require('fs');
//var pins_driver = fs.createWriteStream("/dev/v2r_pins");

fs = require('fs');
fh_export = fs.openSync("/dev/v2r_pins", "w", 0644);


var extpwm_driver;

/* period for PWMs */
var period = 1190;
var period_external = 4095;

var address;

/* max voltage */
var REF_VOLTAGE = 20;

/* set I2C address */
exports.setAddress = function (addr) {
	address = parseInt(addr);
	extpwm_driver = fs.createWriteStream("/sys/bus/i2c/devices/1-00" + address.toString(16) + "/any");
}

/* motorshield init */
exports.init = function () {

	//pins_driver.write("set con 43 pwm0");
	//pins_driver.write("set con 44 pwm1");
	//pins_driver.write("set con 19 pwm2");
	//pins_driver.write("set con 42 pwm3");

	fs.writeSync(fh_export, "set con 43 pwm0", null);
	fs.writeSync(fh_export, "set con 44 pwm1", null);
	fs.writeSync(fh_export, "set con 19 pwm2", null);
	fs.writeSync(fh_export, "set con 42 pwm3", null);

	/* init external pwm*/
	fs.writeFileSync("/sys/bus/i2c/devices/1-00" + address.toString(16) + "/init", "1");

	/* turn off sleep on external pwm*/
	fs.writeFileSync("/sys/bus/i2c/devices/1-00" + address.toString(16) + "/sleep", "0");
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
		//pins_driver.write(buffer);
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
		//pins_driver.write(buffer);
		//pins_driver.write(buffer1);
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
