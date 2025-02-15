import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MySettingsService } from '../services/my-settings-service';

@inject(EventAggregator, MySettingsService)

export class RasterCustomElement {
	@bindable model;
	@bindable mouseX;
	@bindable mouseY;

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
		this._showMoireSubscription = this._eventAggregator.subscribe('show-moire', settings => {
			this._setup(settings);
		})
	}

	_setup(settings) {
		for (const setting in settings) {
			if (setting.startsWith(this.model.name)) {
				this.model[setting.split('-')[1] || setting] = settings[setting];
			}
		}
		setTimeout(() => {
			this.selectedMap = this.maps.find(map => map.id === this.model[this.model.name]);
			this.size = this.model.size;
			this.angle = this.model.angle;
			this.slices = this.model.slices;
			this.grayscale = this.model.grayscale;
		});
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

		this.interactive = this._mySettingsService.getSettings(this.model.name + '-interactive') || false;
		this.settingChanged('interactive', this.interactive);

		this.grayscale = this._mySettingsService.getSettings(this.model.name + '-grayscale') || false;
		this._mySettingsService.saveSettings(this.model.name + '-grayscale', this.grayscale);
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
		if (setting === 'interactive') {
			if (!this.value) {
				this.size = 100;
				this.angle = 0;
			}
		}
		this._mySettingsService.saveSettings(this.model.name + '-' + setting, value);
	}

	mouseXChanged(value) {
		if (!this.interactive) return;
		if (['radial', 'conical'].includes(this.selectedMap.value.toLowerCase())) return;
		this.size = Math.round(10 * value / window.innerWidth * 100) / 10;
	}

	mouseYChanged(value) {
		if (!this.interactive) return;
		this.angle = Math.round(10 * value / window.innerHeight * 90) / 10;
	}
}
