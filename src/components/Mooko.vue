<template>
	<div class="mooko-transliteration">
		<input v-model="word" spellcheck="false" />
		<div class="transliteration">{{ word }}</div>
	</div>
</template>

<script>
	export default {
		name: 'mooko',
		data(){
			return{
				word: 'muko'
			}
		}
	}
</script>

<style scoped>
	.mooko-transliteration {
		position: fixed;
		bottom: 0;
		width: 100%;
	}

	input {
    display: block;
		width: 100%;
		border: 0;
		padding: 0 10px;
    transform: scaleX(-1);
		background: transparent;
		color: white;
		font-family: mooko;
		font-size: 40px;
	}

	input:focus {
		outline: 0;
	}

	.transliteration {
		/* background: #555; */
		color: white;
		font-size: 12px;
		text-align: right;
		padding: 6px 16px;
		min-height: 2.3em;
	}
</style>