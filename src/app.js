import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class App {
	constructor(eventAggregator) {
		this._eventAggregator = eventAggregator;
	}
	attached() {
		this._mapSubscription = this._eventAggregator.subscribe('map-changed', map => this.map = map);
		this._grayscaleSubscription = this._eventAggregator.subscribe('grayscale-changed', grayscale => this.grayscale = grayscale);
		this._rasterSubscription = this._eventAggregator.subscribe('raster-changed', raster => this.raster = raster);
		this._sizeSubscription = this._eventAggregator.subscribe('size-changed', size => this.size = size);
		this._angleSubscription = this._eventAggregator.subscribe('angle-changed', angle => this.angle = angle);
		this._fileChangedSubscription = this._eventAggregator.subscribe('file-changed', file => {
			const fileUrl = URL.createObjectURL(file);
			this.fileUrl = fileUrl;
			console.log(fileUrl);
		});
	}
	detached() {
		this._mapSubscription.dispose();
		this._grayscaleSubscription.dispose();
		this._rasterSubscription.dispose();
		this._sizeSubscription.dispose();
		this._angleSubscription.dispose();
	}
}
