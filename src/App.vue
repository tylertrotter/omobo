<template>
  <div id="app">
    <s-board />
		<s-controls />
  </div>
</template>

<script>

import SBoard from './components/Board.vue';
import SControls from './components/Controls.vue';
import Avatar from './components/Avatar.vue';

require('@/assets/style/variables.css');
require('@/assets/style/common.css');

export default {
  name: 'app',
  components: {
		SBoard,
		SControls
  }
}
</script>