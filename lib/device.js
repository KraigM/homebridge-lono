var Promise = require('promise');

/**
 * Wraps Lono device api in Promise.
 */

function LonoDevice(lc, deviceId) {
	this.device = lc.get_device(deviceId);
}

LonoDevice.getZone = function() {
	return new Promise(function (resolve, reject) {
		device.get_zone(function(err, body) {
			if (err) reject(err);
			else resolve(body.data != undefined ? body.data.zone : null);
		});
	});
};

LonoDevice.setZone = function(zone, isOn) {
	var that = this;
	return new Promise(function (resolve, reject) {
		that.device.set_zone(zone, isOn, function(err, body) {
			if (err) reject(err);
			else resolve(body);
		});
	});
};

LonoDevice.detectZones = function() {
	return new Promise(function (resolve, reject) {
		device.detect_zones(function(err, body) {
			if (err) reject(err);
			else resolve(body.data);
		});
	});
};

LonoDevice.getZonesInfo = function() {
	return new Promise(function (resolve, reject) {
		device.get_zones_info(function(err, body) {
			if (err) reject(err);
			else resolve(body.data);
		});
	});
};

LonoDevice.getInfo = function() {
	return new Promise(function (resolve, reject) {
		device.get_lono_info(function(err, body) {
			if (err) reject(err);
			else resolve(body.data);
		});
	});
};

module.exports = LonoDevice;