<template>
	<div @click="isExpanded = !isExpanded" :class="{expanded: isExpanded}" class="control-panel">

		<div class="cp-name" :style="`background-color: ${currentPlayer.color};`">
			<span class="mooko">{{currentPlayer.name}}</span>
		</div>

		<div class="cp-body">

			<svg class="cp-avatar mb">
				<rect x=0 y=0 width=100% height=100% fill="gray" />
			</svg>

			<meter dir="rtl" class="cp-energy mb" min="0" max="24" value="6" />

			<section class="cp-materials cp-section mb">
				<span class="cp-section--label">Materials</span>
				<ul class="cp-materials--list" dir="rtl">
					<li v-for="i in 20" :key="i"
						:class="5 > 0 ? $store.state.mineralNames[currentPlayer.materials[i-1]] : ''"
					></li>
				</ul>
			</section>

			<section class="cp-tools cp-section mb">
				<span class="cp-section--label">Tools</span>
			</section>

			<section class="cp-buttons">
				<button @click.stop="step(1)">sit</button>
				<button @click.stop="mine">mine</button>
				<button :disabled="this.$store.state.planetsInRange.length === 0" @click.stop="jump">jump</button>
			</section>

		</div>

	</div>
</template>

<script>
	import { mapMutations } from "vuex";
	import utility from "../mixins/utility";

	export default {
		name: "s-controls",
		mixins: [utility],
		data(){
			return{
				isExpanded: false
			}
		},
		computed: {
			currentPlayerId(){
				return this.$store.getters.turn - 1;
			},
			currentPlayer(){
				return this.$store.state.players[this.currentPlayerId];
			}
		},
		methods: {
			...mapMutations(["step"]),
			...mapMutations(["changePlanet"]),
			mine(){
				this.step(1);
			},
			jump(){
				let planetsInRange = this.$store.state.planetsInRange;
				if( planetsInRange.length === 1){
					this.changePlanet({player: this.currentPlayerId, planet: planetsInRange[0].id})
					this.step(1);
				}else{
					let planetId = this.currentPlayer.planet;
					let shipCoords = this.getCenter(document.getElementById(planetId).getBoundingClientRect());

					const galaxy = document.getElementById('galaxy');
					galaxy.style.transformOrigin = `${shipCoords.x}px ${shipCoords.y}px`;

					let galaxyRect = galaxy.getBoundingClientRect();
					let xOffset = galaxyRect.width/2 - shipCoords.x;
					let yOffset = galaxyRect.height/2 - shipCoords.y;

					galaxy.style.transform = `scale(2.2) translateX(${xOffset/2.2}px) translateY(${yOffset/2.2}px)`;
					galaxy.classList.add('zoom');

					for( let i = 0; i < planetsInRange.length; i++ ){
						document.getElementById(planetsInRange[i].id).classList.add('in-range');
					}
				}
			}

		}
	}
</script>

<style >
	.control-panel {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		width: 70px;
		background: var(--control-panel);
		color: white;
		transition: all .5s;
	}

	.cp-body {
		padding: 8px;
	}

	* {
		box-sizing: border-box;
	}

	.mb{
		margin-bottom: 3vh;
	}

	.control-panel.expanded {
		width: 230px;
		background: rgba(0,0,0,.7);
	}

	.cp-name {
		padding: 3px 8px;
		font-size: 9px;
	}

	.cp-avatar {
		display: block;
		width: 54px;
		height: 54px;
	}

	.cp-energy {
		width: 100%;
		height: 8px;
	}

	.cp-section {
		height: 20vh;
		background: #222;
		padding: 8px;
	}

	.cp-materials--list {
		display: flex;
		width: 100%;
		height: 100%;
		padding: 0 0 0 20px;
		margin: 0;
		flex-wrap: wrap;
		list-style: none;
	}

	.cp-materials--list li {
		width: calc(20% - 2px);
		height: calc(25% - 2px);
		background: rgba(255,255,255,.1);
		margin: 1px;
	}

	.cp-section--label {
		display: block;
		position: absolute;
		width: calc(20vh - 12px);
		height: 20px;
		margin-top: calc(20vh - 12px);
		transform: rotate(-90deg);
		transform-origin: 0 top;
		text-align: center;
		font-size: 12px;
		text-transform: uppercase;
	}

	.cp-buttons {
		position: absolute;
		bottom: 0;
	}

	.cp-buttons button {
		display: block;
		width: 100%;
		margin: 3vh 0;
		padding: 10px;
	}

	.cp-materials--list .tungsten {
		background: var(--tungsten);
	}

	.cp-materials--list .radium {
		background: var(--radium);
	}

	.cp-materials--list .copper {
		background: var(--copper);
	}

	.cp-materials--list .mercury {
		background: var(--mercury);
	}

	.cp-materials--list .tin {
		background: var(--tin);
	}
</style>