<template>
  <div id="app">
    <s-board />
		<s-controls />
  </div>
</template>

<script>

import SBoard from './components/Board.vue';
import SControls from './components/Controls.vue';


require('@/assets/style/variables.css');

export default {
  name: 'app',
  components: {
		SBoard,
		SControls
  }
}
</script>

<style>
	body {
		margin: 0;
		overflow: hidden;
	}

	svg {
		background: var(--void);
	}
</style>
