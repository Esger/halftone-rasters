import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class App {
	constructor(eventAggregator) {
		this._eventAggregator = eventAggregator;
	}
	attached() {
		this._mapSubscription = this._eventAggregator.subscribe('map-changed', map => this.map = map);
		this._rasterSubscription = this._eventAggregator.subscribe('raster-changed', raster => this.raster = raster);
		this._sizeSubscription = this._eventAggregator.subscribe('size-changed', size => this.size = size);
		this._angleSubscription = this._eventAggregator.subscribe('angle-changed', angle => this.angle = angle);
	}
	detached() {
		this._mapSubscription.dispose();
		this._rasterSubscription.dispose();
		this._sizeSubscription.dispose();
		this._angleSubscription.dispose();
	}
}
