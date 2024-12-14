import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Controls {
	constructor(eventAggregator) {
		this._eventAggregator = eventAggregator;
		this.rasters = [
			{ id: 1, value: 'dotted' },
			{ id: 2, value: 'lined' },
			{ id: 3, value: 'radial' }
		];
		this.selectedRaster = 'dotted';
		this.size = 32;
		this.angle = 0;
	}

	attached() {
		this._eventAggregator.publish('raster-changed', this.selectedRaster);
		this._eventAggregator.publish('size-changed', this.size);
		this._eventAggregator.publish('angle-changed', this.angle);
	}

	rasterChanged(raster) {
		console.log(raster);
		this.selectedRaster = raster;
		this._eventAggregator.publish('raster-changed', raster.value);
	}

	sizeChanged(size) {
		this._eventAggregator.publish('size-changed', size);
	}

	angleChanged(angle) {
		this._eventAggregator.publish('angle-changed', angle);
	}

}
