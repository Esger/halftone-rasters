import { bindable } from 'aurelia-framework';
export class RasterizerCustomElement {
	@bindable raster;
	@bindable size;
	@bindable angle;
	sizeChanged(newSize) {
		const size = parseInt(newSize, 10);
		this.sharpenEdges = size > 20;
		this.contrast = 2 * size;
	}
}
