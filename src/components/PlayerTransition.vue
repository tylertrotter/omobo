<template>
	<div class="player-transition" :class="{'active': $store.getters.turnTick === 0}" :style="'background: '+$store.getters.currentPlayer.color">
		{{ $store.getters.currentPlayer.name }}
		<button @click="remove">Ok</button>
	</div>
</template>

<script>
	export default {
		name: 's-player-transition',
		methods: {
			remove(){
				this.$el.classList.remove('active');
			}
		}
	}
</script>

<style>
	.player-transition {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 100%;
		overflow: hidden;
		transition: all .6s;
	}
	.player-transition.active{
		right: 0;
	}
</style>