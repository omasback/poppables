<style lang="scss" scoped>
@import '~styles/helpers';

  .score {
    @include flex(flex-start, space-between, column);
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
    <span id="score" v-text="score"></span>
    <span class="text" v-text="text"></span>
  </div>
</template>

<script>
export default {
  props: ['score', 'text'],
  data() {
    return {}
  },
  activated() {
    console.log('scoreboard activated')
  }
}
</script>
