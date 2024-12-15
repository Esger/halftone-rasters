import { bindable } from 'aurelia-framework';
export class RasterizerCustomElement {
	@bindable map;
	@bindable grayscale;
	@bindable raster;
	@bindable size;
	@bindable angle;
	@bindable fileUrl;

	sizeChanged(newSize) {
		const size = parseInt(newSize, 10);
		this.sharpenEdges = size > 20;
		this.contrast = 2 * size;
	}
}
