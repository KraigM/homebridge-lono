var Promise = require('promise');

/**
 * Wraps Lono device api in Promise.
 */

function LonoDevice(lc, deviceId) {
	this.device = lc.get_device(deviceId);
}

LonoDevice.prototype.getZone = function() {
	return new Promise(function (resolve, reject) {
		this.device.get_zone(function(err, body) {
			if (err) reject(err);
			else resolve(body.data != undefined ? body.data.zone : null);
		});
	}.bind(this));
};

LonoDevice.prototype.setZone = function(zone, isOn) {
	return new Promise(function (resolve, reject) {
		this.device.set_zone(zone, isOn, function(err, body) {
			if (err) reject(err);
			else resolve(body);
		});
	}.bind(this));
};

LonoDevice.prototype.detectZones = function() {
	return new Promise(function (resolve, reject) {
		this.device.detect_zones(function(err, body) {
			if (err) reject(err);
			else resolve(body.data);
		});
	}.bind(this));
};

LonoDevice.prototype.getZonesInfo = function() {
	return new Promise(function (resolve, reject) {
		this.device.get_zones_info(function(err, body) {
			if (err) reject(err);
			else resolve(body.data);
		});
	}.bind(this));
};

LonoDevice.prototype.getInfo = function() {
	return new Promise(function (resolve, reject) {
		this.device.get_lono_info(function(err, body) {
			if (err) reject(err);
			else resolve(body.data);
		});
	}.bind(this));
};

module.exports = LonoDevice;