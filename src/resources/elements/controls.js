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
			{ // dotted
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
		], [
			{ // lined
				"id": 0,
				"raster": 1,
				"size": "3",
				"angle": "45",
				"slices": 69,
				"grayscale": false,
				"interactive": false,
				"mouseX": 739,
				"mouseY": 94
			},
			{
				"id": 1,
				"raster": 1,
				"size": "3",
				"angle": "49",
				"slices": 69,
				"grayscale": false,
				"interactive": false,
				"mouseX": 730,
				"mouseY": 402
			}
		], [
			{ // radial
				"id": 0,
				"raster": 2,
				"size": "0.9",
				"angle": "45",
				"slices": 69,
				"grayscale": false,
				"interactive": false,
				"mouseX": 739,
				"mouseY": 94
			},
			{
				"id": 1,
				"raster": 2,
				"size": "0.5",
				"angle": "49",
				"slices": 69,
				"grayscale": false,
				"interactive": false,
				"mouseX": 730,
				"mouseY": 402
			}
		], [
			{ // conical
				"id": 0,
				"raster": 3,
				"size": "0.9",
				"angle": "45",
				"slices": 69,
				"grayscale": false,
				"interactive": false,
				"mouseX": 739,
				"mouseY": 94
			},
			{
				"id": 1,
				"raster": 3,
				"size": "0.5",
				"angle": "49",
				"slices": "65",
				"grayscale": false,
				"interactive": false,
				"mouseX": 730,
				"mouseY": 402
			}
		], [
			{ // image
				"id": 0,
				"raster": 4,
				"size": "2",
				"angle": "38",
				"slices": 69,
				"grayscale": false,
				"interactive": false,
				"mouseX": 739,
				"mouseY": 94
			},
			{
				"id": 1,
				"raster": 4,
				"size": "2",
				"angle": "45",
				"slices": 69,
				"grayscale": false,
				"interactive": false,
				"mouseX": 730,
				"mouseY": 402
			}
		]];
		const randomIndex = Math.floor(Math.random() * settings.length);
		this._eventAggregator.publish('show-setting', settings[randomIndex]);
	}

}
