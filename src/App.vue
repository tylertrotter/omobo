<template>
  <div id="app">
		<router-view :key="$route.fullPath"/>
		<router-link to="/rules" class="rules-link"><abbr title="information">i</abbr></router-link>
  </div>
</template>

<script>
require('@/assets/style/variables.css');
require('@/assets/style/common.css');

export default {
  name: 'app'
}
</script>