<template>
		<g class="space-ship"
			x="0"
			y="0"
			width="3%"
			height="5%"
			:class="{active: active}"
			:style="`transform: translate(${$store.state.players[player-1].position.x}%, ${$store.state.players[player-1].position.y}%);`"
		>
			<circle
				class="burst-range"
				:cx="0"
				:cy="0"
				:r="($store.state.players[player-1].burstRange * 2.5) + '%'"
				:fill="$store.state.players[player-1].color"
				:stroke="$store.state.players[player-1].color"
				stroke-width="2"
			/>
			<rect
				class="ship"
				x="1.2%"
				y="0"
				width=".3%"
				height=".4%"
				:fill="$store.state.players[player-1].color"
				:style="`transform: rotate(${30 * player}deg);`"
			/>
		</g>
</template>

<script>
	import utility from "../mixins/utility";
	export default {
		name: "s-space-ship",
		mixins: [utility],
		data(){
			return {
				active: this.$store.getters.turn === this.player
			}
		},
		props: {
			'player': Number
		},
		methods: {

			goToPlanet(id){
				let planets = this.$store.state.planets;
				let position = this.$store.state.players[this.player-1].position;

				position.x = (planets[id].nextTick.xPercent);
				position.y = (planets[id].nextTick.yPercent);

				if(this.$store.getters.turn === this.player){
					setTimeout(() => {
						this.$store.commit('updatePlanetsInRange', this.getPlanetsInRange());
					}, 600)
				}
			}
		},
		created(){
			this.$store.subscribe((mutation) => {
				if(mutation.type === "tick"){
					this.goToPlanet(this.$store.getters.currentPlayer.planet);

					this.active = this.$store.getters.turn === this.player;
				}
			})
		}
	}
</script>

<style>
	.space-ship {
		transition: all .7s;
	}

	.burst-range {
		opacity: .5;
		fill-opacity: .2;
		stroke-width: .08%;
		transform-origin: center;

	}

	.active .burst-range {
		opacity: 1;
		stroke-width: .3%;
	}

	@keyframes orbit {
		0% {transform: rotate(0deg);  }
		100% {transform: rotate(360deg); }
	}

	.ship {
		transform-origin: 0 0;
	}

	.active .ship {
		animation: 5s orbit linear infinite;
	}

	.zoom .burst-range{
		display: none;
	}
</style>