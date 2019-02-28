<template>
	<div @click="$store.commit('expandControls', !$store.state.ui.controlsExpanded)" :class="[{expanded: $store.state.ui.controlsExpanded}, {disabled: $store.state.ui.controlsDisabled}]" class="control-panel">
		<div class="cp-name" :style="`background-color: ${$store.getters.currentPlayer.color}; border-color: ${$store.getters.currentPlayer.color};`">
			<span class="mooko">{{$store.getters.currentPlayer.name}}</span>
			<div class="english">{{$store.getters.currentPlayer.name}}</div>
		</div>

		<div class="cp-body">

			<avatar
				:flesh="this.$store.getters.currentPlayer.color"
				:iris="this.$store.getters.currentPlayer.avatar.iris"
				:headHeight="this.$store.getters.currentPlayer.avatar.headHeight"
				:headWidth="this.$store.getters.currentPlayer.avatar.headWidth"
				:eyeSize="this.$store.getters.currentPlayer.avatar.eyeSize"
				class="cp-avatar"
				:class="'emotion--' + $store.getters.currentPlayer.avatar.emotion"
			/>

			<energy-meter :value="$store.getters.currentPlayer.energy" />

			<section class="cp-materials cp-section mb">
				<span class="cp-section--label">Materials</span>
				<ul class="cp-materials--list" dir="rtl">
					<li v-for="i in 60" :key="i"
						:class="[
							$store.state.mineralNames[$store.getters.currentPlayer.materials[i-1]],
							$store.getters.currentPlayer.materials[i-1] > -1 ? 'owned' : 'unowned'
						]"
					></li>
				</ul>
			</section>

			<section class="cp-tools cp-section mb">
				<span class="cp-section--label">Tools</span>
				<ul class="cp-tools--list">
					<li v-for="i in 4" :key="i"
						:class="$store.getters.currentPlayer.tools.length > i-1 ? $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name : 'no-tool'">
						<img v-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Turbo Booster'" src="@/assets/svgs/turbo-booster.svg" />
						<img v-else-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Freeze Bomb'" src="@/assets/svgs/freeze-bomb.svg" />
						<img v-else-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Retrograde Bomb'" src="@/assets/svgs/retrograde-bomb.svg" />
						<img v-else-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Super Booster'" src="@/assets/svgs/super-booster.svg" />
						<img v-else-if="$store.getters.currentPlayer.tools.length > i-1 && $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name === 'Warp Speed Bomb'" src="@/assets/svgs/warp-speed-bomb.svg" />
						<span class="tool-name">{{$store.getters.currentPlayer.tools.length > i-1 ? $store.state.tools[$store.getters.currentPlayer.tools[i-1]].name : '' }}</span>
					</li>
				</ul>
				<div class="tool-buttons">
					<button @click.stop="$store.commit('expandTools', !$store.state.ui.toolsExpanded)">build or use</button>
				</div>
			</section>

			<section class="cp-buttons">
				<button @click.stop="sit" :style="`border-color: ${$store.getters.currentPlayer.color};`">sit</button>
				<button @click.stop="mine" :style="`border-color: ${$store.getters.currentPlayer.color};`">mine</button>
				<button :disabled="$store.state.planetsInRange.length === 0" @click.stop="jump" :style="`border-color: ${$store.getters.currentPlayer.color};`">jump</button>
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
		methods: {
			...mapMutations(["tick", "changePlanet", "addMineral", "changeEnergy", "expandControls", "disableControls"]),
			getEnergy(){
				if(this.$store.getters.currentPlanet.bySun)
					this.changeEnergy({player: this.$store.getters.currentPlayerId, amount: 1});
			},
			disableInteraction(time){
				document.querySelector("body").classList.add("disable-interaction");

				if(time){
					setTimeout(function(){
						document.querySelector("body").classList.remove("disable-interaction");
					}, time);
				}
			},
			sit(){
				this.disableInteraction(600);
				this.getEnergy();
				this.tick(1);
			},
			mine(){
				this.disableInteraction(600);
				this.addMineral({player: this.$store.getters.currentPlayerId, mineral: this.$store.getters.currentPlanet.mineral});
				this.getEnergy();
				this.tick(1);
			},
			jump(){

				if(!this.$store.getters.currentPlayer.energy)
					return;

				this.getEnergy();

				// use energy
				this.changeEnergy({player: this.$store.getters.currentPlayerId, amount: -1});

				let planetsInRange = this.$store.state.planetsInRange;
				if( planetsInRange.length === 1){
					this.disableInteraction(600);
					this.changePlanet({player: this.$store.getters.currentPlayerId, planet: planetsInRange[0].id})
					this.tick(1);
				}else{
					this.$store.getters.currentPlayer.avatar.emotion = 'thinking';

					this.$store.commit('disableControls', true);

					let planetId = this.$store.getters.currentPlayer.planet;
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

	.control-panel.disabled {
		right: -70px;
	}

	.cp-name {
		position: absolute;
		width: 100%;
		padding: 3px 8px;
		font-size: 9px;
		margin-bottom: 0;
		transition: all .6s;
	}

	.cp-name .english {
		position: absolute;
		right: 10px;
		margin-top: .5em;
		opacity: 0;
		font-size: 11px;
		color: #888;
	}

	.cp-avatar {
		margin-bottom: .25em;
		margin-top: .75em;
		height: 6vh;
		max-width: 100%;
		transition: all .6s;
	}

	.expanded .cp-name {
		font-size: 20px;
		padding-top: 27px;
		background-color: transparent !important;
		border-top: 5px solid;
	}

	.expanded .cp-name .english {
		opacity: 1;
		transition: all .6s .6s;
	}

	.expanded .cp-avatar {
		height: 13vh;
		margin-top: -.5em;
		margin-bottom: 0;
	}

	.cp-section {
		height: 20vh;
		background: var(--gray);
		padding: 8px;
	}

	.cp-materials--list,
	.cp-tools--list {
		width: 100%;
		height: 100%;
		padding: 0 0 0 20px;
		margin: 0;
		list-style: none;
	}

	.cp-tools--list img {
		width: 16px;
		height: 16px;
	}

	.cp-materials--list {
		display: flex;
		flex-wrap: wrap;
	}

	.cp-materials--list li {
		width: calc(20% - 2px);
		height: calc(8% - 2px);
		background: rgba(255,255,255,.05);
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
		width: calc(100% - 16px);
	}

	.cp-buttons button {
		display: block;
		width: 100%;
		margin: 3vh 0;
		padding: 10px;
	}

	/* .cp-materials--list .tungsten {
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
	} */


	/* Tools */
	.cp-tools {
		position: relative;
	}

	.cp-tools--list {
		overflow: hidden;
	}

	.cp-tools--list li {
		display: flex;
		align-items: center;
		height: 25%;
		margin-bottom: 0;
		white-space: nowrap;
		transition: all .6s;
	}

	.tool-icon {
		display: inline-block;
		flex-shrink: 0;
		width: 1em;
		height: 1em;
		text-align: center;
	}

	.no-tool .tool-icon {
		background: rgba(255,255,255,.075);
		border-radius: 50%;
	}

	.tool-name {
		display: inline-block;
		opacity: 0;
		transition: .6s all;
		margin-left: .4em;
	}

	.expanded .tool-name {
		opacity: 1;
	}

	.expanded .cp-tools--list li {
		height: 20%;
	}

	.tool-buttons {
		position: absolute;
		bottom: 0;
		right: 0;
		opacity: 0;
		transition: opacity .2s;
	}

	.tool-buttons button {
		margin: 1vh;
	}

	.expanded .tool-buttons {
		opacity: 1;
		transition: opacity .6s .6s;
	}

	.interaction-disabler {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}

	.disable-interaction .interaction-disabler {
		display: block;
	}
</style>