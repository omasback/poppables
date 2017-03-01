<style lang="scss" scoped>
@import '~styles/helpers';

  .score {
    @include flex(center, space-between, column);
    margin-left: 5px;
    margin-right: 7px;
  }

  /* When the Game is Paused */
  /* TODO -- maybe send the state into the scoreboard?? */
  .game-menu.overlay .score {
    align-items: center;
  }

  #score {
    font-size: 14px;
  }

</style>

<template>
  <div class="score">
    <span v-text="misses"></span>
    <span class="text">Misses Left</span>
  </div>
</template>

<script>
export default {
  props: ['misses'],
  data() {
    return {}
  }
}
</script>
