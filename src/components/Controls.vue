<template>
	<div class="controls">
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