# homebridge-lono
[Lono sprinkler system](https://lono.io) plugin for [HomeBridge](https://github.com/nfarina/homebridge)

This repository contains the Lono sprinkler system plugin for homebridge. 

# Installation


1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-lono
3. Update your configuration file. See sample-config.json snippet below. 

# Configuration

Configuration sample:

 ```
"platforms": [
		{
			"platform": "Lono",
			"name": "Lono",
            "client_id": "client id",
            "client_secret": "client secret",
            "auth_token": "auth token",
            "device_id": "device id"
		}
	],

```

Fields: 

* "platform": Must always be "Lono" (required)
* "name": Can be anything (required)
* "client_id": Lono OAuth client id (required)
* "client_secret": Lono OAuth client id (required)
* "auth_token": Specify the auth token here. This is shown on the Dev Settings page right under client secret for a single-user application.
* "device_id": The device id of the Lono to be controlled

