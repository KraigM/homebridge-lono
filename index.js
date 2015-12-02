var Lono = require("lono").LonoClient;
var LonoDevice = require('./lib/device.js');
var Service, Characteristic, Accessory, uuid;

module.exports = function (homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	Accessory = homebridge.hap.Accessory;
	uuid = homebridge.hap.uuid;

	homebridge.registerPlatform("homebridge-lono", "Lono", LonoPlatform);
};

function LonoPlatform(log, config) {
	this.log = log;
	this.debug = log.debug;
	this.config = config;
	this.clientConfig = {
		client_id: config.client_id,
		client_secret: config.client_secret,
		scope: ["write"],
		auth_token: config.auth_token
	};
};

LonoPlatform.prototype = {

	accessories: function (callback) {

		var that = this;

		this.clientConfig.on_token = onToken;

		var lc = new Lono(this.clientConfig);

		function onToken(token) {
			that.device = new LonoDevice(lc, that.config.device_id);
			that.device.getInfo()
				.then(function (info) {
					that.info = info;
					return device.getZone();
				})
				.then(function (z) {
					that.currentZone = z;
					return device.getZonesInfo();
				})
				.then(function (zones) {
					that.zoneData = zones;
					that.zones = [];
					that.zoneData.map(function (z, i) {
						var acc = new Accessory(z.name, uuid.generate(that.config.device_id + i));

						acc.getService(Service.AccessoryInformation)
							.setCharacteristic(Characteristic.Manufacturer, "Lono")
							.setCharacteristic(Characteristic.Model, that.info.model_string)
							.setCharacteristic(Characteristic.SerialNumber, that.info.lono_id + '-' + i);

						acc.addService(Service.Switch)
							.getCharacteristic(Characteristic.On)
							.on('get', function (callback) {
								// Refreshed automatically by platform
								callback(null, that.currentZone == i);
							})
							.on('set', function (state, callback) {
								device.setZone(i, state)
									.then(function () {
										callback(null, state);
									})
									.catch(callback);
							});

						acc.refreshOn = function () {
							// Force get to trigger 'change' if needed
							this.getService(Service.Switch)
								.getCharacteristic(Characteristic.On)
								.getValue();
						};

						that.zone.push(acc);
					});
					setInterval(function () {
						that.device.getZone()
							.then(function (zone) {
								that.currentZone = zone;
								that.zones.map(function (z) {
									z.refreshOn();
								});
							})
							.catch(that.log);
					}, 30000);
					callback(that.zones);
				})
				.catch(function (err) {
					that.log(err);
					callback(null, err);
				});
		}
	}
};
