import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(EventAggregator)
export class App {
	constructor(eventAggregator) {
		this._eventAggregator = eventAggregator;
	}
	attached() {
		this._fileChangedSubscription = this._eventAggregator.subscribe('file-changed', file => {
			const fileUrl = URL.createObjectURL(file);
			this.fileUrl = fileUrl;
		});
	}
	detached() {
		this._fileChangedSubscription.dispose();
	}
}
