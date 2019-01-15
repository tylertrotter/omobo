<template>
	<svg viewBox="0 0 100 100">
		<defs>
			<clipPath id="eye-lids">
				<rect x="38" y="35" width="25" height="24" class="eye-lid-mask" />
			</clipPath>
		</defs>

		<g class="koobo" :fill="flesh">
			<path d="M68 17.5 Q 50 30 50 50 Q 50 30 32 17.5" />
			<path d="M62 17.5 Q 50 30 50 50 Q 50 30 32 17.5" fill="black" fill-opacity=".2" />
			<ellipse cx="50" cy="17" rx="18" ry="5" />
			<ellipse cx="50" cy="16" rx="14" ry="2.75" style="fill:black; fill-opacity: .5; stroke: white; stroke-opacity: .1;"  />
		</g>

		<g class="head" :fill="flesh" :style="`transform: scale(${headWidth}, ${headHeight});`">
			<circle cx=50 cy=60 r=30 class="head-proper" :stroke="flesh" />
			<circle cx=53 cy=57 r=25 style="fill: white; opacity: .15" />
		</g>

		<circle cx=50 cy=47 r=11 :fill="flesh" />
		<g class="eye" clip-path="url(#eye-lids)" :style="`transform: scale(${eyeSize});`" >
			<circle cx=50 cy=47 r=12 class="eye-white" />
			<g class="inner-eye">
				<circle cx=50 cy=47 r=6 :fill="iris" />
				<circle cx=50 cy=47 r=3 fill="black" class="pupil" />
			</g>
		</g>

		<path d="M40 73, Q 50 85 60 73" stroke="black" stroke-linecap="round" stroke-width="2" fill="transparent"/>
	</svg>
</template>

<script>
	export default {
		name: "avatar",
		props: {
			flesh: String,
			iris: String,
			eyeSize: Number,
			kooboSize: Number,
			headWidth: Number,
			headHeight: Number
		}
	}
</script>

<style scoped>

	@keyframes koobo {
		0%{ transform: rotate(0); }
		20%{ transform: scaleY(1.15)  rotate(10deg); }
		80%{ transform: rotate(-20deg); }
		100%{ transform: rotate(0); }
	}

	.koobo {
		transform-origin: center;
		animation: koobo 30s infinite;
	}

	.koobo-funnel {
		fill: var(--flesh);
	}

	.head {
		transform-origin: center;
	}

	@keyframes cillia {
		0% { stroke-width: 3; }
		50% { stroke-width: 5; }
		100% { stroke-width: 3; }
	}

	.head-proper {
		stroke-opacity: .5;
		stroke-dasharray: 1 2;
		animation: cillia 3s infinite;
	}

	.eye {
		transform-origin: center;
	}

	.eye-white {
		fill: white;
		stroke: var(--flesh);
	}

	@keyframes eye {
		0% { transform: translate(0, 0); }
		40% { transform: translate(3%, 0); }
		60% { transform: translate(-3%, -3%); }
		70% { transform: translate(-2.5%, -3%); }
		80% { transform: translate(1%, 3%); }
		100% { transform: translate(0, 0); }
	}

	.inner-eye {
		animation: eye 10s infinite;
	}

	@keyframes blink {
		50% { transform: scaleY(1); }
		51% { transform: scaleY(0); }
		53% { transform: scaleY(1); }
	}

	.eye-lid-mask {
		transform-origin: center;
		animation: blink 10s infinite;
	}
</style>