import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		aspectRatio: {x: 3, y:2},
		tick: 1,
		planets: [],
		numPlayers: 3
	},
	getters: {
		planets: state => {
      return state.planets;
		},
		turn: state => {
			const ticksPerTurn = 10;
			const startTick = ticksPerTurn * 1;
			let turn = Math.ceil((state.tick-startTick) / ticksPerTurn) % state.numPlayers;
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
			const thisTicks = document.querySelectorAll('.planet');

			let nextRect = nextTicks[id].getBoundingClientRect();
			let thisRect = thisTicks[id].getBoundingClientRect();

			// console.log(nextRect, thisRect)

			let xPercent = ((nextRect.x + nextRect.width/2) / galaxyWidth) * 100;
			let yPercent = ((nextRect.y + nextRect.height/2) / galaxyHeight) * 100;

			state.galaxy = {width: galaxyWidth, height: galaxyHeight};

			state.planets[id] = {
				id,
				nextTick: {xPercent, yPercent, width: nextRect.width, height: nextRect.height, x: nextRect.x, y: nextRect.y}
			}

		}
  }
});