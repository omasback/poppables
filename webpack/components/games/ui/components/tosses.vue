<style lang="scss" scoped>
@import '~styles/helpers';

  .score {
    @include flex(center, space-between, column);
    margin-left: 5px;
    margin-right: 7px;
    .low {
      color: #D50000;
    }
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
    <span v-text="misses" :class="myClass"></span>
    <span class="text">Misses Left</span>
  </div>
</template>

<script>
export default {
  props: ['misses'],
  data() {
    return {}
  },
  computed: {
    myClass() {
      return {
        low: this.misses <= 1
      }
    }
  },
  watch: {
    misses(val) {
      if(val <= 0) {
        this.$emit('empty');
      }
    }
  }
}
</script>
