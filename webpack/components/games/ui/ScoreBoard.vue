<style lang="scss" scoped>
@import '../../../styles/globals';

  .score {
    
    @include flex(center, space-around, column);
    margin: 0 5px;
  }

</style>

<template>
  <div class="score">
    <span id="score">0</span>
    <span class="text">score</span>
  </div>
</template>

<script>

</script>