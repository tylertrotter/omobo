<template>
	<div>
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
			...mapMutations(["randomizeBoard"]),
		},
		beforeCreate() {
				// this.$store.commit('randomizeBoard');
		}
	}
</script>