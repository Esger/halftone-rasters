import { bindable, inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MySettingsService } from '../services/my-settings-service';

@inject(EventAggregator, MySettingsService)
export class ShareControl {
	visible = false;

	constructor(eventAggregator, mySettingsService) {
		this._eventAggregator = eventAggregator;
		this._mySettingsService = mySettingsService;
	}

	attached() {
		this._showSubscription = this._eventAggregator.subscribe('show-share-control', show => this._toggle(show));
	}

	detached() {
		this._showSubscription.dispose();
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
