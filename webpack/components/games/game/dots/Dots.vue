<style lang="scss" scoped>
@import '~styles/helpers';

  .dots-menu {
    @include flex-container(center, space-between)
  }
  .menu-pause {
    @include flex-container(center, center);

    .score {
      @include flex(center, center, column)
    }
  }

</style>

<template>
  <div class="game-body">
    <gui :state="data.state">
      <template v-if="data.state === 'play'">
        <div slot="menu-content" class="dots-menu">
          <timer :time="data.time"></timer>
          <score-board :score="data.score" text="score"></score-board>
          <game-controls v-on:pause="pauseGame" v-on:mute="toggleSound"></game-controls>
        </div>
      </template>
      <template v-else-if="data.state === 'pause'">
        <div slot="menu-content" class="menu-pause">
          <score-board :score="data.score" text="Current Score"></score-board>
        </div>
      </template>
      <template v-else>
        <div slot="menu-content" class="menu-pause">
          <score-board :score="data.score" text="Final Score"></score-board>
        </div>
      </template>

      <div id="menu" class="screen" slot="instruction-content">
        <p class="small-title">How to play:</p>
        <p class="prompt">Connect similar icons to remove them from the board. Connect Poppables for a Flavor Bonus!</p>
        <p class="prompt">Pro Tip: Make longer chains to score more points!</p>
        <div class="preview">

        </div>
        <button @click="playGame">START PLAYING</button>
      </div>

      <div class="screen" slot="pause-content">
        <h2 class="pause-title">Game Paused</h2>
        <button class="active" @click="resumeGame">RESUME GAME</button>
        <div class="divider"></div>
        <div class="row">
          <button @click="restartGame">RESTART GAME</button>
          <button @click="changeGame">CHANGE GAME</button>
        </div>
        <a href="/">Return Home</a>
      </div>

      <div class="screen" slot="over-content">
        <h2 slot="title">Way to go!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et</p>
        <h3>ENTER YOUR INITIALS</h3>
        <input placeholder="">

        <a href="#" @click="changeState('form')">SKIP</a>
        <div class="divider"></div>
        <button @click="saveScore">Save Score</button>
      </div>
      
      <div id="info" class="screen" slot="info-content">
        <countdown size="xl" :duration="countdown" :warn="timer.warn"></countdown>
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
      timer: {
        start: false,
        warn: false
      }
    }
  },
  methods: {
    updateCountdown(time) {
      this.countdown = time;
      if(this.countdown <= 5) {
        this.timer.warn = true;
      }
    },
    startTimer() {
      let self = this;

      self.timerID = setInterval(() => {
        self.data.time -= 1;

        if(self.data.time <= 5) {
          self.updateCountdown(self.data.time)
        }
        if(self.data.time <= 0) {
          self.stopGame();
          clearInterval(self.timerID);
        }
      }, 1000);
    },
    startCountDown(duration) {
      this.countdown = duration;
      if(this.countdownID) {
        clearInterval(this.countdownID);
      }

      this.countdownID = setInterval((() => {
        this.countdown--;
        if(this.countdown <= 0) {
          this.startTimer();
          clearInterval(this.countdownID);
        }
      }).bind(this), 1000);
    },
    countdownClass() {
      return {
        warning: true
      }
    },
    bootGame() {
      game.start('dots');
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
      document.querySelector('.headerToggle').classList.remove('ghost');
      game.stop();
    },
    pauseGame() {
      document.querySelector('.headerToggle').classList.remove('ghost');
      game.pause();
      clearInterval(this.timerID)
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
    },

  },
  computed: {

  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        if(val.state === 'menu' && window.location.hash) {
          this.playGame();
        }
      }
    }
  },
  created() {
    game = new Game(window.innerWidth, window.innerHeight - document.querySelector('.headerBar').offsetHeight, 'game', data);
    this.bootGame(); //TODO? - Have the game boot inside constructor?
  },
  beforeUpdate() {
    // console.log('Before Update -- Dots.vue')
  },
  destroyed() {
    clearInterval(this.iid);
  }
}
</script>
