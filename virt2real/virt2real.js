var pins = [
	{
		"id": 0,
		"name": "FAKE",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 1,
		"name": "GND",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 2,
		"name": "UART0_TXD",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 3,
		"name": "UART0_RXD",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 4,
		"name": "AGND",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 5,
		"name": "ETH1",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 6,
		"name": "ETH2",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 7,
		"name": "ETH3",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 8,
		"name": "ETH4",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 9,
		"name": "ETH5",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 10,
		"name": "GPIO15",
		"gpio": 15,
		"alt" : []
	},
	{
		"id": 11,
		"name": "GPIO14",
		"gpio": 14,
		"alt" : []
	},
	{
		"id": 12,
		"name": "GPIO13",
		"gpio": 13,
		"alt" : []
	},
	{
		"id": 13,
		"name": "GPIO12",
		"gpio": 12,
		"alt" : []
	},
	{
		"id": 14,
		"name": "GPIO11",
		"gpio": 11,
		"alt" : []
	},
	{
		"id": 15,
		"name": "GPIO10",
		"gpio": 10,
		"alt" : []
	},
	{
		"id": 16,
		"name": "GPIO90",
		"gpio": 90,
		"alt" : [{"name": "pwm", "ch": 2},{"name": "rto", "ch": 0},]
	},
	{
		"id": 17,
		"name": "GPIO89",
		"gpio": 89,
		"alt" : [{"name": "pwm", "ch": 2},{"name": "rto", "ch": 1},]
	},
	{
		"id": 18,
		"name": "GPIO88",
		"gpio": 88,
		"alt" : [{"name": "pwm", "ch": 2},{"name": "rto", "ch": 2},]
	},
	{
		"id": 19,
		"name": "GPIO87",
		"gpio": 87,
		"alt" : [{"name": "pwm", "ch": 2},{"name": "rto", "ch": 3},]
	},
	{
		"id": 20,
		"name": "GPIO50",
		"gpio": 50,
		"alt" : []
	},
	{
		"id": 21,
		"name": "PWR_VIN",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 22,
		"name": "+3V3",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 23,
		"name": "RESET",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 24,
		"name": "LINEOUT",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 25,
		"name": "GPIO1",
		"gpio": 1,
		"alt" : []
	},
	{
		"id": 26,
		"name": "GPIO37",
		"gpio": 37,
		"alt" : []
	},
	{
		"id": 27,
		"name": "GPIO36",
		"gpio": 36,
		"alt" : []
	},
	{
		"id": 28,
		"name": "GPIO17",
		"gpio": 17,
		"alt" : []
	},
	{
		"id": 29,
		"name": "GPIO16",
		"gpio": 16,
		"alt" : []
	},
	{
		"id": 30,
		"name": "GPIO33",
		"gpio": 33,
		"alt" : []
	},
	{
		"id": 31,
		"name": "GPIO32",
		"gpio": 32,
		"alt" : []
	},
	{
		"id": 32,
		"name": "GPIO31",
		"gpio": 31,
		"alt" : []
	},
	{
		"id": 33,
		"name": "GPIO30",
		"gpio": 30,
		"alt" : []
	},
	{
		"id": 34,
		"name": "GPIO29",
		"gpio": 29,
		"alt" : []
	},
	{
		"id": 35,
		"name": "GPIO28",
		"gpio": 28,
		"alt" : []
	},
	{
		"id": 36,
		"name": "GPIO27",
		"gpio": 27,
		"alt" : []
	},
	{
		"id": 37,
		"name": "GPIO26",
		"gpio": 26,
		"alt" : []
	},
	{
		"id": 38,
		"name": "GPIO2",
		"gpio": 2,
		"alt" : []
	},
	{
		"id": 39,
		"name": "GPIO24",
		"gpio": 24,
		"alt" : []
	},
	{
		"id": 40,
		"name": "GPIO23",
		"gpio": 23,
		"alt" : [{"name": "pwm", "ch": 0},]
	},
	{
		"id": 41,
		"name": "GPIO22",
		"gpio": 22,
		"alt" : []
	},
	{
		"id": 42,
		"name": "GPIO80",
		"gpio": 80,
		"alt" : [{"name": "pwm", "ch": 3},]
	},
	{
		"id": 43,
		"name": "GPIO92",
		"gpio": 92,
		"alt" : [{"name": "pwm", "ch": 0},]
	},
	{
		"id": 44,
		"name": "GPIO91",
		"gpio": 91,
		"alt" : [{"name": "pwm", "ch": 1},]
	},
	{
		"id": 45,
		"name": "TVOUT",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 46,
		"name": "SP+",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 47,
		"name": "SP-",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 48,
		"name": "ADC0",
		"gpio": -1,
		"alt" : [{"name": "adc", "ch": 0},]
	},
	{
		"id": 49,
		"name": "ADC1",
		"gpio": -1,
		"alt" : [{"name": "adc", "ch": 1},]
	},
	{
		"id": 50,
		"name": "ADC2",
		"gpio": -1,
		"alt" : [{"name": "adc", "ch": 2},]
	},
	{
		"id": 51,
		"name": "ADC3",
		"gpio": -1,
		"alt" : [{"name": "adc", "ch": 3},]
	},
	{
		"id": 52,
		"name": "ADC4",
		"gpio": -1,
		"alt" : [{"name": "adc", "ch": 4},]
	},
	{
		"id": 53,
		"name": "ADC5",
		"gpio": -1,
		"alt" : [{"name": "adc", "ch": 5},]
	},
	{
		"id": 54,
		"name": "GPIO3",
		"gpio": 3,
		"alt" : []
	},
	{
		"id": 55,
		"name": "GPIO4",
		"gpio": 4,
		"alt" : []
	},
	{
		"id": 56,
		"name": "GPIO5",
		"gpio": 5,
		"alt" : []
	},
	{
		"id": 57,
		"name": "GPIO6",
		"gpio": 6,
		"alt" : []
	},
	{
		"id": 58,
		"name": "GPIO7",
		"gpio": 7,
		"alt" : []
	},
	{
		"id": 59,
		"name": "GPIO8",
		"gpio": 8,
		"alt" : []
	},
	{
		"id": 60,
		"name": "GPIO9",
		"gpio": 9,
		"alt" : []
	},
	{
		"id": 61,
		"name": "GPIO82",
		"gpio": 82,
		"alt" : []
	},
	{
		"id": 62,
		"name": "GPIO79",
		"gpio": 79,
		"alt" : []
	},
	{
		"id": 63,
		"name": "GPIO86",
		"gpio": 86,
		"alt" : [{"name": "pwm", "ch": 3},]
	},
	{
		"id": 64,
		"name": "GPIO85",
		"gpio": 85,
		"alt" : [{"name": "pwm", "ch": 3},]
	},
	{
		"id": 65,
		"name": "GPIO81",
		"gpio": 81,
		"alt" : [{"name": "pwm", "ch": 3},]
	},
	{
		"id": 66,
		"name": "AGND",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 67,
		"name": "+3V3",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 68,
		"name": "PWR_VIN",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 69,
		"name": "DSP_GND",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 70,
		"name": "I2C_DATA",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 71,
		"name": "I2C_CLK",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 72,
		"name": "COMPPR",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 73,
		"name": "COMPY",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 74,
		"name": "COMPPB",
		"gpio": -1,
		"alt" : []
	},
	{
		"id": 75,
		"name": "GPIO49",
		"gpio": 49,
		"alt" : []
	},
	{
		"id": 76,
		"name": "GPIO48",
		"gpio": 48,
		"alt" : []
	},
	{
		"id": 77,
		"name": "GPIO47",
		"gpio": 47,
		"alt" : []
	},
	{
		"id": 78,
		"name": "GPIO46",
		"gpio": 46,
		"alt" : []
	},
	{
		"id": 79,
		"name": "GPIO45",
		"gpio": 45,
		"alt" : []
	},
	{
		"id": 80,
		"name": "GPIO44",
		"gpio": 44,
		"alt" : []
	},
	{
		"id": 81,
		"name": "GPIO35",
		"gpio": 35,
		"alt" : []
	},
	{
		"id": 82,
		"name": "GPIO84",
		"gpio": 84,
		"alt" : []
	},
	{
		"id": 83,
		"name": "GPIO83",
		"gpio": 83,
		"alt" : []
	},
	{
		"id": 84,
		"name": "GPIO25",
		"gpio": 25,
		"alt" : [{"name": "pwm", "ch": 1},]
	},
	{
		"id": 85,
		"name": "GPIO34",
		"gpio": 34,
		"alt" : []
	},
	{
		"id": 86,
		"name": "GND",
		"gpio": -1,
		"alt" : []
	},
];

exports.pins = pins;
