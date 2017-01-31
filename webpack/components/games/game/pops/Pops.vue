<style lang="scss" scoped>
  @import "../../../../styles/application.scss";

  .pops-menu {
    @include flex-container(center, space-between);
  }

  .score-board {
    @include flex();
    margin: 0 10px;
  }

  .player-info {
    @include flex();
  }

</style>

<template>

<div class="game-body">
  <gui>
    <div slot="header-content"></div>
    <!-- menu content -->
    <div slot="menu-content" class="player-info">
      <power-bar slot="menu-content" :misses="api.game.settings.misses"></power-bar>
      <div slot="menu-content" class="score-board">
        <score-board :score="api.game.settings.score"></score-board>
        <multiplier :multiplier="api.game.settings.multiplier"></multiplier>
      </div>
    </div>
    <game-controls slot="menu-content" v-on:pause="pauseGame" v-on:mute="toggleSound"></game-controls>
    <!-- end menu content -->
    <div id="won" slot="won-content"></div>
    <div id="lost" slot="lost-content"></div>
    <div id="menu" slot="instruction-content">
      <p>How to play:</p>
      <p>Tap or click the Poppables as fast as you can! Pop them consecutively to earn a multiplier and 
        increase your score. But pay attention - the screen moves faster the further you go, and every empty 
        bubble popped decreases your power. Now let's get poppin'!</p>
      <div></div>
      <button id="play" @click="startGame">START PLAYING</button>
    </div>
    <div id="pause" slot="pause-content">
      <h2>Game Paused</h2>
      <button class="active" @click="resumeGame">RESUME GAME</button>
      <div class="divider"></div>
      <div>
        <button @click="restartGame">RESTART GAME</button>
        <button @click="changeGame">CHANGE GAME</button>
      </div>
    </div>
    <div id="over" slot="over-content">
      <p>Way to go!</p>

      <button class="active" @click="restartGame">PLAY AGAIN</button>
      <button @click="changeGame">CHANGE GAME</button>
    </div>
    <div id="error" slot="error-content"></div>
    <div id="debug" slot="debug-content">
      <label>
        Max Speed ({{ api.game.settings.maxSpeed }}):
        <input v-model.number="api.game.settings.maxSpeed" v-on:input="" id="max-speed" type="range" min="1" max="20">
      </label>
      <label>
        Speed ({{ api.game.settings.speed }}):
        <input v-model.number="api.game.settings.speed" v-on:input="" id="current-speed" type="range" min="0" :max="api.game.settings.maxSpeed">
      </label>
      <label>
        Chance ({{ api.game.settings.chance }}):
        <input v-model.number="api.game.settings.chance" v-on:input="" id="current-chance" type="range" max="1" step=".01">
      </label>
    </div>
  </gui>

  <div id="pops-container" class="game-container">
    <div id="game"></div>
  </div>
</div>

</template>


<script>
  import pops from './pops'
  import api from '../../api'

  //could be imported from a class file
  let game;

  const Pops = {
    data() {
      return {
        //elements
        headerBar: document.querySelector('.headerBar'),

        //game api
        api: api,

        //props
        width: window.innerWidth,
        height: window.innerHeight - document.querySelector('.headerBar').offsetHeight,

        /*
        score: api.game.settings.score,
        speed: api.game.settings.speed,
        chance: api.game.settings.chance,
        multiplier: api.game.settings.multiplier,
        maxSpeed: api.game.settings.maxSpeed
        */

        //funcs
      }
    },
    methods: {
      listen() {
        window.addEventListener('resize', (() => {
          this.width = window.innerWidth;
          this.height = (window.innerHeight - this.headerBar.offsetHeight);
        }).bind(this));
      },
      startGame() {
        api.startGame(game);
      },
      pauseGame() {
        api.pauseGame(game);
      },
      resumeGame() {
        api.resumeGame(game);
      },
      restartGame() {
        //api.restartGame(game);
        window.location.reload();
      },
      changeGame() {
        window.location = '/games';
      },
      toggleSound() {
        api.toggleSound(game);
      }
    },
    computed: {

    },
    created() {
      this.listen();
    },
    mounted() {
      game = new Phaser.Game(window.innerWidth, window.innerHeight - document.querySelector('.headerBar').offsetHeight, Phaser.AUTO, 'game', { preload() {}, create() {}, update() {}, render() {} }, true);

      game.state.add('boot', pops.boot);
      game.state.add('load', pops.load);
      game.state.add('menu', pops.menu);
      game.state.add('play', pops.play);
      game.state.add('won',  pops.won);
      game.state.add('over', pops.over);

      game.state.start('boot')
    }
  }
  export { Pops as default }
</script>