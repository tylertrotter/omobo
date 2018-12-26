<template>
	<g>
		<circle class="orbit" cx="50%" cy="50%" :r="orbitRadius" :style="`stroke-dasharray: 1px ${dasharrayCalc};`" />
		<circle :id="this.id" class="planet" cx="50%" :cy="planetPosition" :r="radius + '%'" :style="rotate" />
		<use :href="'#' + this.id" :data-planet-id="this.id" class="next-tick" :style="nextTick"/>
	</g>
</template>

<script>
	import assignId from "../mixins/assignId";

	export default {
		name: 's-planet',
		mixins: [assignId],
		props: [
			'radius',
			'ring',
			'speed',
			'retrograde'
		],
		data(){
			return {
				direction: +1,
				center: null
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
			})

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
		stroke: #666;
		transform-origin: center;
		transform: rotate(-90deg);
	}
</style>