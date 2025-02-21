export class MySettingsService {
	_settingsName = 'halftone-rasters';
	_version = 'v1.2'; // increase when settings object changes
	_settings = undefined;

	constructor() {
		this._loadSettings();
	}

	saveSettings(setting, value) {
		this._settings[setting] = value;
		localStorage.setItem(this._settingsName, JSON.stringify(this._settings));
	}

	getSettings(setting) {
		if (!setting) return this._settings;
		return this._settings[setting];
	}

	_defaultSettings() {
		return {
			"version": this._version,
			"map": 0,
			"map-size": 3,
			"map-angle": 45,
			"map-slices": 69,
			"map-interactive": false,
			"map-grayscale": false,
			"raster": 0,
			"raster-size": 3,
			"raster-angle": 24,
			"raster-slices": 69,
			"raster-interactive": false,
			"raster-grayscale": false
		}
	}

	_loadSettings() {
		let settings = JSON.parse(localStorage.getItem(this._settingsName));
		if (!settings || settings === 'undefined' || settings.version !== this._version) {
			this._settings = this._defaultSettings();
			this.saveSettings(this._settings);
		}
		else this._settings = settings;
	}
}
