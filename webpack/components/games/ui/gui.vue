<style lang="scss" scoped>
@import '~styles/helpers';

  .game-gui {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    z-index: 900
  }
  /* Declarative State Styles -- even though attribute selectors are a bit slow */
  .game-gui[data-state='menu'] {
    .game-overlay {
      overflow: hidden;
    }
  }
  .game-gui[data-state='play'] {
    .game-overlay {
      pointer-events: none;
      overflow: hidden;
    }
    .game-header {
      z-index: 9999;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, .3);
    }
  }
  .game-gui[data-state='pause'] {
    .game-overlay {
      overflow: hidden;
    }
    .game-header {
      z-index: 9999;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, .3);
    }
  }

  .game-gui[data-state='over'] {
    .game-header {
      z-index: 9999;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, .3);
    }
  }
  .game-gui[data-state='won'] {
    .game-header {
      z-index: 9999;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, .3);
    }
  }
  .game-gui[data-state='error'] {
    .game-header {
      z-index: 9999;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, .3);
    }
  }

  .game-header,
  .game-menu {
    position: relative;
    @include flex-container(center, center);
    width: 100%;
    height: 42px;
    background-color: white;
  }

  .game-menu {
    padding: 5px;
    max-width: 786px;
  }

  .game-overlay,
  .game-overlay-page {
    padding: 20px 20px 0;
    width: 100%;
  }

  .game-overlay {
    @include flex-container(center, center, column);
    position: absolute;
    top: 0;
    left: 0;
    min-height: calc(100vh - 60px); /* 60px header + 42px gameBar */
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
    @include flex-container(center, center)
  }

  .game-overlay-page {
    @include flex-container(flex-start, center);
    color: white;
    background-color: #2fc9d1;
  }

  /* DIFFERENT SCREEN STYLE */
  .js-pause-overlay:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute; 
    top: 0;
    left: 0;
    background-image: url('~images/debris.png'), url('~images/bg-dots.png');
    background-size: cover, contain;
    background-position: center center, center -100px;
    background-repeat: no-repeat, no-repeat;
    transform: scaleY(-1);
  }
  .js-pause-overlay .screen {
    background-image: url('./images/large-pause.svg');
    background-size: 125px;
    background-repeat: no-repeat;
    background-position: center 50px;
  }

  .js-instructions-overlay {

  }
  .js-quit-overlay {

  }
  .js-form-overlay {

  }
  .js-won-overlay {

  }
  .js-lost-overlay {

  }
  .js-error-overlay {

  }
  .js-over-overlay {
    .screen {
      margin-top: 30px;
    }
  }

  .js-info-overlay {
    overflow: hidden;
  }

  .debug-overlay {
    @include flex(center, space-around);
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9001;
  }

</style>

<template>

  <div class="game-gui" :data-state="state">
    <div class="game-header">
      <div class="game-menu">
        <slot name="menu-content"></slot>
      </div>
      <div class="debug-overlay" v-if="isDev">
        <slot name="debug-content"></slot>
      </div>
    </div>
    <div class="game-overlay js-game-ui">
      <div class="game-overlay-info js-info-overlay">
        <slot name="info-content"></slot>
      </div>
      <div class="game-overlay-page js-instructions-overlay" :class="isShown('menu')">
        <slot name="instruction-content"></slot>
      </div>
      <div class="game-overlay-page js-quit-overlay"  :class="isShown('quit')">
        <slot name="quit-content"></slot>
      </div>
      <div class="game-overlay-page js-over-overlay"  :class="isShown('over')">
        <slot name="over-content"></slot>
      </div>
      <div class="game-overlay-page js-form-overlay"  :class="isShown('form')">
        <slot name="form-content"></slot>
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
export default {
  data() {
    return {
      isDev: false,
    }
  },
  props: ['state'],
  computed: {
    isClosed() {
      return { close: this.state === 'play' }
    },
    isDebug() {
      return !this.isProduction;
    },
    showMenu() {
      return this.state === 'play';
    },
    menuState() {
      return {
        overlay: this.state === 'pause'
      }
    }
  },
  methods: {
    isShown(state) {
      return { ghost: this.state !== state };
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
