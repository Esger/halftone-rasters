import $ from 'jquery';

export class App {
	constructor() {
		this._determineTouchDevice();
	}

	_determineTouchDevice() {
		this._setIsTouchDevice('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0);
		$('body').one('touchstart', _ => this._setIsTouchDevice(true))
	}

	_setIsTouchDevice(isTouch) {
		$('html').toggleClass('touch-device', isTouch);
		sessionStorage.setItem('touch-device', isTouch);
	}
}
