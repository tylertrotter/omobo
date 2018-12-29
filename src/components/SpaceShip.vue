<template>
	<g>
		<circle class="space-ship" :cx="position.x + '%'" :cy="position.y + '%'" :r="burstRange + '%'" />
	</g>
</template>

<script>
	export default {
		name: "s-space-ship",
		data(){
			return {
				planet: "0",
				burstRange: 3,
				position: {x:30, y: 30},
				shipRect: {}
			}
		},
		props: {
			'player': Number
		},
		methods: {
			getPlanetsInRange() {
				let planets = this.$store.getters.planets;
				let extendedBurstRange = this.burstRange*2;
				let filteredPlanets = [];
				let planetsInRange = [];

				for(var i = 0; i < planets.length; i++){

					if(
							planets[i].id !== this.planet &&
							planets[i].nextTick.xPercent > this.position.x - extendedBurstRange &&
							planets[i].nextTick.xPercent < this.position.x + extendedBurstRange &&
							planets[i].nextTick.yPercent > this.position.y - extendedBurstRange &&
							planets[i].nextTick.yPercent < this.position.y + extendedBurstRange
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
			},
			goToPlanet(id){
				let planets = this.$store.getters.planets;
				this.position.x = (planets[id].nextTick.xPercent);
				this.position.y = (planets[id].nextTick.yPercent);

				if(this.player === this.$store.getters.turn ){
					setTimeout(() => {
						let planets = this.getPlanetsInRange();
						for( var i = 0; i < planets.length; i++){
							document.getElementById(planets[i].id).setAttribute('stroke', 'white')
							this.changePlanet(planets[i].id);
						}
					}, 600)
				}
			},
			changePlanet(id){
				this.planet = id;
			}
		},
		created(){
			this.$store.subscribe((mutation) => {
				if(mutation.type === "step"){
					this.goToPlanet(this.planet);
				}
			})
		}
	}
</script>

<style>
	.space-ship {
		fill: rgba(255, 255, 255, 0.075);
		stroke: rgba(255,255,255,.3);
		stroke-width: .05%;
		transform-origin: center;
		transition: all .7s;
	}
</style>