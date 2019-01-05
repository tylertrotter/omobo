<template>
	<svg id="galaxy" width="3" height="2">

		<s-solar-system width="40" x="0" y="0" sun-size="5" :clockwise="false">
			<s-planet radius="2" ring="1" speed="20" />
			<s-planet radius="1" ring="2" speed="10" />
			<s-planet radius="2.5" ring="3" speed="30" />
			<s-planet radius="1" ring="4" speed="25" :retrograde="true" />
			<s-planet radius="1" ring="6" speed="25" />
		</s-solar-system>

		<s-solar-system width="32" x="26.5%" y="32%" sun-size="3" :clockwise="true">
			<s-planet radius="2.5" ring="1" speed="30" />
			<s-planet radius="1" ring="2" speed="10" />
			<s-planet radius="1" ring="3" speed="25" :retrograde="true" />
			<s-planet radius="1" ring="4" speed="6" />
			<s-planet radius=".75" ring="5" speed="30" />
			<s-planet radius=".5" ring="6" speed="100" />
			<s-planet radius="2" ring="7" speed="200" />
		</s-solar-system>

		<s-solar-system width="50" x="50%" y="0" sun-size="2" :clockwise="true">
			<s-planet radius="2.5" ring="1" speed="30" />
			<s-planet radius="1" ring="2" speed="10" />
			<s-planet radius="1" ring="3" speed="25" :retrograde="true" />
			<s-planet radius="1" ring="4" speed="24" />
			<s-planet radius=".75" ring="5" speed="30" />
			<s-planet radius=".5" ring="6" speed="100" />
			<s-planet radius="2" ring="7" speed="20" />
		</s-solar-system>


		<s-solar-system width="22" x="33%" y="5%" sun-size="5" :clockwise="false">
			<s-planet radius="2.5" ring="1" speed="30" />
			<s-planet radius="1" ring="2" speed="10" />
			<s-planet radius="1" ring="3" speed="25" :retrograde="true" />
			<s-planet radius="1" ring="4" speed="60" />
			<s-planet radius=".75" ring="5" speed="30" />
			<s-planet radius="4" ring="7" speed="100" :retrograde="true" />
		</s-solar-system>

		<s-space-ship :player="1" color="green" />
		<s-space-ship :player="2" color="pink" />
		<s-space-ship :player="3" color="orange" />

	</svg>
</template>

<script>
	import SSolarSystem from './SolarSystem.vue';
	import SPlanet from './Planet.vue';
	import SSpaceShip from './SpaceShip.vue';

	export default {
		name: 's-board',
		components: {
			SSolarSystem,
			SPlanet,
			SSpaceShip
		},
		mounted(){
			this.$store.commit('step', 9);
			setTimeout(()=>{
				this.$store.commit('step', 1);
			}, 500)
		}
	}
</script>

<style scoped>
	svg {
		width: 100%;
		height: 100%;
	}
</style>