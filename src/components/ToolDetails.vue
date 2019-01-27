<template>
	<section v-show="$store.state.ui.toolsExpanded" class="tool-details">
		<ul class="td-list">
			<li v-for="(tool, i) in $store.state.tools" :key="i">
				<h2>{{tool.name}}</h2>

				<div class="td-details">
					<div class="td-materials-icon">
						<ul class="td-materials-required">
							<li
								v-for="(material, i) in materialsForTool(i)"
								:key="i"
								:class="[
									$store.state.mineralNames[material.id],
									material.owned ? 'owned' : 'unowned'
								]"
								>
							</li>

						</ul>
						<component :is="tool-name | kebab" />
					</div>

					<div class="td-description">
						<p>{{tool.description}}</p>
					</div>

					<div class="td-buttons">
						<button :class="canBuildTool(i) ? 'can-build' : 'cannot-build'" :disabled="!canBuildTool(i)">build</button>
						<button :class="hasTool(i) ? 'owned-tool' : 'unowned-tool'" :disabled="!hasTool(i)">use</button>
					</div>
				</div>

			</li>
		</ul>
	</section>
</template>

<script>
	import booster from './../assets/svgs/booster.svg';
	import superBooster from './../assets/svgs/super-booster.svg';
	import freezeBomb from './../assets/svgs/freeze-bomb.svg';
	import retrogradeBomb from './../assets/svgs/retrograde-bomb.svg';
	import warpSpeedBomb from './../assets/svgs/warp-speed-bomb.svg';

	export default {
		name: 'tool-details',
		components: {
			booster,
			superBooster,
			freezeBomb,
			retrogradeBomb,
			warpSpeedBomb
		},
		methods: {
				materialsForTool(tool){
				let recipe = this.$store.state.tools[tool].recipe;
				let playerCustomizedMaterials = [];
				for(var i = 0; i < recipe.length; i++){
					for(var j = 0; j < recipe[i].amount; j++){
						let playerMaterialAmount = this.playerMaterialAmount(this.$store.state.players[this.$store.getters.turn-1], recipe[i].mineral);
						playerCustomizedMaterials.push({id: recipe[i].mineral, owned: playerMaterialAmount > j})
					}
				}
				return playerCustomizedMaterials;
			},
			canBuildTool(tool){
				let materials = this.materialsForTool(tool)
				return materials.every(material => material.owned);
			},
			hasTool(tool){
				return this.$store.state.players[this.$store.getters.turn-1].tools.includes(tool);
			},
			playerMaterialAmount(player, material){
				return this.countInArray(player.materials, material);
			},
			countInArray(array, value) {
				return array.reduce((n, x) => n + (x === value), 0);
			}
		},
		filters: {
			kebab: function (value) {
				if (!value) return ''
				return value.toLowerCase().replace(/ /g, '-');
			}
		}
	}
</script>

<style>
	.tool-details {
		position: absolute;
		top: 0;
		left: 0;
		right: 230px;
		bottom: 0;
		background: rgba(0,0,0,1);
		overflow: auto;
		padding: 20px;
		color: white;
	}

	.td-list {
		max-width: 800px;
		margin: 0 auto;
		padding: 0;
		list-style: none;
	}

	.td-list li {
		margin-bottom: 4em;
	}

	.td-details {
		display: flex;
	}

	.td-materials-icon {
		display: flex;
		width: 12%;
		background: var(--gray);
		padding: 5px;
	}

	.td-icon {
    display: block;
		width: 47px;
    height: 47px;
    margin-left: 8px;
	}

	.td-description {
		width: 70%;
	}

	.td-description p{
		margin: 0 1em;
	}

	.td-description p:last-child{
		margin-bottom: 0;
	}

	.td-buttons {
		width: 15%;
	}

	.td-materials-required {
		display: flex;
		align-content: center;
		flex-wrap: wrap;
		width: 35%;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.td-materials-required li {
		width: 44%;
		margin: 3%;
		height: 6px;
	}
</style>