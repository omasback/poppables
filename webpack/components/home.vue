<template>
  <div class="home">
    <redBubble/>
    <poppable-chip>
  </div>
</template>

<script>
import redBubble from './redBubble/index.vue'
import poppableChip from './poppableChip/index.vue'

export default {
  data: () => {
    return {};
  },
  components: {
    redBubble,
    poppableChip
  },
}
</script>

<style scoped>
</style>
