<template>
	<div @click="remove" class="player-transition" :class="{'active': $store.getters.turnTick === 0}">
		<div class="mooko">{{ $store.getters.currentPlayer.name }}</div>
		<avatar
				:flesh="this.$store.getters.currentPlayer.color"
				:iris="this.$store.getters.currentPlayer.avatar.iris"
				:headHeight="this.$store.getters.currentPlayer.avatar.headHeight"
				:headWidth="this.$store.getters.currentPlayer.avatar.headWidth"
				:eyeSize="this.$store.getters.currentPlayer.avatar.eyeSize"
				:class="'emotion--' + $store.getters.currentPlayer.avatar.emotion"
				class="transition-screen-avatar"
			/>
	</div>
</template>

<script>
	import avatar from './Avatar.vue';
	export default {
		name: 's-player-transition',
		components: { avatar },
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
		background: rgba(0,0,0,.8);
		overflow: hidden;
		transition: all .6s;
	}
	.player-transition.active{
		right: 0;
	}

	.player-transition .mooko {
		position: absolute;
		right: 200%;
		color: white;
		font-size: 13vw;
		transition: right 1s;
	}

	.player-transition.active .mooko{
		right: 0;
	}

	.transition-screen-avatar {
		width: 100vh;
    display: block;
		transition: all 1s;
	}
</style>