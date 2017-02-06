<style lang="scss" scoped>
@import "~styles/application";

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

  .game-info {
    font-size: 15em;
    opacity: .5;
    animation: flash 1.10s infinite;
  }

  .warning {
    color: #ed1846;
  }

  .screen {
    @include flex-container(center, center, column);
    max-width: 786px;
  }

  .dots-menu {
    @include flex-container(center, space-between)
    max-width: 786px;
    
  }

</style>

<template>
  <div class="game-body">
    <gui :state="data.state">
      <div slot="menu-content" class="dots-menu">
        <timer :time="data.time" v-on:countdown="updateCountdown"></timer>
        <score-board :score="data.score"></score-board>
        <game-controls v-on:pause="pauseGame" v-on:mute="toggleSound"></game-controls>
      </div>
     

      <div slot="info-content" class="game-info warning" v-show="countdown > 0 && countdown <= 5 "> 
        {{countdown}} 
      </div>
      <div id="menu" class="screen" slot="instruction-content">
        <p class="small-title">How to play:</p>
        <p class="prompt"></p>
      
        <button class="active" @click="playGame">START PLAYING</button>
      </div>

    </gui>
    <div class="game-container">
      <div id="game"></div>
    </div>
  </div>
</template>


<script>
import data from './data'
import Game from './Game'

let game;

export default {
  data() {
    return {
      data,
      countdown: 0,
    }
  },
  methods: {
    updateCountdown(time) {
      this.countdown = time;
    },
    startCountDown(duration) {

    },
    listen() {

    },
    bootGame() {
      game.start();
    },
    playGame() {
      document.querySelector('.headerToggle').classList.add('ghost');
      document.querySelector('.headerBar').style.boxShadow = 'none';
      game.play();
      this.startCountDown(3);
    },
    resumeGame() {
      document.querySelector('.headerToggle').classList.add('ghost');
      game.resume();
      this.startCountDown(3);
    },
    stopGame() {
      console.log('stop game called')
      document.querySelector('.headerToggle').classList.remove('ghost');
      game.stop();
    },
    pauseGame() {
      document.querySelector('.headerToggle').classList.remove('ghost');
      game.pause();
    },
    restartGame() {
      //TODO -- game.restart()
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
      this.changeGame();
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
  }
}
</script>