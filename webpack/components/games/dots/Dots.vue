<style lang="scss" scoped>

</style>

<template>
  <div class="game-body">
    <gui :info="getGameInfo">
      
        <timer slot="menu-content"></timer>
        <score-board slot="menu-content"></score-board>
        <game-controls slot="menu-content" v-on:pause="togglePlay" v-on:mute="toggleSound"></game-controls>
     
    </gui>
    <div class="game-container">
      <div id="game"></div>
    </div>
  </div>
</template>


<script>
import game from './dots'

export default {
  data() {
    return { 
      width: window.innerWidth,
      height: window.innerHeight,
      game: null
    }
  },
  methods: {
    listen() {

    },
    togglePlay() {
      this.game.paused = !this.game.paused;
    },
    toggleSound() {
      this.game.sound.mute = !this.game.sound.mute;
    } 
  },
  computed: {
    getGameInfo() {
      let gameState = this.game.state.getCurrentState();
      return gameState ? {state: gameState.key, paused: this.game.paused, closed: gameState.key === 'play' && !this.game.paused} 
                        : {state: 'boot', paused: false, closed: false};
    }
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