export default{
	methods: {
		getCenter(element) {
			let radius = element.width / 2;
			return {
				x: element.x + radius,
				y: element.y + radius,
				radius: radius
			};
		}
	}
}