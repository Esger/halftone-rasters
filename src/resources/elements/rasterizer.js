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
		console.log(this._constrain)
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
