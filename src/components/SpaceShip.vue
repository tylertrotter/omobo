<template>
	<g>
		<circle class="space-ship"
			:class="{active: active}"
			:cx="position.x + '%'"
			:cy="position.y + '%'"
			:r="burstRange + '%'"
			:stroke="color"
			:fill="color"
		/>
		<svg width="4%" height="6%" :x="position.x - 2 + '%'" :y="position.y - 3 + '%'" class="ship-orbit">
			<!-- <rect fill="green" x="0" y="0" width="100%" height="100%" fill-opacity=".3" /> -->
			<circle class="not-burst-range" fill="white" cx="20" cy="20" r="2"  :style="'transform: rotate(' + player * 25 + 'deg)'" />
		</svg>
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
				active: this.$store.getters.turn === this.player
			}
		},
		props: {
			'player': Number,
			'color': String
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

					this.active = this.$store.getters.turn === this.player;
				}
			})
		}
	}
</script>

<style>
	.space-ship {
		opacity: .5;
		fill-opacity: .2;
		stroke-width: .05%;
		transform-origin: center;
		transition: all .7s;
	}

	.active.space-ship {
		opacity: 1;
		stroke-width: .2%;
	}

	@keyframes orbit {
		0% {transform: rotate(0deg);  }
		100% {transform: rotate(360deg); }
	}


	.not-burst-range {
		fill: white;
		transform-origin: center;
		animation: 10s orbit linear infinite;
		transition: all .7s;
	}
</style>