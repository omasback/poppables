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
      <power-bar slot="menu-content" :misses="api.game.misses"></power-bar>
      <div slot="menu-content" class="score-board">
        <score-board :score="api.game.score"></score-board>
        <multiplier :multiplier="api.game.multiplier"></multiplier>
      </div>
    </div>
    <game-controls slot="menu-content" v-on:pause="pauseGame" v-on:mute="toggleSound"></game-controls>
    <!-- end menu content -->
    <!-- screens -->
    <screen id="menu" slot="instruction-content">
      <h2 slot="title">How to play:</h2>
      <p slot="prompt">Tap or click the Poppables as fast as you can! Pop them consecutively to earn a multiplier and 
        increase your score. But pay attention - the screen moves faster the further you go, and every empty 
        bubble popped decreases your power. Now let's get poppin'!
      </p>
      <button id="play" @click="startGame">START PLAYING</button>
    </screen>

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
      
      <h2>Way to go!</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et</p>
      <h3>ENTER YOUR INITIALS</h3>
      <input placeholder="A B C">
      <div class="divider"></div>
      <a href="/games" @click="changeState('won')">SKIP</a>
      <button @click="saveScore">Save Score</button>
    </div>
    <div id="won" slot="won-content">
      <h2>Way to go!</h2>
      <p>Fill out the form below to redeem your free trail bag of Lay's Poppables!</p>
      <div>

      </div>
      <button>CLAIM MY FREE BAG!</button>
    </div>

    <div id="error" slot="error-content">

    </div>

    <div id="debug" slot="debug-content">
      <label>
        Max Speed ({{ api.game.maxSpeed }}):
        <input v-model.number="api.game.maxSpeed" v-on:input="" id="max-speed" type="range" min="1" max="20">
      </label>
      <label>
        Speed ({{ api.game.speed }}):
        <input v-model.number="api.game.speed" v-on:input="" id="current-speed" type="range" min="0" :max="api.game.maxSpeed">
      </label>
      <label>
        Chance ({{ api.game.chance }}):
        <input v-model.number="api.game.chance" v-on:input="" id="current-chance" type="range" max="1" step=".01">
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
        popsContainer: document.getElementById('pops-container'),

        //game api
        api: api,

        //props
        
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
      },
      saveScore() {

      },
      changeState(state) {

      }
    },
    computed: {

    },
    created() {
      console.log(['foo'].includes('foo'))

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