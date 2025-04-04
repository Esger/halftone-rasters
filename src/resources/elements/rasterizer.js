import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MySettingsService } from '../services/my-settings-service';

@inject(Element, EventAggregator, MySettingsService)
export class RasterizerCustomElement {
	mouseX = 0;
	mouseY = 0;

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
			},
			{
				id: 1,
			}
		]

		let settings = this._getSettingsFromUrl();
		if (!settings)
			settings = this._getMySettings();
		else
			this._saveSettings(settings);
		console.table('settings', settings);

		this._setup(settings);

		this._saveSettingsSubscription = this._eventAggregator.subscribe('save-settings', _ => this._saveSettings());
		this._showSettingSubscription = this._eventAggregator.subscribe('show-setting', settings => this._setup(settings));
		this._mouseMovedSubscription = this._eventAggregator.subscribe('mouse-moved', event => this._mouseMoved(event));
		this._removeSubscriptions = this._eventAggregator.subscribe('remove-raster', id => this._removeSheet(id));
		this._duplicateSubscriptions = this._eventAggregator.subscribe('add-raster', _ => this._addSheet());
	}

	attached() {
		document.addEventListener('keydown', event => {
			this._constrain = event.shiftKey;
		});
		document.addEventListener('keyup', event => {
			this._constrain = false;
		});
	}

	detached() {
		this._saveSettingsSubscription.dispose();
		this._showSettingSubscription.dispose();
		this._mouseMovedSubscription.dispose();
		this._removeSubscriptions.dispose();
		this._duplicateSubscriptions.dispose();
		document.removeEventListener('keydown');
		document.removeEventListener('keyup');
	}

	_removeSheet(id) {
		this.sheets = this.sheets.filter(sheet => sheet.id !== id);
	}

	_addSheet() {
		const newSheet = structuredClone(this.sheets[0]);
		newSheet.id = this.sheets.length;
		newSheet.interactive = !newSheet.interactive;
		this.sheets.push(newSheet);
	}

	keyPressed(event) {
		this._constrain = event.shiftKey;
		setTimeout(_ => this._constrain = false);
	}

	lockRasters() {
		this._eventAggregator.publish('show-share-control', !this._rastersLocked);
		if (this._isTouch) return;
		this._rastersLocked = !this._rastersLocked;
		this._rastersLocked && this._saveSettings();
	}

	_mouseMoved(event) {

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

		clearTimeout(this.mouseMoveEndTimer);
		this.mouseMoveEndTimer = setTimeout(_ => {
			this.sheets.forEach(sheet => {
				if (!sheet.interactive) return;
				sheet.mouseX = this.mouseX;
				sheet.mouseY = this.mouseY;
				this._saveSettings();
			});
		}, 500); // Pas deze waarde aan naar wens
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

	_setup(settings) {
		this.sheets = settings;
		this.mouseX = settings[0].mouseX;
		this.mouseY = settings[0].mouseY;
	}

	_getSettingsFromUrl() {
		// check if url has settings parameter; use these if present
		let urlParam = new URLSearchParams(window.location.hash ? window.location.hash.split('?')[1] : window.location.search);
		if (!urlParam.has('settings'))
			return false;

		const settingsParam = urlParam.get('settings');
		const settings = JSON.parse(decodeURIComponent(settingsParam));
		this._mySettingsService.saveMySettings(settings);
		return settings.sheets;
	}

	_getMySettings() {
		const sheets = this._mySettingsService.getMySettings('sheets');
		return sheets;
	}

	_saveSettings(settings = undefined, value) {
		this._mySettingsService.saveMySettings('sheets', this.sheets);
		if (settings) this._mySettingsService.saveMySettings(settings, value);
	}

}
