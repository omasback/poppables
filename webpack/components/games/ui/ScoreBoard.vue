<style lang="scss" scoped>
@import '../../../styles/globals';

  .score-board {
    @include flex();

  }

  .score {
    
    @include flex(center, space-around, column);
    margin: 0 5px;
  }

  .multiplier {
    @include flex(flex-start, space-around, column);
    font-size: 12px;
  }

  .multiplier div {
    margin-bottom: 5px;
  }

</style>

<template>
  <div class="score-board">
    <div class="score">
      <span id="score">0</span>
      <span class="text">score</span>
    </div>
    <div class="multiplier">
      <div> 
        <span>x</span> 
        <span id="multiplier">1</span> 
      </div>
      <span class="text">multiplier</span>
    </div>
  </div>
</template>

<script>

</script>