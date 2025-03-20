export class MySettingsService {
	_settingsName = 'halftone-rasters';
	_version = 'v1.3'; // increase when settings object changes
	_settings = undefined;

	constructor() {
		this._loadSettings();
	}

	saveMySettings(setting, value) {
		this._settings[setting] = value;
		localStorage.setItem(this._settingsName, JSON.stringify(this._settings));
	}

	getMySettings(setting) {
		if (!setting) return this._settings;
		return this._settings[setting];
	}

	_defaultSettings() {
		return {
			"version": this._version,
			"sheets": [{
				"id": 0,
				"raster": 0,
				"size": 3,
				"angle": 45,
				"slices": 69,
				"grayscale": false,
				"interactive": false
			}, {
				"id": 1,
				"raster": 0,
				"size": 3,
				"angle": 24,
				"slices": 69,
				"grayscale": false,
				"interactive": false
			}]
		}
	}

	_loadSettings() {
		let settings = JSON.parse(localStorage.getItem(this._settingsName));
		if (!settings || settings === 'undefined' || settings.version !== this._version) {
			this._settings = this._defaultSettings();
			this.saveMySettings(this._settings);
		}
		else this._settings = settings;
	}
}
