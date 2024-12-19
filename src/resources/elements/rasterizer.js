import { inject, bindable } from 'aurelia-framework';
@inject(Element)
export class RasterizerCustomElement {
	@bindable map;
	@bindable grayscale;
	@bindable raster;
	@bindable size;
	@bindable angle;
	@bindable fileUrl;

	constructor(element) {
		this._element = element;
	}

	attached() {
		addEventListener('mousemove', e => {
			this.mouseX = e.clientX;
			this.mouseY = e.clientY;
		})

	}
	sizeChanged(newSize) {
		const size = parseInt(newSize, 10);
		this.sharpenEdges = size > 20;
		this.contrast = 2 * size;
	}

}
