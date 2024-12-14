import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Controls {
	constructor(eventAggregator) {
		this._eventAggregator = eventAggregator;
		this.maps = [
			{ id: 0, value: 'linear' },
			{ id: 1, value: 'image' }
		];
		this.selectedMap = this.maps[0];
		this.rasters = [
			{ id: 0, value: 'dotted' },
			{ id: 1, value: 'lined' },
			{ id: 2, value: 'radial' }
		];
		this.selectedRaster = this.rasters[0];
		this.size = 32;
		this.angle = 0;
	}

	attached() {
		this._eventAggregator.publish('map-changed', this.maps[this.selectedMap.id].value);
		this._eventAggregator.publish('raster-changed', this.rasters[this.selectedRaster.id].value);
		this._eventAggregator.publish('size-changed', this.size);
		this._eventAggregator.publish('angle-changed', this.angle);
	}

	rasterChanged(raster) {
		this.selectedRaster = raster;
		this._eventAggregator.publish('raster-changed', raster.value);
	}

	mapChanged(map) {
		this.selectedMap = map;
		this._eventAggregator.publish('map-changed', map.value);
	}

	sizeChanged(size) {
		this._eventAggregator.publish('size-changed', size);
	}

	angleChanged(angle) {
		this._eventAggregator.publish('angle-changed', angle);
	}

}
