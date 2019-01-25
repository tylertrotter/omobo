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
						<svg  class="td-icon" viewBox="0 0 50 50 "><circle cx=25 cy=25 r=25 fill="white" /></svg>
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
	export default {
		name: 'tool-details',
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
				return materials.some(material => material.owned);
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
		background: rgba(0,0,0,.8);
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

	.td-details {
		display: flex;
	}

	.td-materials-icon {
		width: 15%;
	}

	.td-icon {
		max-width: 60%;
	}

	.td-description {
		width: 70%;
	}

	.td-buttons {
		width: 15%;
	}
</style>