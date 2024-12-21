import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Element, EventAggregator)
export class Controls {
	constructor(element, eventAggregator) {
		this._element = element;
		this._eventAggregator = eventAggregator;
		this.maps = [
			{ id: 0, value: 'linear' },
			{ id: 1, value: 'radial' },
			{ id: 2, value: 'conical' },
			{ id: 3, value: 'image' }
		];
		this.selectedMap = this.maps[0];
		this.rasters = [
			{ id: 0, value: 'dotted' },
			{ id: 1, value: 'lined' },
			{ id: 2, value: 'radial' }
		];
		this.selectedRaster = this.rasters[0];
		this.size = 32;
		this.angle = -45;
	}

	attached() {
		this._eventAggregator.publish('map-changed', this.maps[this.selectedMap.id].value);
		this._eventAggregator.publish('raster-changed', this.rasters[this.selectedRaster.id].value);
		this._eventAggregator.publish('size-changed', this.size);
		this._eventAggregator.publish('angle-changed', this.angle);
		this._element.addEventListener('transitionend', _ => setTimeout(_ => {
			this.dimmed = true, 5000;
			this._element.addEventListener('mouseenter', _ => this.dimmed = false);
			this._element.addEventListener('mouseleave', _ => setTimeout(_ => this.dimmed = true, 5000));
		}, 5000, { once: true }));
	}

	rasterChanged(raster) {
		this.selectedRaster = raster;
		this._eventAggregator.publish('raster-changed', raster.value);
	}

	mapChanged(map) {
		this.selectedMap = map;
		this.selectedFile = undefined;
		this._eventAggregator.publish('map-changed', map.value);
	}

	fileChanged(event) {
		this.selectedFile = event.target.files[0].name;
		this._eventAggregator.publish('file-changed', event.target.files[0]);
	}

	grayScaleChanged(grayScale) {
		this._eventAggregator.publish('grayscale-changed', grayScale);
	}

	sizeChanged(size) {
		this._eventAggregator.publish('size-changed', size);
	}

	angleChanged(angle) {
		this._eventAggregator.publish('angle-changed', angle);
	}

}
