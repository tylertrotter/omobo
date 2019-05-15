<template>
	<span class="color-picker">
		<span class="swatch" @click="pickerShown = !pickerShown" :style="`background-color: ${color};`"></span>
		<div v-show="pickerShown" class="iro-color-picker"></div>
	</span>
</template>

<script>
	import iro from '@jaames/iro';
	export default {
		name: 's-color-picker',
		props: {
			initialColor: String
		},
		data(){
			return {
				color: this.$props.initialColor || '#fff',
				pickerShown: false
			}
		},
		methods: {
			onColorChange(color){
				this.color = color.hexString;
				this.$emit("color-change", this.color);
			}
		},
		mounted(){
			let colorPicker = new iro.ColorPicker(this.$el.querySelector('.iro-color-picker'), {width: 150, color: this.color});
			colorPicker.on('color:change', this.onColorChange);
		}
	}
</script>

<style scoped>
	.color-picker {
		display: block;
		position: relative;
		/* padding: .5em; */
		/* vertical-align: middle; */
	}

	.swatch {
		display: inline-block;
		width: 30px;
		height: 30px;
		border: 1px solid hsla(0, 0%, 50%, .3);
		border-radius: 50%;
	}

	.iro-color-picker {
		position: absolute;
		z-index: 1;
		left: 0;
		background: black;
		border: 1px solid #333;
		padding: 1rem;
	}
</style>