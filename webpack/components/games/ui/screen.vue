<style lang="scss" scoped>
  .screen {
    
  }



</style>

<template>
  <div class="screen">
      <slot name="title" class="title"></slot>
      <slot name="small-title" class="small-title"></slot>
      <slot name="prompt"  class="prompt"></slot>
      <!-- TODO: remove default slot? -->
      <slot></slot>
  </div>
</template>

<script>

</script>