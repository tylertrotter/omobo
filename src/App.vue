<template>
  <div id="app">
		<mooko />
    <s-board />
		<s-controls />
  </div>
</template>

<script>

import SBoard from './components/Board.vue';
import SControls from './components/Controls.vue';

import Mooko from './components/Mooko.vue';


require('@/assets/style/variables.css');

export default {
  name: 'app',
  components: {
		SBoard,
		SControls,
		Mooko
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
