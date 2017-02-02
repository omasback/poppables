<style lang="scss" scoped>
  @import "~styles/application.scss";

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
  <gui :state="data.state">
    <div slot="header-content"></div>
    <!-- menu content -->
    <div slot="menu-content" class="player-info">
      <power-bar slot="menu-content" :misses="data.misses"></power-bar>
      <div slot="menu-content" class="score-board">
        <score-board :score="data.score"></score-board>
        <multiplier :multiplier="data.multiplier"></multiplier>
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
      <button @click="playGame">START PLAYING</button>
    </screen>

    <screen id="pause" slot="pause-content">
      <h2 slot="title">Game Paused</h2>
      <button class="active" @click="resumeGame">RESUME GAME</button>
      <div class="divider"></div>
      <div class="row">
        <button @click="restartGame">RESTART GAME</button>
        <button @click="changeGame">CHANGE GAME</button>
      </div>
    </screen>

    <screen id="over" slot="over-content">
      <h2 slot="title">Way to go!</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et</p>
      <h3>ENTER YOUR INITIALS</h3>
      <input placeholder="A B C">
      <div class="divider"></div>
      <a href="/games" @click="changeState('won')">SKIP</a>
      <button @click="saveScore">Save Score</button>
    </screen>

    <screen id="won" slot="won-content">
      <h2>Way to go!</h2>
      <p>Fill out the form below to redeem your free trail bag of Lay's Poppables!</p>
      <div>

      </div>
      <button>CLAIM MY FREE BAG!</button>
    </screen>

    <screen id="error" slot="error-content">

    </screen>
    <!--
    <screen id="debug" slot="debug-content">
      <label>
        Max Speed ({{ data.maxSpeed }}):
        <input v-model.number="datamaxSpeed" v-on:input="" id="max-speed" type="range" min="1" max="20">
      </label>
      <label>
        Speed ({{ data.speed }}):
        <input v-model.number="data.speed" v-on:input="" id="current-speed" type="range" min="0" :max="data.maxSpeed">
      </label>
      <label>
        Chance ({{ data.chance }}):
        <input v-model.number="data.chance" v-on:input="" id="current-chance" type="range" max="1" step=".01">
      </label>
    </screen>
    -->
    <!-- end screens -->
  </gui>

  <div id="pops-container" class="game-container">
    <div id="game"></div>
  </div>
</div>

</template>


<script>
  import Game from './Game'
  import data from './data'

  let game;

  const Pops = {
    data() {
      return {
        //Global DOM elements

        //game data
        data

        //props
        
      }
    },
    methods: {
      listen() {
      
      },
      bootGame() {
        game.start();
      },
      playGame() {
        game.play();
      },
      pauseGame() {
        game.pause();
      },
      resumeGame() {
        game.resume();
      },
      restartGame() {
        window.location.reload();
      },
      changeGame() {
        window.location = '/games';
      },
      toggleSound() {
        game.toggleSound();
      },
      saveScore() {
        game.sendResults(this.data);
      },
      changeState(state) {
        console.log(state)
      }
    },
    computed: {

    },
    created() {
      game = new Game(window.innerWidth, window.innerHeight - document.querySelector('.headerBar').offsetHeight, 'game', data);
      this.bootGame(); //TODO? - Have the game boot inside constructor?

      this.listen();
    },
    mounted() {
      
    }
  }
  export { Pops as default }
</script>