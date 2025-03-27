import $ from 'jquery';

export class App {
	constructor() {
		this._determineTouchDevice();
	}

	_determineTouchDevice() {
		if ('ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0)
			this._setIsTouchDevice(true);
		else
			this._setIsTouchDevice(false);
		$('body').one('touchstart', _ => this._setIsTouchDevice(true))
	}

	_setIsTouchDevice(isTouch) {
		$('html').toggleClass('touch-device', isTouch);
		sessionStorage.setItem('touch-device', isTouch);
	}
}
