<template>
	<circle @click="changePlanet(3)" class="space-ship" :cx="position.x" :cy="position.y" :r="burstRange + '%'" />
</template>

<script>
	export default {
		name: "s-space-ship",
		data(){
			return {
				planet: 7,
				burstRange: 3,
				position: {x:"30%", y:"30%"}
			}
		},
		methods: {
			goToPlanet(id){
				this.position.x = (this.$store.getters.planets[id].x) + '%';
				this.position.y = (this.$store.getters.planets[id].y) + '%';
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
		fill: rgba(255,255,255,.05);
		stroke: rgba(255,255,255,.3);
		stroke-width: .05%;
		transform-origin: center;
		transition: all .7s;
	}
</style>