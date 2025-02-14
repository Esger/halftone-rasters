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
		const mapId = parseInt(this._mySettingsService.getSettings(this.model.name), 10) || 0;
		this.selectedMap = this.maps[mapId];
		this._mySettingsService.saveSettings(this.model.name, mapId);

		this.size = parseInt(this._mySettingsService.getSettings(this.model.name + '-size'), 10) || 32;
		this._mySettingsService.saveSettings(this.model.name + '-size', this.size);

		this.angle = parseInt(this._mySettingsService.getSettings(this.model.name + '-angle'), 10) || 45;
		this._mySettingsService.saveSettings(this.model.name + '-angle', this.angle);

		this.slices = parseInt(this._mySettingsService.getSettings(this.model.name + '-slices'), 10) || 69;
		this._mySettingsService.saveSettings(this.model.name + '-slices', this.slices);

		this.interactiveMap = this._mySettingsService.getSettings(this.model.name + '-interactive') || false;
		this._mySettingsService.saveSettings(this.model.name + '-interactive', this.interactiveMap);

		this.grayscale = this._mySettingsService.getSettings(this.model.name + '-grayscale') || false;
		this._mySettingsService.saveSettings(this.model.name + '-grayscale', this.grayscale);

		this.interactiveRaster = this._mySettingsService.getSettings(this.model.name + '-interactive') || false;
		this._mySettingsService.saveSettings(this.model.name + '-interactive', this.interactiveRaster);
	}

	mapChanged(map) {
		this.selectedMap = map;
		this.selectedFile = undefined;
		this._mySettingsService.saveSettings(this.model.name, map.id);
	}

	fileChanged(event) {
		this.fileUrl = URL.createObjectURL(event.target.files[0]);
		this.selectedFile = event.target.files[0].name;
	}

	settingChanged(setting, value) {
		if (typeof value !== 'boolean') {
			value = parseInt(value, 10);
		}
		switch (setting) {
			case 'interactive-map':
				this._mySettingsService.saveSettings('interactive-raster', value);
				break;
			case 'interactive-raster':
				this._mySettingsService.saveSettings('interactive-map', value);
				break;
		}
		this._mySettingsService.saveSettings(this.model.name + '-' + setting, value);
	}
}
