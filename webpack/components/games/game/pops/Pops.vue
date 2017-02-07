<style lang="scss" scoped>
  @import "~styles/application";

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
      <p class="prompt">Tap or Click the Poppables as fast as you can! Pop them to earn a multiplier and 
        increase your score. Pay attention - the screen moves faster the more you play. Now let's get poppin'!
      </p>
    
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
      <input placeholder="A B C">
      
      <a href="#" @click="changeState('form')">SKIP</a>
      <div class="divider"></div>
      <button @click="saveScore">Save Score</button>
    </div>

    <div class="screen" slot="form-content">
      <!-- STEP 1 -->
      <h2>Way to go!</h2>
      <p>Fill out the form below to redeem your free trail bag of Lay's Poppables!</p>
      <div>

      </div>
      <button>CLAIM MY FREE BAG!</button>

      <!-- STEP 2 -->

      <!-- STEP 3 -->

    </div>

    <div id="error" class="screen" slot="error-content">
      <!-- Redundant Submission -->
      <div v-show="">
      </div>
      <!-- Too Young -->
      <div v-show="">
      </div>
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
      listen() {
      
      },
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