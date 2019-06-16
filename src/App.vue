<template>
  <div id="app">
		<router-view :key="$route.fullPath"/>
		<router-link to="/rules" class="rules-link"><abbr title="information">i</abbr></router-link>
		<div class="portrait">
			Ogopo is designed to be played in a landscape orientation.
		</div>
  </div>
</template>

<script>
require('@/assets/style/variables.css');
require('@/assets/style/common.css');

export default {
  name: 'app'
}
</script>

<style>
	@media (orientation: landscape) {
		.portrait {
			display: none;
		}
	}

	@media (orientation: portrait) {
		.board {
			display: none !important;
		}
		.portrait {
			padding: 2rem;
			text-align: center;
		}
	}
</style>