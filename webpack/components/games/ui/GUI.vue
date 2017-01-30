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
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.4);
  }

  .game-menu {
    @include flex-container(center, space-between);
    width: 100%;
    height: 42px;
    padding: 5px 5px 5px 10px;
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
    min-height: calc(100vh - 142px);
  }

  .game-overlay-page,
  .game-overlay-info {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100%;
    text-align: center;
  }

  .game-overlay-info {
    @include flex-container(center, center);
  }

  .game-overlay-page {
    color: white;
    background-color: #2fc9d1;
  }

  .debug-overlay {
    @include flex(center, space-around)
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9001;
  }
</style>

<template>

  <div class="game-gui" :class="isClosed">
    <div class="game-header">
      <div class="game-menu">
        <slot name="menu-content"></slot>
      </div>
      <div class="debug-overlay" v-if="isDebug">
        <slot name="debug-content"></slot>
      </div>
    </div>
    <div class="game-overlay js-game-ui">
      <div class="game-overlay-info">
        <slot name="info-content"></slot>
      </div>
      <div class="game-overlay-page js-instructions-overlay" :class="isShown('menu')"> 
        <slot name="instruction-content"></slot>
      </div>
      <div class="game-overlay-page js-quit-overlay"  :class="isShown('quit')">
        <slot name="quit-content"></slot>
      </div>
      <div class="game-overlay-page js-over-overlay" :class="isShown('over')">
        <slot name="over-content"></slot>
      </div>
      <div class="game-overlay-page js-won-overlay"   :class="isShown('won')">
        <slot name="won-content"></slot>
      </div>
      <div class="game-overlay-page js-lost-overlay"  :class="isShown('lost')">
        <slot name="lost-content"></slot>
      </div>
      <div class="game-overlay-page js-error-overlay" :class="isShown('error')">
        <slot name="error-content"></slot>
      </div>
      <div class="game-overlay-page js-pause-overlay" :class="isShown('pause')">
        <slot name="pause-content"></slot>
      </div>
    </div>
  </div>
  
</template>

<script>
import api from '../api'

export default {
  data() {
    return {
      isProduction: window.PRODUCTION,
      api: api,
    }
  },
  props: [''],
  computed: {
    isClosed() {
      return { close: this.api.state === 'play' }
    },
    isDebug() {
      return !this.isProduction;
    }
  },
  methods: {
    isShown(state) {
      return { ghost: this.api.state !== state };
    },
   
  },
  created() {

  },
  mounted() {

  },
  updated() {

  }
}
</script>