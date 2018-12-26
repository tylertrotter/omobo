import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
		aspectRatio: {x: 3, y:2},
		tick: 0,
		planets: []
	},
	getters: {
		planets: state => {
      return state.planets;
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

			const planets = document.querySelectorAll('.next-tick');

			let {height, width, x, y} = planets[id].getBoundingClientRect();

			let planetX = ((x + width/2) / galaxyWidth) * 100;
			let planetY = ((y + height/2) / galaxyHeight) * 100;

			state.planets[id] = {x: planetX, y: planetY }

		}
  }
});