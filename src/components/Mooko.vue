<template>
	<div :class="{'is-focus': focused}">
		<div class="faux-input" @click="focused = true" :class="{'faux-input--full': word.length === 6}">{{word}}</div>
		<div class="transliteration">{{ word }}</div>
		<div class="mooko-keyboard">
			<button type="button" class="backspace" @click="backspace()" :disabled="word.length === 0"></button>
			<button type="button" @click="addLetter('g')" :disabled="word.length > 0 && !lastLetterIsVowel">g<span class="latin">g</span></button>
			<button type="button" @click="addLetter('p')" :disabled="word.length > 0 && !lastLetterIsVowel">p<span class="latin">p</span></button>
			<button type="button" @click="addLetter('u')" :disabled="word.length > 0 && lastLetterIsVowel">u<span class="latin">u</span></button>
			<button type="button" @click="addLetter('m')" :disabled="word.length > 0 && !lastLetterIsVowel">m<span class="latin">m</span></button>
			<button type="button" @click="addLetter('k')" :disabled="word.length > 0 && !lastLetterIsVowel">k<span class="latin">k</span></button>
			<button type="button" @click="addLetter('b')" :disabled="word.length > 0 && !lastLetterIsVowel">b<span class="latin">b</span></button>
			<button type="button" @click="addLetter('o')" :disabled="word.length > 0 && lastLetterIsVowel">o<span class="latin">o</span></button>
		</div>
		<div class="keyboard-overlay" @click="focused = false"></div>
	</div>
</template>

<script>
	export default {
		name: 's-mooko',
		data(){
			return{
				word: "",
				focused: false,
				lastLetterIsVowel: null
			}
		},
		methods: {
			addLetter(letter){
				if(this.word.length < 6){
					this.word = this.word + letter;
					this.lastLetterIsVowel = letter === 'u' || letter === 'o';
					this.$emit("change", this.word);
				}
			},
			backspace(){
				this.word = this.word.substr(0, this.word.length-1);
				let lastLetter = this.word.substr(this.word.length-1, this.word.length);
				this.lastLetterIsVowel = lastLetter === 'u' || lastLetter === 'o';
				this.$emit("change", this.word);

			}
		}
	}
</script>

<style scoped>
@keyframes blink {
	0% { opacity: 1; }
	25% { opacity: 0}
	50% { opacity: 0; }
	100% { opacity: 1; }
}
	.faux-input {
    display: block;
		position: relative;
		z-index: 2;
		width: 100%;
		min-height: 1.3em;
		border: 0;
		border-bottom: 2px solid #666;
		padding: 0 10px;
    transform: scaleX(-1);
		background: transparent;
		color: white;
		font-family: mooko;
		font-size: 40px;
		cursor: text;
	}

	.faux-input:not(.faux-input--full):after {
		display: none;
		content: "\2588";
		font-size: .8em;
		vertical-align: top;
		animation: blink 1s infinite;
	}

	.is-focus .faux-input:after {
		display: inline-block;
	}

	.transliteration {
		/* background: #555; */
		color: white;
		font-size: 12px;
		text-align: right;
		padding: 6px 16px;
		min-height: 2.3em;
	}

	.mooko-keyboard {
		display: flex;
		width: 100%;
		left: 0;
		justify-content: space-between;
		position: fixed;
		bottom: -100%;
		z-index: 2;
		background-color: var(--control-panel);
		padding: 2vw;
		transition: .6s;
	}

	.is-focus .mooko-keyboard {
		bottom: 0;
	}

	.mooko-keyboard button{
		position: relative;
		padding: 2vw;
		font-family: mooko;
		font-size: 7vw;
	}

	.latin {
		position: absolute;
		bottom: 1.5vw;
		right: 1.5vw;
		opacity: .6;
		font-family: grueber, Arial, Helvetica, sans-serif;
		font-size: 2vw;
	}

	.is-focus .keyboard-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.backspace:before {
		content: '\2326';
		font-size: .9em;
	}
</style>