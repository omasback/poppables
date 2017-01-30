<style lang="scss" scoped>
@import "../../../../styles/globals.scss";

  @keyframes flash {
    from {
      opacity: .2;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(1.5);
    }
  }

  .game-warning {
    font-size: 15em;
    color: #ed1846;
    opacity: .5;
    animation: flash 1.10s infinite;
  }

</style>

<template>
  <div class="game-body">
    <gui>
      
      <timer slot="menu-content" :time="api.game.settings.time" v-on:countdown="updateCountdown"></timer>
      <score-board slot="menu-content"></score-board>
      <game-controls slot="menu-content" v-on:pause="togglePlay" v-on:mute="toggleSound"></game-controls>
     
      
      <div slot="info-content" class="game-warning" v-show="countdown > 0 && countdown <= 5 "> {{countdown}} </div>
    
      
      <div id="debug" slot="debug-content">
        <label>
        </label>
      </div>
    </gui>
    <div class="game-container">
      <div id="game"></div>
    </div>
  </div>
</template>


<script>
import api from '../../api'
import game from './dots'

export default {
  data() {
    return {
      headerBar: document.querySelector('.headerBar'),
      width: window.innerWidth,
      height: window.innerHeight - document.querySelector('.headerBar').offsetHeight,
      
      api: api,
      countdown: 0,
    }
  },
  methods: {
    listen() {
      window.addEventListener('resize', (() => {
        this.width = window.innerWidth; // * window.devicePixelRatio
        this.height = (window.innerHeight - this.headerBar.offsetHeight); // * window.devicePixelRatio 
      }).bind(this));
    },
    togglePlay() {
      //call api
    },
    toggleSound() {
      //call api
    },
    updateCountdown(time) {
      this.countdown = time;
    }
  },
  computed: {

  },
  created() {
    this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, 'game', { preload() {}, create() {}, update() {}, render() {} }, true);
    this.game.state.add('boot', game.boot);
    this.game.state.add('load', game.load);
    this.game.state.add('menu', game.menu);
    this.game.state.add('play', game.play);
    this.game.state.add('won', game.won);
    this.game.state.add('over', game.over);

    this.game.state.start('boot');

    this.listen();
  }
}
</script>