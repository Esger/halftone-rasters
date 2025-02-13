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
		this._grayscaleSubscription = this._eventAggregator.subscribe('grayscale-changed', grayscale => this.grayscale = grayscale);
		this._mapSizeSubscription = this._eventAggregator.subscribe('map-size-changed', size => this.mapSize = size);
		this._mapSlicesSubscription = this._eventAggregator.subscribe('map-slices-changed', slices => this.mapSlices = slices);
		this._mapInteractiveSubscription = this._eventAggregator.subscribe('interactive-map-changed', interactive => this.interactiveMap = interactive);

		this._rasterSubscription = this._eventAggregator.subscribe('raster-changed', raster => this.raster = raster);
		this._rasterSizeSubscription = this._eventAggregator.subscribe('raster-size-changed', size => this.rasterSize = size);
		this._rasterSlicesSubscription = this._eventAggregator.subscribe('raster-slices-changed', slices => this.rasterSlices = slices);
		this._rasterAngleSubscription = this._eventAggregator.subscribe('raster-angle-changed', angle => this.rasterAngle = angle);
		this._rasterInteractiveSubscription = this._eventAggregator.subscribe('interactive-raster-changed', interactive => this.interactiveRaster = interactive);
	}
	detached() {
		this._mapSubscription.dispose();
		this._fileChangedSubscription.dispose();
		this._grayscaleSubscription.dispose();
		this._mapSizeSubscription.dispose();
		this._mapSlicesSubscription.dispose();
		this._mapInteractiveSubscription.dispose();

		this._rasterSubscription.dispose();
		this._rasterSizeSubscription.dispose();
		this._rasterSlicesSubscription.dispose();
		this._rasterAngleSubscription.dispose();
		this._rasterInteractiveSubscription.dispose();
	}
}
