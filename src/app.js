import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import $ from 'jquery';

@inject(Element, EventAggregator)
export class App {
	constructor(element, eventAggregator) {
		this._element = element;
		this._eventAggregator = eventAggregator;
		this._determineTouchDevice();
		this._element.addEventListener('mousemove', this.mouseMoved.bind(this));
	}

	_determineTouchDevice() {
		this._setIsTouchDevice('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0);
		$('body').one('touchstart', _ => this._setIsTouchDevice(true))
	}

	_setIsTouchDevice(isTouch) {
		$('html').toggleClass('touch-device', isTouch);
		sessionStorage.setItem('touch-device', isTouch);
	}

	mouseMoved(event) {
		this._eventAggregator.publish('mouse-moved', event);
	}
}
