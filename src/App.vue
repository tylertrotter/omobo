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
	*{
		box-sizing: border-box;
	}
	body {
		margin: 0;
		overflow: hidden;
		font-family: Arial, Helvetica, sans-serif;
	}

	svg {
		background: var(--void);
	}
</style>
