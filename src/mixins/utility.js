export default{
	methods: {
		getPlanetsInRange() {
			let activeShip = this.$store.state.players[this.player-1];
			let planets = this.$store.state.planets;
			let extendedBurstRange = this.burstRange*2;
			let filteredPlanets = [];
			let planetsInRange = [];

			for(var i = 0; i < planets.length; i++){
				if(
						planets[i].id !== this.$store.state.players[this.$store.getters.turn-1].planet &&
						planets[i].nextTick.xPercent > activeShip.position.x - extendedBurstRange &&
						planets[i].nextTick.xPercent < activeShip.position.x + extendedBurstRange &&
						planets[i].nextTick.yPercent > activeShip.position.y - extendedBurstRange &&
						planets[i].nextTick.yPercent < activeShip.position.y + extendedBurstRange
					){
						filteredPlanets.push(planets[i]);
				}
			}

			for(var j = 0; j < filteredPlanets.length; j++){
				if ( this.getDistanceBetween(filteredPlanets[j]) < 0 ){
					planetsInRange.push(filteredPlanets[j]);
				}
			}

			return planetsInRange;
		},
		getDistanceBetween(planet) {
			var a = this.getCenter(planet.nextTick);
			var b = this.getCenter(this.$el.getBoundingClientRect());
			return Math.hypot((a.x - b.x), (a.y - b.y)) - a.radius - b.radius;
		},
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