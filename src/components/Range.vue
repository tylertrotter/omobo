<template>
	<input type="range" @input="updateValue">
</template>

<script>
	export default {
		name: "s-range",
		methods: {
			updateValue(e){
				this.$emit("update-value", +e.target.value);
			}
		},
	}
</script>

<style scoped>
		
	/* Range */
	input[type=range] {
		-webkit-appearance: none;
		width: 100%;
		margin: 10px 0;
		background: transparent;
	}

	input[type=range]:focus {
		outline: none;
	}

	input[type=range]:focus::-webkit-slider-thumb {
		border: 2px solid white;
	}

	input[type=range]::-webkit-slider-runnable-track {
		width: 100%;
		height: 6px;
		cursor: pointer;
		box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8), 0px 0px 1px rgba(255, 255, 255, 0.8);
		background: #969696;
		border-radius: 25px;
		border: 0;
	}

	input[type=range]::-webkit-slider-thumb {
		box-shadow: 3px 3px 4px #000031, 0px 0px 3px #00004b;
		border: 2px solid #aaa;
		height: 26px;
		width: 26px;
		border-radius: 15px;
		background: #c8c8c8;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -10px;
	}

	input[type=range]:focus::-webkit-slider-runnable-track {
		background: #a3a3a3;
	}

	input[type=range]::-moz-range-track {
		width: 100%;
		height: 6px;
		cursor: pointer;
		box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.8), 0px 0px 1px rgba(255, 255, 255, 0.8);
		background: #969696;
		border-radius: 25px;
		border: 0;
	}

	input[type=range]::-moz-range-thumb {
		box-shadow: 2.7px 2.7px 4px #000031, 0px 0px 2.7px #00004b;
		border: 2.px solid #ffffff;
		height: 26px;
		width: 26px;
		border-radius: 15px;
		background: #c8c8c8;
		cursor: pointer;
	}
</style>