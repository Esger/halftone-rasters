import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MySettingsService } from '../services/my-settings-service';

@inject(EventAggregator, MySettingsService)

export class RasterCustomElement {
	@bindable count;
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

	bind() {
		const interactive = this.model.interactive;
		this.model.interactive = undefined;
		setTimeout(() => {
			this.model.interactive = interactive;
		}, 500);
	}

	attached() {
		this.selectedMap = this.maps.find(map => map.id === this.model.raster);
		console.log(this.model);
	}

	countChanged() {
		const $checkbox = $('#tab-' + this.model.id);
		$checkbox.prop('checked', true);
	}

	mapChanged() {
		this.model.raster = this.selectedMap.id;
		this.model.selectedFile = undefined;
		this._eventAggregator.publish('save-settings');
	}

	fileChanged(event) {
		this.model.fileUrl = URL.createObjectURL(event.target.files[0]);
		this.model.selectedFile = event.target.files[0].name;
	}

	settingChanged() {
		this._eventAggregator.publish('save-settings');
	}

	mouseXChanged(newValue, oldValue) {
		if (!this.model.interactive) return;
		this.model.id % 2 === 0 ? this._setAngle(newValue) : this._setSize(newValue);
	}

	mouseYChanged(value, oldValue) {
		if (!this.model.interactive) return;
		this.model.id % 2 === 1 ? this._setAngle(value) : this._setSize(value);
	}

	remove() {
		this._eventAggregator.publish('remove-raster', this.model.id);
	}

	duplicate() {
		this._eventAggregator.publish('add-raster', this.model.id);
	}

	_setSize(value) {
		this.model.size = Math.round(10 * value / window.innerWidth * 100) / 10;
	}

	_setAngle(value) {
		if (['radial', 'conical'].includes(this.selectedMap?.value.toLowerCase())) return;
		this.model.angle = Math.round(10 * value / window.innerHeight * 90) / 10;
	}
}
