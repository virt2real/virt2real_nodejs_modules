module.exports = function virt2real() {

	fs = require('fs');
	var pins_driver = fs.createWriteStream("/dev/v2r_pins");
	var gpio_driver = fs.createWriteStream("/dev/v2r_gpio");

	var virt2real = require('./virt2real');

	/* periferial arrays */
	this.pins = virt2real.pins;

	/* functions */
	this.writePin = function(id, value) {
		var buffer = new Buffer(3);
		buffer[0] = 1;
		buffer[1] = id;
		buffer[2] = (value << 1) | 1 ; // set direction output and write value
		pins_driver.write(buffer);
	}

	this.readPin = function(id) {
		var pin = fs.readFileSync("/proc/v2r_pins/" + id);
		return (pin[0] == 49) ? 1 : 0;
	}

	this.writeGPIO = function(id, value) {
		var buffer = new Buffer(3);
		buffer[0] = 1;
		buffer[1] = id;
		buffer[2] = (value << 1) | 1 ; // set direction output and write value
		gpio_driver.write(buffer);
	}

}
