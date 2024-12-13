import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Controls {
	constructor(eventAggregator) {
		this._eventAggregator = eventAggregator;
		this.rasters = [
			{ id: 1, value: 'dotted' },
			{ id: 2, value: 'lined' }
		];
		this.selectedRaster = 'dotted';
		this.angle = 0;
	}

	attached() {
		this._eventAggregator.publish('raster-changed', this.selectedRaster);
		this._eventAggregator.publish('angle-changed', this.angle);
	}

	rasterChanged(raster) {
		console.log(raster);
		this.selectedRaster = raster;
		this._eventAggregator.publish('raster-changed', raster.value);
	}

	angleChanged(angle) {
		this._eventAggregator.publish('angle-changed', angle);
	}

}
