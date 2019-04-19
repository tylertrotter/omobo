<template>
  <div id="app">
    <s-board />
		<s-tool-details />
		<s-controls />
		<s-player-transition />
		<div class="interaction-disabler"></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import SBoard from './components/Board.vue';
import SToolDetails from './components/ToolDetails.vue';
import SControls from './components/Controls.vue';
import SPlayerTransition from './components/PlayerTransition.vue';

require('@/assets/style/variables.css');
require('@/assets/style/common.css');

export default {
  name: 'app',
  components: {
		SBoard,
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