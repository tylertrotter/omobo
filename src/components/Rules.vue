<template>
	<main class="wrapper left-aligned">
		<h1>Omobo Rules</h1>

		<h2>Backstory</h2>
		<p>Each player is a member of an alien race, the Mookogoo and a resident of Oogogoo, the ancestral planet of the Mookogoo. However, each player is a citizen of a different and rival state.</p>

		<p>As war rages between your people with no clear end in sight, each player's government independently comes to the same conclusion. A rare and volotile material is needed to power a not-so-secret weapon&mdash;the micro bomb! A micro bomb is a widely known but as-of-yet theoretical weapon that could be used to shrink an enemy down to a harmless size. The science has all been worked out epochs ago, the only thing keeping the generals from employing a weapon like this is that to power a micro bomb requires the most precious of all metals in the galaxy&mdash;tin!</p>

		<p>The plain and simple fact is, tin does not exist on Oogogoo. However, there are rumors of a planet abundant with tin on the other side of the galaxy. Adventuring to this distant planet and mining its tin is a dangerous and treacherous mission. Of course each player volunteers immediately for the sake of a lasting peace on Oogogoo. Each of you are quite brave and patriotic.</p>

		<p>The mission, to be quite clear, is to take a cargo ship to the tin planet (which is called Oogobobo by the way), mine 12 units of tin, and bring the payload back so your country's scientists can shrink the enemy to bug size. Of course if you are not first, your countrymen will all be knee high to a gobopo (a species very similar to an aarthling grasshopper). Godspeed.</p>

		<h2>Objective</h2>
		<p>Each player is trying to be the first to get from their home planet to the tin-rich planet, Oogobobo, in order to mine 12 units of tin and then bring back the tin to the home planet. Fuel is quite limited in this galaxy so players' space ships are only able to go in short bursts to nearby planets. They must plan their trip across the galaxy based on the alignment and movement of planets.</p>

		<h2>Mechanics</h2>

		<h3>Time</h3>
		<p>Time is split up into epochs, turns and ticks. An epoch is the time it takes for every player to complete a turn, a turn is a turn, and each player's turn is split into 6 ticks. Planets advance one spot in their orbit at the start of each tick. Planets go around their sun at different speeds. The dots along a planet's orbit path indicate where the planet will go with each tick. Each tick, the player who's turn it is can choose to do nothing, use a resource, or move to a nearby planet in its burst range.</p>

		<h3>Fuel</h3>
		<p>Each player's space ship is powered by solar energy. The closer a ship is to the sun, the more energy is absorbed with each tick of the player's turn. On the ring closest to the sun a full fuel unit is charged, a diminishing fraction of a fuel unit is charged with each ring going out.</p>

		<p>It takes two fuel units to jump to a nearby planet and one fuel unit to mine.</p>

		<h4>Burst Range</h4>
		<p>During a player's turn his spaceship is surrounded by a ring indicating how far his ship can travel in a tick. A planet must be at least partially within this "burst range ring" to be accessible to the ship. It is possible to increase one's burst range with the turbo boost resource.</p>

		<h3>Tools</h3>

		<ul>
			<li>
				<h4>Supabooster</h4>
				<p>This increases your ship's burst range 1 level. Burst ranges start at level 1 and max out at 3. Lasts for remainder of your turn.</p>
				<p><strong>Recipe:</strong> 4 units of radium, 4 units of tungsten, 4 units of copper</p>
			</li>

			<li>
				<h4>Durabooster</h4>
				<p>This increases your ship's burst range. Lasts for 2 turns.</p>
				<p><strong>Recipe:</strong> 6 units of copper, 6 units of mercury</p>
			</li>

			<li>
				<h4>Diamond Bit</h4>
				<p>Mine minerals at double the normal rate. Lasts for 20 turns.</p>
				<p><strong>Recipe:</strong> TBA</p>
			</li>

			<li>
				<h4>Retrograde Bomb</h4>
				<p>Reverses every orbit in the galaxy. Lasts for the epoch.</p>
				<p><strong>Recipe:</strong> 6 units of radium, 6 units of mercury</p>
			</li>

			<li>
				<h4>Warp Speed Bomb</h4>
				<p>Speeds up time to be twice as fast. Planets move around their orbits double the amount they would normally. Lasts for the epoch.</p>
				<p><strong>Recipe:</strong> 8 units of tungsten, 2 units of copper, 2 units of mercury</p>
			</li>
		</ul>

		<h3>Materials</h3>
		<p>Tools are built using raw materials. All available tools can be built on-board spaceships from combining up to 4 elemental raw materials in certain amounts. The elements from least to most rare are:</p>

		<ol>
			<li>Tungsten (blue)</li>
			<li>Radium (purple)</li>
			<li>Copper (red)</li>
			<li>Mercury (orange)</li>
		</ol>

		<p>You acquire these elements by mining t	hem on planets that are rich in them. E.g. If you spend 6 ticks mining on a tungsten rich (blue) planet you'll be able to mine 1 unit of tungsten. You can store 60 units of any element on your ship at one time. Once you use up elements by building tools you'll free up more space.</p>

		<p>Of course 24 units of Tin (green) are required to build the shrinkerator, and scientists will need huge labs on the home planet to build it, so that is not being considered with these lesser tools. But tin is mined in the same way.</p>

		<h3>Your Turn</h3>
		<p>On each tick while it's your tun, you can sit, mine, or jump. Sit means do nothing and let the tick pass. Mine means to collect the element of the planet your on, and jump means to go to a nearby planet.</p>
	</main>
</template>

<script>
	export default {
		name: "s-rules"
	}
</script>

<style scoped>

</style>