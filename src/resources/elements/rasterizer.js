import { inject } from 'aurelia-dependency-injection';
@inject(Element)
export class RasterizerCustomElement {
	constructor(element) {
		this._element = element;
	}

	attached() {
		this._rasterElement = this._element.querySelector('.target');
	}
}
