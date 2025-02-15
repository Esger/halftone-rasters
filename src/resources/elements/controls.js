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
		const settings = [{
			"map": 0,
			"map-size": 2,
			"map-angle": 33,
			"map-slices": 69,
			"map-interactive": false,
			"map-grayscale": false,
			"raster": 0,
			"raster-size": 2,
			"raster-angle": 30,
			"raster-slices": 69,
			"raster-interactive": false,
			"raster-grayscale": false
		}, {
			"map": 1,
			"map-size": 4,
			"map-angle": 50,
			"map-slices": 69,
			"map-interactive": false,
			"map-grayscale": false,
			"raster": 1,
			"raster-size": 4,
			"raster-angle": 56,
			"raster-slices": 69,
			"raster-interactive": true,
			"raster-grayscale": false
		}, {
			"map": 2,
			"map-size": 2,
			"map-angle": 50,
			"map-slices": 69,
			"map-interactive": false,
			"map-grayscale": false,
			"raster": 2,
			"raster-size": 2,
			"raster-angle": 56,
			"raster-slices": 69,
			"raster-interactive": true,
			"raster-grayscale": false
		}, {
			"map": 3,
			"map-size": 32,
			"map-angle": 50,
			"map-slices": 69,
			"map-interactive": false,
			"map-grayscale": false,
			"raster": 3,
			"raster-size": 2,
			"raster-angle": 56,
			"raster-slices": 69,
			"raster-interactive": true,
			"raster-grayscale": false
		}, {
			"map": 4,
			"map-size": 32,
			"map-angle": 50,
			"map-slices": 17,
			"map-interactive": true,
			"map-grayscale": false,
			"raster": 3,
			"raster-size": 2,
			"raster-angle": 56,
			"raster-slices": 69,
			"raster-interactive": false,
			"raster-grayscale": false
		}];
		const randomIndex = Math.floor(Math.random() * settings.length);
		this._eventAggregator.publish('show-moire', settings[randomIndex]);
	}

}
