<template>
	<main class="wrapper">
		<img src="@/assets/svgs/ogopo-logo.svg" alt="Ogopo" />
		<router-link to="/setup/players" class="button">Play</router-link>
	</main>
</template>

<script>
	export default {
		name: "s-start"
	}
</script>

<style scoped>
	img {
    display: block;
		height: 33vh;
    max-width: 100%;
		margin: 17vh auto 8vh;
	}
	.button {
		font-size: 2em;
	}
</style>