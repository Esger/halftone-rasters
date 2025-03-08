import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MySettingsService } from '../services/my-settings-service';

@inject(Element, EventAggregator, MySettingsService)
export class RasterizerCustomElement {

	constructor(element, eventAggregator, mySettingsService) {
		this._element = element;
		this._eventAggregator = eventAggregator;
		this._mySettingsService = mySettingsService;
		this._constrain = false;
		this._rastersLocked = false;
		this._isTouch = sessionStorage.getItem('touch-device') === 'true';
		this.sheets = [
			{
				id: 0,
				name: 'map'
			},
			{
				id: 1,
				name: 'raster'
			}
		]
		this._getSettingsFromUrl();
	}

	attached() {
		document.addEventListener('keydown', event => {
			this._constrain = event.shiftKey;
		});
		document.addEventListener('keyup', event => {
			this._constrain = false;
		});
		this.mouseX = parseInt(this._mySettingsService.getMySettings('raster-mouseX'), 10);
		this.mouseY = parseInt(this._mySettingsService.getMySettings('raster-mouseY'), 10);
	}

	detached() {
		document.removeEventListener('keydown');
		document.removeEventListener('keyup');
	}

	keyPressed(event) {
		this._constrain = event.shiftKey;
		setTimeout(_ => this._constrain = false);
	}

	lockRasters(event) {
		this._eventAggregator.publish('show-share-control', !this._rastersLocked);
		if (this._isTouch) return;
		this._rastersLocked = !this._rastersLocked;
		this._eventAggregator.publish('save-settings', {
			'mouseX': this.mouseX,
			'mouseY': this.mouseY
		});
	}

	mouseMoved(event) {
		if (this._rastersLocked) return;
		if (this._constrain) {
			if (Math.abs(event.movementX) > Math.abs(event.movementY))
				this.mouseX += event.movementX;
			else
				this.mouseY += event.movementY;
		} else {
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;
		}
	}

	touchMoved(event) {
		if (this._constrain) {
			if (Math.abs(event.touches[0].movementX) > Math.abs(event.touches[0].movementY))
				this.mouseX += event.touches[0].movementX;
			else
				this.mouseY += event.touches[0].movementY;
		} else {
			this.mouseX = event.touches[0].clientX;
			this.mouseY = event.touches[0].clientY;
		}
	}

	// todo: restore this
	sizeChanged(newSize) {
		const size = parseInt(newSize, 10);
		this.sharpenEdges = size > 20;
		this.contrast = 2 * size;
	}

	_getSettingsFromUrl() {
		// check if url has settings parameter; use these if present
		let urlParam = new URLSearchParams(window.location.hash ? window.location.hash.split('?')[1] : window.location.search);

		if (urlParam.has('settings')) {
			const settingsParam = urlParam.get('settings');
			const settings = JSON.parse(decodeURIComponent(settingsParam));
			console.log(settings);
			for (const setting in settings) {
				this._mySettingsService.saveMySettings(setting, settings[setting]);
			}
		}
	}

}
