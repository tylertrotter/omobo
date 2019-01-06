<template>
	<g>
		<circle class="orbit" cx="50%" cy="50%" :r="orbitRadius" :style="`stroke-dasharray: 1px ${dasharrayCalc};`" />
		<circle @click="jumpHere" :id="this.id" class="planet" :class="mineral" cx="50%" :cy="planetPosition" :r="radius + '%'" :style="rotate" />
		<use :href="'#' + this.id" :data-planet-id="this.id" class="next-tick" :style="nextTick"/>
	</g>
</template>

<script>
	import { mapMutations } from "vuex";
	import assignId from "../mixins/assignId";

	export default {
		name: 's-planet',
		mixins: [assignId],
		props: [
			'radius',
			'ring',
			'speed',
			'retrograde',
			'mineral'
		],
		data(){
			return {
				direction: +1,
				center: null
			}
		},
		methods: {
			...mapMutations(['changePlanet', 'step']),
			jumpHere(){
				let galaxy = document.getElementById('galaxy');
				galaxy.setAttribute('style', '');
				galaxy.classList.remove('zoom');
				// remove in-range class
				setTimeout(() => {
					this.changePlanet({player: this.$store.getters.turn - 1, planet: this.id})
					this.step(1);
				}, 1000)

			}
		},
		computed: {
			planetPosition(){
				const outerOrbit = 45;
				return (outerOrbit - this.ring * 5) + '%';
			},
			orbitRadius(){
				const minOrbitRadius = 5;
				return (minOrbitRadius + this.ring * 5) + '%';
			},
			dasharrayCalc(){
				const circum = ((parseInt(this.orbitRadius, 10) * 2 * Math.PI) / this.speed).toFixed(2);
				return `calc(${circum}% - 1px)`;
			},
			rotate(){
				let degrees = (360 / this.speed) * (this.$store.state.tick * this.direction);
				return `transform: rotate(${degrees}deg);`
			},
			nextTick(){
				let degrees = (360 / this.speed) * this.direction;
				return `transform: rotate(${degrees}deg);`
			}

		},
		created(){
			const primaryDirection = this.$parent.$props.clockwise ? +1 : -1;
			this.direction = this.retrograde ? primaryDirection * -1 : primaryDirection;

			this.$store.subscribe((mutation) => {
				if(mutation.type === "step"){
					this.$store.commit("updatePlanet", this.id)
				}
			});
		}
	}
</script>

<style scoped>
	.planet,
	.next-tick {
		transform-origin: center;
		transition: all .5s;
	}
	.planet {
		fill: red;
	}
	.next-tick {
		opacity: 0;
	}
	.orbit {
		fill: none;
		stroke-width: 1px;
		stroke: #999;
		transform-origin: center;
		transform: rotate(-90deg);
	}

	.tungsten {
		fill: var(--tungsten);
	}

	.radium {
		fill: var(--radium);
	}

	.copper {
		fill: var(--copper);
	}

	.mercury {
		fill: var(--mercury);
	}

	.tin {
		fill: var(--tin);
	}

	.zoom .planet:not(.in-range){
		opacity: .3;
	}
</style>