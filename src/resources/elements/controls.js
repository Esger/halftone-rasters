import { bindable } from 'aurelia-framework';

export class Controls {
	constructor() {
		this.rasters = [
			{ name: 'Dotted', value: 'dotted' },
			{ name: 'Lined', value: 'lined' }
		];
		this.selectedRaster = 'dotted';
	}

}
