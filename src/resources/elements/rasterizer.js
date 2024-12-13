import { inject } from 'aurelia-dependency-injection';
@inject(Element)
export class RasterizerCustomElement {
	constructor(element) {
		this._element = element;
		this.rasters = [
			{ name: 'Dotted', value: 'dotted' },
			{ name: 'Lined', value: 'lined' }
		];
		this.selectedRaster = 'dotted';
	}

	attached() {
		this._rasterElement = this._element.querySelector('.target');
	}

	rasterChanged(value) {
		this._rasterElement.classList.remove('lined', 'dotted').add(value);
	}
}
