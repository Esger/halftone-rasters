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
	}

	attached() {
		this._eventAggregator.publish('raster-changed', this.selectedRaster);
	}

	rasterChanged(raster) {
		console.log(raster);
		this.selectedRaster = raster;
		this._eventAggregator.publish('raster-changed', raster.value);
	}

}
