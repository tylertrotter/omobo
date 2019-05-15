<template>
	<main class="wrapper">
		<h1>Customize player {{ player }}</h1>

		<div class="customizer-layout">
			<form>
				<div class="field">
					<label for="color">Color</label>
					<s-color-picker id="color" initial-color="#bada55" @color-change="updateFlesh" />
				</div>

				<div class="field">
					<!-- http://danielstern.ca/range.css -->
					<label for="width">Width</label>
					<s-range type="range" id="width" step=".01" min=".8" max="1.2" :value="1" @update-value="updateWidth" />
				</div>

				<div class="field">
					<label for="height">Height</label>
					<s-range type="range" id="height" step=".01" min=".8" max="1.15" :value=".975" @update-value="updateHeight" />
				</div>

				<div class="field">
					<label for="eye-color">Eye Color</label>
					<s-color-picker id="eye-color" initial-color="#bada55"  @color-change="updateIris"/>
				</div>

				<div class="field">
					<label for="eye-size">Eye Size</label>
					<s-range type="range" id="eye-size" step=".01" min=".6" max="1.3" :value=".975" @update-value="updateEyeSize" />
				</div>

				<div class="field">
					<label>Name</label>
					<div></div>
				</div>
			</form>

			<avatar 
				:flesh="this.$store.state.players[player-1].color"
				:iris="this.$store.state.players[player-1].avatar.iris"
				:headWidth="this.$store.state.players[player-1].avatar.headWidth"
				:headHeight="this.$store.state.players[player-1].avatar.headHeight"
				:eyeSize="this.$store.getters.currentPlayer.avatar.eyeSize"
				class="emotion--null"
			/>
		</div>

		<!-- 
			
			
		 -->

		<router-link v-if="morePlayers" :to="`/setup/${player + 1}/customize`">Customize player {{ player + 1 }}</router-link>
		<router-link v-else to="/game">start the game</router-link>
	</main>
</template>

<script>
	import { mapMutations } from "vuex";
	import { mapState } from 'vuex'
	import SColorPicker from "./ColorPicker.vue"
	import SRange from "./Range.vue"
	import Avatar from "./Avatar.vue"
	export default {
		name: 's-player-customizer',
		props: {
			player: Number
		},
		components: { SColorPicker, SRange, Avatar },
		computed: {
			...mapState(['players']),
			morePlayers() {
				return this.$store.getters.numberOfPlayers > this.$props.player;
			}
		},
		methods: {
			...mapMutations(["customizeFlesh", "customizeIris", "customizeWidth"]),
			updateFlesh(color){
				this.$store.commit("customizeFlesh", {player: this.$props.player, color: color});
			},
			updateIris(color){
				this.$store.commit("customizeIris", {player: this.$props.player, color: color});
			},
			updateWidth(width){
				this.$store.commit("customizeWidth", {player: this.$props.player, headWidth: width});
			},
			updateHeight(height){
				this.$store.commit("customizeHeight", {player: this.$props.player, headHeight: height});
			},
			updateEyeSize(eyeSize){
				this.$store.commit("customizeEyeSize", {player: this.$props.player, eyeSize: eyeSize});
			}
		},
	}
</script>

<style scoped>
	.customizer-layout {
		display: flex;
	}

	form {
		width: 20%;
		text-align: left;
	}

	.field + .field {
		margin-top: 3vh;
	}

	.customizer-layout svg {
		width: 80%;
		height: 80%;
		margin-top: -7%;
	}
</style>