<template>
	<section class="tool-details">
		<ul class="td-list">
			<li v-for="(tool, i) in $store.state.tools" :key="i">
				<h2>{{tool.name}}</h2>

				<div class="td-details">
					<div class="td-materials-icon">
						<ul class="td-materials-required">
							<!--
								For each material display it, if player has it, show it full, otherwise show it outlined
								- convert { mineral: 0, amount: 6}, { mineral: 1, amount: 6} to [0,0,0,0,0,0,1,1,1,1,1,1]
								- Then loop through array
								- Need a function materialAmount(player, material){ return n }
								- :class="( i >= materialAmount(1,2) ) ? 'unowned' : 'owned'"
							 -->
							<li v-for="(ingredient, i) in tool.recipe" :key="i" :class="$store.state.mineralNames[ingredient.mineral]">
								{{ingredient.mineral}}
							</li>

						</ul>
						<svg  class="td-icon" viewBox="0 0 50 50 "><circle cx=25 cy=25 r=25 fill="white" /></svg>
					</div>

					<div class="td-description">
						<p>{{tool.description}}</p>
					</div>

					<div class="td-buttons">
						<button>build</button>
						<button>use</button>
					</div>
				</div>

			</li>
		</ul>
	</section>
</template>

<script>
	export default {
		name: 'tool-details'
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