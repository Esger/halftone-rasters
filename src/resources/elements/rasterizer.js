import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(Element, EventAggregator)
export class RasterizerCustomElement {
	constructor(element, eventAggregator) {
		this._element = element;
		this._eventAggregator = eventAggregator;
	}

	attached() {
		this._rasterSubscription = this._eventAggregator.subscribe('raster-changed', raster => this.raster = raster);
	}
	detached() {
		this._rasterSubscription.dispose();
	}
}
