<template>
	<div class="controls">
		<div style="color: white;">player: {{this.$store.getters.turn}}</div>
		<button @click="step(1)">next</button>
	</div>
</template>

<script>
	import { mapMutations } from "vuex"
	export default {
		name: "s-controls",
		methods: {
			...mapMutations(["step"])
		}
	}
</script>

<style >
	.controls {
		position: absolute	;
		top: 10px;
		right: 10px;
	}
</style>