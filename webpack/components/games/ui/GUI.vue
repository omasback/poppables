<style lang="scss" scoped>
  @import '../../../styles/globals.scss';

  .game-gui {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    z-index: 900
  }

  .game-header {

  }

  .game-menu {
    @include flex-container(center, center);
    
    width: 100%;
    height: 50px;
    padding: 0 10px;
    background-color: white;
  }

  .game-gui.close .game-overlay{
    pointer-events: none;
  }

  .game-overlay,
  .game-overlay-page {
    padding: 20px 20px 0;
    width: 100%;
  }

  .game-overlay {
    @include flex-container(center, center, column);
    min-height: calc(100vh - 150px);
  }

  .game-overlay-page {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    text-align: center;
    color: white;
    background-color: #2fc9d1;
  }
</style>

<template>
  <div class="game-gui" :class="isOpen">
    <div class="game-header">
      <div class="game-menu">
        <slot name="menu-content"></slot>
      </div>
    </div>
    <div class="game-overlay js-game-ui" :style="calcHeight">
      <div class="game-overlay-page js-instructions-overlay" :class="isShown('menu')"> 
        <slot name="instruction-content"></slot>
      </div>
      <div class="game-overlay-page js-pause-overlay" :class="isPaused">
        <slot name="pause-content"></slot>
      </div>
      <div class="game-overlay-page js-quit-overlay" :class="isShown('quit')">
        <slot name="quit-content"></slot>
      </div>
      <div class="game-overlay-page js-won-overlay" :class="isShown('won')">
        <slot name="won-content"></slot>
      </div>
      <div class="game-overlay-page js-lost-overlay" :class="isShown('lost')">
        <slot name="lost-content"></slot>
      </div>
      <div class="game-overlay-page js-error-overlay" :class="isShown('error')">
        <slot name="error-content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: ['info'],
  computed: {
    isPaused() {
      return { ghost: !this.info.paused }
    },
    isOpen() {
      return { close: this.info.closed }
    }
  },
  methods: {
    isShown(state) {
      return { ghost: this.info.state !== state };
    },
    calcHeight() {
      let game = document.getElementById('game');
      if(game) {
        console.log(game)
      }
      else	
        return;

      let h = (getComputedStyle(game).width)
      console.log(h)
      return {
        height: h
      }
    }
  },
  created() {
    this.$on('resize', function() {
      console.log('HIT RESIZE')
    })
  },
  updated() {
  }
}
</script>