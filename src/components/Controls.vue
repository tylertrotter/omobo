<template>
	<div @click="isExpanded = !isExpanded" :class="{expanded: isExpanded}" class="control-panel">

		<div class="cp-name" :style="`background-color: ${currentPlayer.color}; border-color: ${currentPlayer.color};`">
			<span class="mooko">{{currentPlayer.name}}</span>
			<div class="english">{{currentPlayer.name}}</div>
		</div>

		<div class="cp-body">

			<avatar
				:flesh="currentPlayer.color"
				:iris="currentPlayer.avatar.iris"
				:headHeight="currentPlayer.avatar.headHeight"
				:headWidth="currentPlayer.avatar.headWidth"
				:eyeSize="currentPlayer.avatar.eyeSize"
				class="cp-avatar"
			/>

			<energy-meter :value="currentPlayer.energy" />

			<section class="cp-materials cp-section mb">
				<span class="cp-section--label">Materials</span>
				<ul class="cp-materials--list" dir="rtl">
					<li v-for="i in 60" :key="i"
						:class="5 > 0 ? $store.state.mineralNames[currentPlayer.materials[i-1]] : ''"
					></li>
				</ul>
			</section>

			<section class="cp-tools cp-section mb">
				<span class="cp-section--label">Tools</span>
			</section>

			<section class="cp-buttons">
				<button @click.stop="sit">sit</button>
				<button @click.stop="mine">mine</button>
				<button :disabled="this.$store.state.planetsInRange.length === 0" @click.stop="jump">jump</button>
			</section>

		</div>

	</div>
</template>

<script>
	import { mapMutations } from "vuex";
	import utility from "../mixins/utility";
	import energyMeter from "./EnergyMeter.vue"
	import avatar from "./Avatar.vue"

	export default {
		name: "s-controls",
		mixins: [utility],
		components: { avatar, energyMeter },
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
			},
			currentPlanet(){
				return this.$store.state.planets[+this.currentPlayer.planet];
			}
		},
		methods: {
			...mapMutations(["step", "changePlanet", "addMineral", "changeEnergy"]),
			getEnergy(){
				if(this.currentPlanet.bySun)
					this.changeEnergy({player: this.currentPlayerId, amount: 1});
			},
			sit(){
				this.step(1);
				this.getEnergy();
			},
			mine(){
				this.step(1);
				this.addMineral({player: this.currentPlayerId, mineral: this.currentPlanet.mineral});
				this.getEnergy();
			},
			jump(){

				if(!this.currentPlayer.energy)
					return;

				this.getEnergy();

				// use energy
				this.changeEnergy({player: this.currentPlayerId, amount: -1});

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
	}

	.cp-name {
		padding: 3px 8px;
		font-size: 9px;
		margin-bottom: 0;
		transition: all .6s;
	}

	.cp-name .english {
		position: absolute;
		right: 10px;
		margin-top: 1em;
		opacity: 0;
		font-size: 11px;
		color: #888;
	}

	.cp-avatar {
		margin-bottom: .5em;

	}

	.expanded .cp-name {
		font-size: 20px;
		margin-bottom: 85px;
		padding-top: 30px;
		background-color: transparent !important;
		border-top: 5px solid;
	}

	.expanded .cp-name .english {
		opacity: 1;
		transition: all .6s .6s;
	}

	.expanded .cp-avatar {
		position: absolute;
		width: 60%;
		top: 5px;
		left: -5px;
	}

	.cp-section {
		height: 20vh;
		background: var(--gray);
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
		height: calc(8% - 2px);
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