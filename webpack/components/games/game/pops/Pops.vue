<style lang="scss" scoped>
  @import '~styles/helpers';

  .pops-menu {
    @include flex-container(center, space-between);
  }

  .menu-play {
    @include flex-container(center, space-between);
  }

  .menu-pause {
    @include flex-container(center, center);

    .score {
      @include flex(center, center, column)
    }
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
    <!-- menu content -->
    <template v-if="data.state === 'play'">
      <div slot="menu-content" class="menu-play">
        <div class="player-info">
          <power-bar :misses="data.misses" v-on:empty="stopGame"></power-bar>
          <div class="score-board">
            <score-board :score="data.score" text="score"></score-board>
            <multiplier :multiplier="data.multiplier"></multiplier>
          </div>
        </div>
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
    <!-- end menu content -->
    <!-- screens -->
    <div id="menu" class="screen" slot="instruction-content">
      <p class="small-title">How to play:</p>
      <p class="prompt">Tap or click the Poppables as fast as you can. The more you pop in a row, the bigger your Flavor Bonus!</p>
      <p class="prompt">Pro Tip: Clicking empty bubbles will decrease your power!</p>
      <div class="preview"></div>
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
      <p class="title">Way to go!</p>
      <p class="small-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et</p>
      <p class="prompt">ENTER YOUR INITIALS</p>
      <input class="initials" placeholder=" ABC " v-model="data.initials" maxlength="3" minlength="3">

      <a href="#">SKIP</a>
      <div class="divider"></div>

      <table class="leaderboard">
        <tr><th>RANK:</th><th>INITIALS:</th><th>SCORE:</th></tr>
        <template v-for="leaders in data.leaderboard.leaders">
          <tr><td v-text="leaders.rank"></td><td v-text="leaders.initials"></td><td v-text="leaders.score"></td></tr>
        </template>
        <tr class="divider-ellip"><td></td><td>. . .</td><td></td></tr>
      </table>
      <div class="player-score">
        <div v-text="data.leaderboard.position"></div>
        <div>YOU</div>
        <div v-text="data.score"></div>
      </div>

      <button class="active" @click="saveScore">Save Score</button>

    </div>

    <div id="info" class="screen" slot="info-content">
      <countdown :duration="countdown" size="xl"></countdown>
    </div>
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
        //game data
        data,
        //props
        countdown: 0,

      }
    },
    methods: {
      startCountDown(duration) {
        this.countdown = duration;
        if(this.iid)
          clearInterval(this.iid);

        this.iid = setInterval((() => {
          this.countdown--;
        }).bind(this), 1000);
      },
      bootGame() {
        game.start();
      },
      playGame() {
        document.querySelector('.headerToggle').classList.add('ghost');
        document.querySelector('.headerBar').classList.remove('shadow');
        game.play(this.data);

        this.startCountDown(3);
      },
      resumeGame() {
        document.querySelector('.headerToggle').classList.add('ghost');
        game.resume();

        this.startCountDown(3);
      },
      stopGame() {
        document.querySelector('.headerToggle').classList.remove('ghost');
        if(this.data.score >= 500) {
          this.data.won = true;
        }
        game.stop();
      },
      pauseGame() {
        document.querySelector('.headerToggle').classList.remove('ghost');
        game.pause();
      },
      restartGame() {
        game.restart();
      },
      changeGame() {
        window.location = '/games';
      },
      toggleSound() {
        game.toggleSound();
      },
      saveScore() {
        if(this.data.score >= 500) {
          this.data.won = true;
        }
        game.sendResults(this.data);
      }
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
    mounted() {

    }
  }
  export { Pops as default }
</script>
