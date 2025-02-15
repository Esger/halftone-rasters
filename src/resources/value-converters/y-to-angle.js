export class YToAngleValueConverter {
	toView(value) {
		const angle = Math.round(10 * value / window.innerHeight * 90) / 10;
		return angle + 'deg';
	}
}
