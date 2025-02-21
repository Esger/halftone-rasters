import { inject, bindable } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
@inject(Element, EventAggregator)
export class RasterizerCustomElement {

	constructor(element, eventAggregator) {
		this._element = element;
		this._eventAggregator = eventAggregator;
		this._constrain = false;
		this.mouseX = 0;
		this.mouseY = 0;
		this.sheets = [
			{
				id: 0,
				name: 'map'
			},
			{
				id: 1,
				name: 'raster'
			}
			// ,
			// {
			// 	id: 2,
			// 	name: 'raster2'
			// }
		]
	}

	attached() {
		document.addEventListener('keydown', event => {
			this._constrain = event.shiftKey;
		});
		document.addEventListener('keyup', event => {
			this._constrain = false;
		});
	}

	detached() {
		document.removeEventListener('keydown');
		document.removeEventListener('keyup');
	}

	keyPressed(event) {
		this._constrain = event.shiftKey;
		setTimeout(_ => this._constrain = false);
	}

	lockRasters() {
		this._lockRasters = !this._lockRasters;
		this._eventAggregator.publish('save-settings');
		this._eventAggregator.publish('show-share-control');
	}

	mouseMoved(event) {
		if (this._lockRasters) return;
		if (this._constrain) {
			if (Math.abs(event.movementX) > Math.abs(event.movementY))
				this.mouseX += event.movementX;
			else
				this.mouseY += event.movementY;
		} else {
			this.mouseX = event.clientX;
			this.mouseY = event.clientY;
		}
	}

	touchMoved(event) {
		if (this._constrain) {
			if (Math.abs(event.touches[0].movementX) > Math.abs(event.touches[0].movementY))
				this.mouseX += event.touches[0].movementX;
			else
				this.mouseY += event.touches[0].movementY;
		} else {
			this.mouseX = event.touches[0].clientX;
			this.mouseY = event.touches[0].clientY;
		}
	}

	// todo: restore this
	sizeChanged(newSize) {
		const size = parseInt(newSize, 10);
		this.sharpenEdges = size > 20;
		this.contrast = 2 * size;
	}

}
