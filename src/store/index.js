import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		aspectRatio: {x: 3, y:2},
		tick: 0,
		planets: [],
		planetsInRange: [],
		players: [
			{
				name: "pubogu",
				color: "orange",
				planet: "0",
				burstRange: 3,
				position: {x:-10, y: 20}
			},
			{
				name: "gubo",
				color: "blue",
				planet: "0",
				burstRange: 3,
				position: {x:-10, y: 40}
			},
			{
				name: "bobo",
				color: "red",
				planet: "0",
				burstRange: 3,
				position: {x:-10, y: 60}
			}
		]
	},
	getters: {
		turn: state => {
			const ticksPerTurn = 10;
			const startTick = 0;
			let turn = Math.ceil((state.tick-startTick) / ticksPerTurn) % state.players.length;
			turn = state.tick === startTick ? 1 : turn === 0 ? 3 : turn;
      return turn;
		}
	},
  mutations: {
		step (state, n) {
			state.tick += n;
		},
		updatePlanet(state, id){
			// id and array index should always be the same,
			// otherwise this would break.

			const galaxy = document.getElementById("galaxy");
			let galaxyWidth = galaxy.clientWidth;
			let galaxyHeight = galaxy.clientHeight;

			const nextTicks = document.querySelectorAll('.next-tick');
			// const thisTicks = document.querySelectorAll('.planet');

			let nextRect = nextTicks[id].getBoundingClientRect();
			// let thisRect = thisTicks[id].getBoundingClientRect();

			// console.log(nextRect, thisRect)

			let xPercent = ((nextRect.x + nextRect.width/2) / galaxyWidth) * 100;
			let yPercent = ((nextRect.y + nextRect.height/2) / galaxyHeight) * 100;

			state.galaxy = {width: galaxyWidth, height: galaxyHeight};

			state.planets[id] = {
				id,
				nextTick: {xPercent, yPercent, width: nextRect.width, height: nextRect.height, x: nextRect.x, y: nextRect.y}
			}

		},
		updatePlanetsInRange(state, planets){
			state.planetsInRange = planets;
		},
		changePlanet(state, {player, planet}){
			state.players[player].planet = planet;
		}
  }
});