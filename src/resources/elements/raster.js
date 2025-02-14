import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MySettingsService } from '../services/my-settings-service';

@inject(EventAggregator, MySettingsService)

export class RasterCustomElement {
	@bindable model;
	maps = [
		{ id: 0, value: 'dotted' },
		{ id: 1, value: 'lined' },
		{ id: 2, value: 'radial' },
		{ id: 3, value: 'conical' },
		{ id: 4, value: 'image' }
	];

	constructor(eventAggregator, mySettingsService) {
		this._eventAggregator = eventAggregator;
		this._mySettingsService = mySettingsService;
	}

	attached() {
		this._getSettings();
	}

	_getSettings() {
		const mapId = parseInt(this._mySettingsService.getSettings('map-' + this.model.name), 10) || 0;
		this.selectedMap = this.maps[mapId];
		this._mySettingsService.saveSettings('map-' + this.model.name, mapId);

		this.size = parseInt(this._mySettingsService.getSettings(this.model.name + '-size'), 10) || 32;
		this._mySettingsService.saveSettings(this.model.name + '-size', this.size);

		this.mapSlices = parseInt(this._mySettingsService.getSettings(this.model.name + '-slices'), 10) || 69;
		this._mySettingsService.saveSettings(this.model.name + '-slices', this.mapSlices);

		this.interactiveMap = this._mySettingsService.getSettings('interactive-' + this.model.name) || false;
		this._mySettingsService.saveSettings('interactive-' + this.model.name, this.interactiveMap);

		this.grayscale = this._mySettingsService.getSettings('grayscale-' + this.model.name) || false;
		this._mySettingsService.saveSettings('grayscale-' + this.model.name, this.grayscale);

		this.interactiveRaster = this._mySettingsService.getSettings('interactive-' + this.model.name) || false;
		this._mySettingsService.saveSettings('interactive-' + this.model.name, this.interactiveRaster);
	}

	mapChanged(map) {
		this.selectedMap = map;
		this.selectedFile = undefined;
		this._mySettingsService.saveSettings('map-' + this.model.name, map.id);
	}

	fileChanged(event) {
		this.selectedFile = event.target.files[0].name;
		this._mySettingsService.saveSettings('file' + this.model.name, this.selectedFile);
	}

	settingChanged(setting, value) {
		switch (setting) {
			case 'interactive-map':
				value && (this.interactiveRaster = false);
				this._mySettingsService.saveSettings('interactive-raster', this.interactiveRaster);
				break;
			case 'interactive-raster':
				value && (this.interactiveMap = false);
				this._mySettingsService.saveSettings('interactive-map', this.interactiveMap);
				break;
		}
		this._mySettingsService.saveSettings(setting, value);
	}
}
