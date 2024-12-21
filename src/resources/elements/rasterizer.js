import { inject, bindable } from 'aurelia-framework';
@inject(Element)
export class RasterizerCustomElement {
	@bindable map;
	@bindable grayscale;
	@bindable raster;
	@bindable size;
	@bindable slices;
	@bindable angle;
	@bindable fileUrl;

	constructor(element) {
		this._element = element;
	}
	mouseMoved(event) {
		this.mouseX = event.clientX;
		this.mouseY = event.clientY;
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
