import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MySettingsService } from '../services/my-settings-service';

@inject(EventAggregator, MySettingsService)
export class ShareControl {
	visible = false;

	constructor(eventAggregator, mySettingsService) {
		this._eventAggregator = eventAggregator;
		this._mySettingsService = mySettingsService;
		this._isTouch = sessionStorage.getItem('touch-device') === 'true';
	}

	attached() {
		this._showSubscription = this._eventAggregator.subscribe('show-share-control', show => this._toggle(show || this._isTouch));
	}

	detached() {
		this._showSubscription.dispose();
	}

	// async setClipboardText(text) {
	// 	try {
	// 		// Clear the clipboard first
	// 		await navigator.clipboard.writeText('');
	// 		// Then write the intended text
	// 		await navigator.clipboard.writeText(text);
	// 		// console.log('Text set to clipboard successfully');
	// 	} catch (err) {
	// 		console.error('Failed to set clipboard content: ', err);
	// 	}
	// }

	copyUrl() {
		this.copied = true;
		setTimeout(_ => this.copied = false, 5000);
		const settings = this._mySettingsService.getMySettings();
		const toClipboard = window.location.href.split('?')[0] + '?settings=' + encodeURIComponent(JSON.stringify(settings));
		navigator.clipboard.writeText(toClipboard);
	}

	_toggle(show) {
		$('.shareControl').removeClass('fading');
		this.visible = show;
		if (!show) return;

		setTimeout(_ => {
			$('.shareControl').addClass('fading');
		}, 2000);
	}
}
