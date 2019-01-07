<template>
	<svg id="galaxy" class="galaxy" width="3" height="2">

		<s-solar-system width="40" x="0" y="0" sun-size="5" :clockwise="false">
			<s-planet radius="2" ring="1" speed="10" mineral="tungsten" spot="0" />
			<s-planet radius="1" ring="1" speed="10" mineral="copper" spot="7" />

			<s-planet radius="1" ring="2" speed="22"  mineral="tungsten" :retrograde="true" spot="3" />
			<s-planet radius=".75" ring="2" speed="22"  mineral="tungsten" :retrograde="true" spot="7" />

			<s-planet radius="2.25" ring="3" speed="18" mineral="radium" spot="5" />
			<s-planet radius="1" ring="3" speed="18" mineral="radium" spot="12" />
			<s-planet radius=".75" ring="3" speed="18" mineral="copper" spot="17" />

			<s-planet radius="1" ring="4" speed="40" :retrograde="true"  mineral="tungsten" spot="2" />
			<s-planet radius="2" ring="4" speed="40" :retrograde="true"  mineral="radium" spot="10" />
			<s-planet radius="1" ring="4" speed="40" :retrograde="true"  mineral="tungsten" spot="2" />
			<s-planet radius="2" ring="4" speed="40" :retrograde="true"  mineral="radium" spot="10" />

			<s-planet radius="1" ring="6" speed="30" mineral="radium" spot="4" />
			<s-planet radius="1.75" ring="6" speed="30" mineral="tungsten" spot="20" />
		</s-solar-system>

		<s-solar-system width="32" x="26.5%" y="32%" sun-size="3" :clockwise="true">
			<s-planet radius="2.5" ring="1" speed="30" mineral="copper" spot="0" />
			<s-planet radius="1" ring="2" speed="10" mineral="radium" spot="0" />
			<s-planet radius="1" ring="3" speed="25" :retrograde="true" mineral="tungsten" spot="0" />
			<s-planet radius="1" ring="4" speed="6" mineral="radium" spot="0" />
			<s-planet radius=".75" ring="5" speed="30" mineral="tungsten" spot="0" />
			<s-planet radius=".5" ring="6" speed="100" mineral="copper" spot="0" />
			<s-planet radius="2" ring="7" speed="200" mineral="mercury" spot="0" />
		</s-solar-system>

		<s-solar-system width="50" x="50%" y="0" sun-size="2" :clockwise="true">
			<s-planet radius="2.5" ring="1" speed="30" mineral="tin" spot="0" />
			<s-planet radius="1" ring="2" speed="10" mineral="radium" spot="0" />
			<s-planet radius="1" ring="3" speed="25" :retrograde="true" mineral="copper" spot="0" />
			<s-planet radius="1" ring="4" speed="24" mineral="tungsten" spot="0" />
			<s-planet radius=".75" ring="5" speed="30" mineral="radium" spot="0" />
			<s-planet radius=".5" ring="6" speed="100" mineral="tungsten" spot="0" />
			<s-planet radius="2" ring="7" speed="20" mineral="mercury" spot="0" />
		</s-solar-system>


		<s-solar-system width="22" x="33%" y="5%" sun-size="5" :clockwise="false">
			<s-planet radius="2.5" ring="1" speed="30" mineral="radium" spot="0" />
			<s-planet radius="1" ring="2" speed="10" mineral="radium" spot="0" />
			<s-planet radius="1" ring="3" speed="25" :retrograde="true" mineral="copper" spot="0" />
			<s-planet radius="1" ring="4" speed="60" mineral="tungsten" spot="0" />
			<s-planet radius=".75" ring="5" speed="30" spot="0" />
			<s-planet radius="4" ring="7" speed="100" :retrograde="true" mineral="copper" spot="0" />
		</s-solar-system>

		<s-space-ship :player="1" />
		<s-space-ship :player="2" />
		<s-space-ship :player="3" />

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
			setTimeout(()=>{
				this.$store.commit('step', 1);
			}, 500)
		}
	}
</script>

<style scoped>
	.galaxy {
		width: 100%;
		height: 100%;
		transition: all 1s;
	}
</style>