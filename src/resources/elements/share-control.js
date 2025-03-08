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
		this._copyText = 'Copy image url yo';
		this.buttonText = this._copyText;
	}

	attached() {
		this._showSubscription = this._eventAggregator.subscribe('show-share-control', show => this._toggle(show || this._isTouch));
	}

	detached() {
		this._showSubscription.dispose();
	}

	copyUrl() {
		this.copied = true;
		setTimeout(_ => this.copied = false, 5000);
		const settings = this._mySettingsService.getMySettings();
		navigator.clipboard.writeText(window.location.href + '?settings=' + encodeURIComponent(JSON.stringify(settings)));
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
