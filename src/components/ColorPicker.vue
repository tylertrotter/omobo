<template>
	<span class="color-picker">
		<span class="swatch" @click="pickerShown = !pickerShown" :style="`background-color: ${color};`"></span>
		<div v-show="pickerShown" class="iro-color-picker">
			<button class="color-picker--close" type="button" @click="pickerShown = !pickerShown">&times;</button>
		</div>
		<div class="overlay" v-if="pickerShown" @click="pickerShown = false"></div>
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
		z-index: 3;
		left: 0;
		background: black;
		border: 1px solid #333;
		padding: 1rem;
	}

	.color-picker--close {
		position: absolute;
		top: .5rem;
		right: .5rem;
		border: 0;
		padding: 0;
		font-size: 1.5em;
		line-height: 1;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
		/* background: rgba(0,0,0,.5); */
	}
</style>