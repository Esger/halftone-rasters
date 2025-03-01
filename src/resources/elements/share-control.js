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

	copyUrl() {
		const url = window.location.href;
		const input = document.createElement('input');
		input.value = url;
		document.body.appendChild(input);
		input.select();
		document.execCommand('copy');
		document.body.removeChild(input);
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
