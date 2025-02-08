import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class App {
	constructor(eventAggregator) {
		this._eventAggregator = eventAggregator;
	}
	attached() {
		this._mapSubscription = this._eventAggregator.subscribe('map-changed', map => {
			if (map == 'image')
				this.fileUrl = undefined;
			this.map = map;
		});
		this._fileChangedSubscription = this._eventAggregator.subscribe('file-changed', file => {
			const fileUrl = URL.createObjectURL(file);
			this.fileUrl = fileUrl;
		});
		this._mapSizeSubscription = this._eventAggregator.subscribe('map-size-changed', size => this.mapSize = size);
		this._grayscaleSubscription = this._eventAggregator.subscribe('grayscale-changed', grayscale => this.grayscale = grayscale);

		this._rasterSubscription = this._eventAggregator.subscribe('raster-changed', raster => this.raster = raster);
		this._rasterSizeSubscription = this._eventAggregator.subscribe('raster-size-changed', size => this.rasterSize = size);
		this._slicesSubscription = this._eventAggregator.subscribe('slices-changed', slices => this.slices = slices);
		this._angleSubscription = this._eventAggregator.subscribe('angle-changed', angle => this.angle = angle);
	}
	detached() {
		this._mapSubscription.dispose();
		this._fileChangedSubscription.dispose();
		this._mapSizeSubscription.dispose();


		this._grayscaleSubscription.dispose();
		this._rasterSubscription.dispose();
		this._rasterSizeSubscription.dispose();
		this._slicesSubscription.dispose();

		this._angleSubscription.dispose();
	}
}
