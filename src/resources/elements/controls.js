import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MySettingsService } from '../services/my-settings-service';

@inject(Element, EventAggregator, MySettingsService)
export class Controls {
	constructor(element, eventAggregator, mySettingsService) {
		this._element = element;
		this._eventAggregator = eventAggregator;
		this._mySettingsService = mySettingsService;
		this.maps = [
			{ id: 0, value: 'dotted' },
			{ id: 1, value: 'lined' },
			{ id: 2, value: 'radial' },
			{ id: 3, value: 'conical' },
			{ id: 4, value: 'image' }
		];
		this.rasters = [
			{ id: 0, value: 'dotted' },
			{ id: 1, value: 'lined' },
			{ id: 2, value: 'radial' },
			{ id: 3, value: 'conical' }
		];
		this._getSettings();
	}

	attached() {
		this._eventAggregator.publish('map-changed', this.maps[this.selectedMap.id].value);
		this._eventAggregator.publish('map-size-changed', this.mapSize);
		this._eventAggregator.publish('map-slices-changed', this.mapSlices);
		this._eventAggregator.publish('grayscale-changed', this.grayscale);

		this._eventAggregator.publish('raster-changed', this.rasters[this.selectedRaster.id].value);
		this._eventAggregator.publish('raster-size-changed', this.rasterSize);
		this._eventAggregator.publish('raster-slices-changed', this.rasterSlices);
		this._eventAggregator.publish('raster-angle-changed', this.rasterAngle);

		this._element.addEventListener('transitionend', _ => setTimeout(_ => {
			this.dimmed = true, 5000;
			this._element.addEventListener('mouseenter', _ => this.dimmed = false);
			this._element.addEventListener('mouseleave', _ => setTimeout(_ => this.dimmed = true, 5000));
		}, 5000, { once: true }));
	}

	_getSettings() {
		const mapId = parseInt(this._mySettingsService.getSettings('map'), 10) || 0;
		this.selectedMap = this.maps[mapId];
		this._mySettingsService.saveSettings('map', mapId);

		this.mapSize = parseInt(this._mySettingsService.getSettings('map-size'), 10) || 32;
		this._mySettingsService.saveSettings('map-size', this.mapSize);

		this.mapSlices = parseInt(this._mySettingsService.getSettings('map-slices'), 10) || 69;
		this._mySettingsService.saveSettings('map-slices', this.mapSlices);

		const rasterId = parseInt(this._mySettingsService.getSettings('raster'), 10) || 0;
		this.selectedRaster = this.rasters[rasterId];
		this._mySettingsService.saveSettings('raster', rasterId);

		this.rasterSize = parseInt(this._mySettingsService.getSettings('raster-size'), 10) || 32;
		this._mySettingsService.saveSettings('raster-size', this.rasterSize);

		this.rasterAngle = parseInt(this._mySettingsService.getSettings('raster-angle'), 10) || 45;
		this._mySettingsService.saveSettings('raster-angle', this.rasterAngle);

		this.rasterSlices = parseInt(this._mySettingsService.getSettings('raster-slices'), 10) || 69;
		this._mySettingsService.saveSettings('raster-slices', this.rasterSlices);

		this.grayscale = this._mySettingsService.getSettings('grayscale') || false;
		this._mySettingsService.saveSettings('grayscale', this.grayscale);
	}

	rasterChanged(raster) {
		this.selectedRaster = raster;
		this._eventAggregator.publish('raster-changed', raster.value);
		this._mySettingsService.saveSettings('raster', raster.id);
	}

	mapChanged(map) {
		this.selectedMap = map;
		this.selectedFile = undefined;
		this._eventAggregator.publish('map-changed', map.value);
		this._mySettingsService.saveSettings('map', map.id);
	}

	fileChanged(event) {
		this.selectedFile = event.target.files[0].name;
		this._eventAggregator.publish('file-changed', event.target.files[0]);
		this._mySettingsService.saveSettings('file', this.selectedFile);
	}

	settingChanged(setting, value) {
		this._eventAggregator.publish(setting + '-changed', value);
		this._mySettingsService.saveSettings(setting, value);
	}

}
