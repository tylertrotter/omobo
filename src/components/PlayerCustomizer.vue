<template>
	<div>
		<h1>Customize Player {{ $route.params.player }}</h1>
		<router-link :to="`/setup/${+$route.params.player + 1}/customize`">Customize player {{ +$route.params.player + 1 }}</router-link>
		<router-link to="/game">start the game</router-link>
	</div>
</template>

<script>
	export default {
		name: 's-player-customizer'
	}
</script>

<style lang="scss" scoped>

</style>