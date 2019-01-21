<template>
  <div id="app">
    <s-board />
		<s-tool-details />
		<s-controls />
  </div>
</template>

<script>

import SBoard from './components/Board.vue';
import SToolDetails from './components/ToolDetails.vue';
import SControls from './components/Controls.vue';

require('@/assets/style/variables.css');
require('@/assets/style/common.css');

export default {
  name: 'app',
  components: {
		SBoard,
		SToolDetails,
		SControls
  }
}
</script>