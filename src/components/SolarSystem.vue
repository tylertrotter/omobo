<template>
	<svg class="solar-system" :width="width + '%'" :height="height + '%'">
		<circle class="sun" cx="50%" cy="50%" :r="sunSize + '%'" />
		<slot></slot>
	</svg>
</template>

<script>
	export default {
		name: 's-solar-system',
		props: [
			"width",
			"sun-size",
			"clockwise"
		],
		computed: {
			height(){
				return this.width * (this.$store.state.ui.aspectRatio.x / this.$store.state.ui.aspectRatio.y);
			}
		}
	}
</script>

<style>
	.sun {
		fill: var(--sun);
	}

	.zoom .sun {
		opacity: .3;
		fill: gray;
	}
</style>