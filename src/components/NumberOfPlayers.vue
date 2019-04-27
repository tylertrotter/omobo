<template>
	<main>
		Number of players
		<ol>
			<li v-for="i in 7" :key="i">
				<button 
					@click="updatePlayersNum(i+1)"
					:class="{'active': numPlayers === i+1}">{{ i + 1 }}</button>
			</li>
		</ol>
		<router-link @click.native="createPlayers()" to="/setup/1/customize">OK!</router-link>
	</main>
</template>

<script>
	import { mapMutations } from "vuex";
	export default {
		name: "s-number-of-players",
		data() {
			return {
				numPlayers: 2
			}
		},
		methods: {
			...mapMutations(["createPlayer"]),
			updatePlayersNum(n){
				this.numPlayers = n;
			},
			createPlayers(){
				for(let i = 0; i < this.numPlayers; i++){
					this.$store.commit('createPlayer');
				}
			}
		}
	}
</script>

<style scoped>
	ol {
		display: flex;
		justify-content: space-between;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	li {
		display: inline-block;
	}
	button {
		padding: 2vw 3.5vw;
		font-size: 4vw;
	}
	.active {
		background: red;
	}
</style>