import { bindable } from 'aurelia-framework';
import { inject } from 'aurelia-dependency-injection';
@inject(Element)
export class RasterizerCustomElement {
	@bindable raster;
	@bindable size;
	@bindable angle;
	constructor(element) {
		this._element = element;
	}
}
