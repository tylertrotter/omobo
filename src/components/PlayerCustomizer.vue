<template>
	<main class="wrapper">
		<h1>Customize player {{ player }}</h1>

		<div class="customizer-layout">
			<form>
				<div class="field">
					<label for="color">Color</label>
					<s-color-picker id="color" initial-color="#ccc" @color-change="updateFlesh" />
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
					<s-color-picker id="eye-color" initial-color="#ccc"  @color-change="updateIris"/>
				</div>

				<div class="field">
					<label for="eye-size">Eye Size</label>
					<s-range type="range" id="eye-size" step=".01" min=".6" max="1.3" :value=".975" @update-value="updateEyeSize" />
				</div>

				<div class="field">
					<label>Name</label>
					<s-mooko @change="updateName"/>
				</div>
			</form>

			<avatar 
				:flesh="currentPlayer.color"
				:iris="currentPlayer.avatar.iris"
				:headWidth="currentPlayer.avatar.headWidth"
				:headHeight="currentPlayer.avatar.headHeight"
				:eyeSize="currentPlayer.avatar.eyeSize"
				class="emotion--null"
			/>
		</div>
		<div>
			<div class="error-message" :class="{'error-message--hide': !showErrorMessage}">{{validate.message}}</div>
		</div>
		<button v-if="morePlayers" @click="goToNext">Customize player {{ player + 1 }}</button>
		<button v-else @click="goToNext">start the game</button>
	</main>
</template>

<script>
	import { mapMutations } from "vuex";
	import { mapState } from 'vuex'
	import SColorPicker from "./ColorPicker.vue"
	import SRange from "./Range.vue"
	import SMooko from "./Mooko.vue"
	import Avatar from "./Avatar.vue"
	export default {
		name: 's-player-customizer',
		props: {
			player: Number
		},
		components: { SColorPicker, SRange, Avatar, SMooko },
		data() {
			return {
				errorMessage: null,
				showErrorMessage: false
			}
		},
		computed: {
			...mapState(['players']),
			morePlayers() {
				return this.$store.getters.numberOfPlayers > this.$props.player;
			},
			currentPlayer(){
				return this.$store.state.players[this.$props.player-1];
			},
			validate(){
				if(this.currentPlayer.color === "#ccc")
					return {error: true, message: "Pick a color for your player"};
				else if(this.currentPlayer.name.length === 0)
					return {error: true, message: "Pick a name for your player"};
				else if(this.currentPlayer.name.length === 1)
					return {error: true, message: "Pick a longer name for your player"};
				else
					return {error: false, message: null}
			}
		},
		created(){
			if(!this.currentPlayer)
				this.$router.push({path: '/'})
		},
		methods: {
			...mapMutations(["customizeFlesh", "customizeIris", "customizeWidth"]),
			updateFlesh(color){
				this.$store.commit("customizeFlesh", {player: this.$props.player, color: color});
				this.showErrorMessage = false;
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
			},
			updateName(name){
				this.$store.commit("customizeName", {player: this.$props.player, name: name});
				this.showErrorMessage = false;
			},
			goToNext(){
				if(this.validate.error)
					this.showErrorMessage = true;
				else if(this.morePlayers)
					this.$router.push({path: `/setup/${this.$props.player + 1}/customize`});
				else
					this.$router.push({path: `/game`});


			}
		},
	}
</script>

<style scoped>
	.customizer-layout {
		display: flex;
	}

	form {
		width: 30%;
		text-align: left;
	}

	.field + .field {
		margin-top: 3vh;
	}

	.customizer-layout svg {
		width: 70%;
		height: 80%;
		margin-top: -7%;
	}

	.error-message {
		display: inline-block;
		min-height: 2em;
		background: var(--color-2);
		margin-bottom: 1rem;
		padding: .8rem 1rem;
		transition: .2s;

	}

	.error-message--hide {
		opacity: 0;
	}

</style>