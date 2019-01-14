<template>
	<div class="energy-meter mb" dir="rtl">
		<meter min="0" max="48" low="6" :value="value" />
		<ul class="meter-numbers">
			<li></li>
			<li>12</li>
			<li></li>
			<li>24</li>
			<li></li>
			<li>36</li>
			<li></li>
			<li>48</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'energy-meter',
		props: {
			value: Number
		}
	}
</script>

<style>
	.energy-meter {
		position: relative;
		height: 6px;
		transition: all .4s;
	}

	meter,
	meter::-webkit-meter-bar {
		display: block;
		width: 100%;
		height: 100%;
		margin-top: 3px;
		margin-bottom: 3px;
		background: var(--gray);
		transition: all .4s;
	}

	.expanded .energy-meter{
		height: 12px;
	}

	.expanded meter {
		margin: 0;
	}

	meter::-webkit-meter-optimum-value {
		background: var(--sun);
	}

	meter:-moz-meter-optimum::-moz-meter-bar {
		background: var(--sun);
	}

	meter::-webkit-meter-suboptimum-value {
		background: red;
	}

	meter:-moz-meter-sub-optimum::-moz-meter-bar {
    background: red;
	}

	.meter-numbers {
		display: flex;
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: 10px;
		text-align: left;
		color: rgba(100,100,100,.7);
		opacity: 0;
		transition: all .4s;
	}

	.expanded .meter-numbers {
		opacity: 1;
	}

	.meter-numbers li {
		width: 12.5%;
		height: 100%;
		padding: 1px 2px 0;
	}

	.meter-numbers li:not(:last-child) {
		border-left: 1px solid rgba(100,100,100,.2);
	}
</style>