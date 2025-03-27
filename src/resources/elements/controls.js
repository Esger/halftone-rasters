import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { MySettingsService } from '../services/my-settings-service';

@inject(Element, EventAggregator, MySettingsService)
export class Controls {
	constructor(element, eventAggregator, mySettingsService) {
		this._element = element;
		this._eventAggregator = eventAggregator;
		this._mySettingsService = mySettingsService;
	}

	attached() {
		this._element.addEventListener('transitionend', _ => setTimeout(_ => {
			this.dimmed = true, 5000;
			this._element.addEventListener('mouseenter', _ => this.dimmed = false);
			this._element.addEventListener('mouseleave', _ => setTimeout(_ => this.dimmed = true, 5000));
		}, 5000, { once: true }));
	}

	showMoire() {
		const settings = [[
			{
				"id": 0,
				"raster": 0,
				"size": "3",
				"angle": "0",
				"slices": 69,
				"grayscale": false,
				"interactive": false,
				"mouseX": 1258,
				"mouseY": 129
			},
			{
				"id": 1,
				"raster": 0,
				"size": "3",
				"angle": "22.6",
				"slices": 69,
				"grayscale": false,
				"interactive": false,
				"mouseX": 1258,
				"mouseY": 129
			}
		]];
		const randomIndex = Math.floor(Math.random() * settings.length);
		// this._eventAggregator.publish('show-setting', settings[randomIndex]);
		this._eventAggregator.publish('show-setting', settings[0]);
	}

}
