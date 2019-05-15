<template>
  <div id="app">
		<router-view/>
		<router-link to="/rules" class="rules-link">Rules</router-link>
  </div>
</template>

<script>
require('@/assets/style/variables.css');
require('@/assets/style/common.css');

export default {
  name: 'app'
}
</script>