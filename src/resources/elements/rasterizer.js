import { inject, bindable } from 'aurelia-framework';
@inject(Element)
export class RasterizerCustomElement {
	@bindable map;
	@bindable mapSize;
	@bindable mapSlices;
	@bindable mapInteractive;
	@bindable fileUrl;
	@bindable grayscale;
	@bindable raster;
	@bindable rasterSize;
	@bindable rasterSlices;
	@bindable rasterAngle;
	@bindable rasterInteractive;

	constructor(element) {
		this._element = element;
		this._constrain = false;
		this.mouseX = 0;
		this.mouseY = 0;
		this.sheets = [
			{
				name: 'map'
			},
			// {
			// 	name: 'raster'
			// }
		]
		console.log(this.sheets);
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

	mouseMoved(event) {
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
		this.mouseX = event.touches[0].clientX;
		this.mouseY = event.touches[0].clientY;
	}
	sizeChanged(newSize) {
		const size = parseInt(newSize, 10);
		this.sharpenEdges = size > 20;
		this.contrast = 2 * size;
	}

}
