<template>
	<div class="board">
		<s-galaxy />
		<s-tool-details />
		<s-controls />
		<s-player-transition />
		<div class="interaction-disabler"></div>
	</div>
</template>

<script>
	import SGalaxy from './Galaxy.vue';
	import SToolDetails from './ToolDetails.vue';
	import SControls from './Controls.vue';
	import SPlayerTransition from './PlayerTransition.vue';
	import { mapMutations } from "vuex";

	export default {
		name: 's-board',
		components: {
			SGalaxy,
			SToolDetails,
			SControls,
			SPlayerTransition
		},
		methods: {
			...mapMutations(["setAspectRatio"]),
		},
		created(){
				// this.$store.commit('setAspectRatio');

			if(this.$store.state.players.length < 2)
				this.$router.push({path: '/'})
		},
		beforeCreate() {
				// this.$store.commit('randomizeBoard');
		}
	}
</script>

<style scoped>
	.board {
		display: flex;
		position: relative;
    flex-direction: column;
    justify-content: center;
		background: #333;
		overflow: hidden;
		height: 100vh;
	}
</style>