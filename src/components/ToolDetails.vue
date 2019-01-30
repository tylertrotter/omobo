<template>
	<section class="tool-details" :class="{'tools-expanded': $store.state.ui.toolsExpanded}">
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
						<img v-if="tool.name === 'Turbo Booster'" src="@/assets/svgs/turbo-booster.svg" />
						<img v-else-if="tool.name === 'Freeze Bomb'" src="@/assets/svgs/freeze-bomb.svg" />
						<img v-else-if="tool.name === 'Retrograde Bomb'" src="@/assets/svgs/retrograde-bomb.svg" />
						<img v-else-if="tool.name === 'Super Booster'" src="@/assets/svgs/super-booster.svg" />
						<img v-else-if="tool.name === 'Warp Speed Bomb'" src="@/assets/svgs/warp-speed-bomb.svg" />
					</div>

					<div class="td-description">
						<p>{{tool.description}}</p>
					</div>

					<div class="td-buttons">
						<button @click="build(i)" :class="canBuildTool(i) ? 'can-build' : 'cannot-build'" :disabled="!canBuildTool(i)">build</button>
						<button :class="hasTool(i) ? 'owned-tool' : 'unowned-tool'" :disabled="!hasTool(i)">use</button>
					</div>
				</div>

			</li>
		</ul>
	</section>
</template>

<script>
	import { mapMutations } from "vuex";

	export default {
		name: 'tool-details',
		methods: {
			...mapMutations(["addTool"]),
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
				return this.$store.getters.currentPlayer.tools.includes(tool);
			},
			playerMaterialAmount(player, material){
				return this.countInArray(player.materials, material);
			},
			countInArray(array, value) {
				return array.reduce((n, x) => n + (x === value), 0);
			},
			build(tool){
				this.addTool({player: this.$store.getters.currentPlayerId, tool: tool})
			}
		}
	}
</script>

<style>
	.tool-details {
		position: absolute;
		top: 0;
		left: 100%;
		right: -100%;
		bottom: 0;
		background: var(--gray);
		overflow: auto;
		padding: 20px;
		color: white;
		transition: all .8s;
	}

	.tools-expanded.tool-details {
		right: 230px;
		left: 0;
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
		background: var(--control-panel);
		padding: 5px;
	}

	.td-materials-icon img {
    display: block;
		width: 35px;
    height: 35px;
		margin: 8px 0 8px 16px;
		color: white;
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