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
		this._getMySettings();
		this._showSettingSubscription = this._eventAggregator.subscribe('show-setting', settings => this._setup(settings));
		this._saveSettingsSubscription = this._eventAggregator.subscribe('save-settings', _ => this._saveAllSettings());
	}

	detached() {
		this._showSettingSubscription.dispose();
		this._saveSettingsSubscription.dispose();
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

	_getMySettings() {
		const mapId = parseInt(this._mySettingsService.getMySettings(this.model.name), 10);
		this.selectedMap = this.maps[mapId];
		this.size = parseInt(this._mySettingsService.getMySettings(this.model.name + '-size'), 10);
		this.angle = parseInt(this._mySettingsService.getMySettings(this.model.name + '-angle'), 10);
		this.slices = parseInt(this._mySettingsService.getMySettings(this.model.name + '-slices'), 10);
		this.interactive = this._mySettingsService.getMySettings(this.model.name + '-interactive');
		this.grayscale = this._mySettingsService.getMySettings(this.model.name + '-grayscale');
	}

	_saveAllSettings() {
		this._mySettingsService.saveMySettings(this.model.name, this.selectedMap.id);
		this._mySettingsService.saveMySettings(this.model.name + '-size', this.size);
		this._mySettingsService.saveMySettings(this.model.name + '-angle', this.angle);
		this._mySettingsService.saveMySettings(this.model.name + '-slices', this.slices);
		this._mySettingsService.saveMySettings(this.model.name + '-interactive', false);
		this._mySettingsService.saveMySettings(this.model.name + '-grayscale', this.grayscale);
	}

	mapChanged(map) {
		this.selectedMap = map;
		this.selectedFile = undefined;
		this._mySettingsService.saveMySettings(this.model.name, map.id);
	}

	fileChanged(event) {
		this.fileUrl = URL.createObjectURL(event.target.files[0]);
		this.selectedFile = event.target.files[0].name;
	}

	settingChanged(setting, value) {
		if (typeof value !== 'boolean') {
			value = parseInt(value, 10);
		}
		this._mySettingsService.saveMySettings(this.model.name + '-' + setting, value);
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
