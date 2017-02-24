<style lang="scss" scoped>
  @import '~styles/helpers';

  .pops-menu {
    @include flex-container(center, space-between);
  }

  .menu-play {
    @include flex-container(center, space-between);
  }

  .menu-center {
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

  .overlay {
    position: absolute;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    color: #FA3F4A;
    background: #33dae3;
    background: -moz-linear-gradient(top, #2dc4cb 0%, #33dae3 50%, #2dc4cb 100%);
    background: -webkit-linear-gradient(top, #2dc4cb 0%,#33dae3 50%,#2dc4cb 100%);
    background: linear-gradient(to bottom, #2dc4cb 0%,#33dae3 50%,#2dc4cb 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#2dc4cb', endColorstr='#2dc4cb',GradientType=0 );
    @include flex-container(center, center, column);

    i {
      font-size: 32px;
      cursor: pointer;
    }
  }
  
  .orient-prompt {
    width: 125px;
    height: 225px;
    background-image: url('~components/games/ui/images/prompt.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
</style>

<template>

<div class="game-body">
  <gui :state="data.state">
    <!-- menu content -->
    <template v-if="data.state === 'play'">
      <div slot="menu-content" class="menu-play">
        <div class="player-info">
          <power-bar :misses="data.misses" :time="data.time" v-on:empty="stopGame"></power-bar>
          <div class="score-board">
            <score-board :score="data.score" text="score"></score-board>
            <multiplier :multiplier="data.multiplier"></multiplier>
          </div>
        </div>
        <game-controls v-on:pause="pauseGame" v-on:mute="toggleSound"></game-controls>
      </div>
    </template>
    <template v-else-if="data.state === 'pause'">
      <div slot="menu-content" class="menu-center">
        <score-board :score="data.score" text="Current Score"></score-board>
      </div>
    </template>
    <template v-else>
      <div slot="menu-content" class="menu-center">
        <score-board :score="data.score" text="Final Score"></score-board>
      </div>
    </template>

    <!-- end menu content -->
    <!-- screens -->
    <div class="screen" slot="instruction-content">
      <p class="small-title">How to play:</p>
      <p class="prompt">Tap or click the Poppables as fast as you can. The more you pop in a row, the bigger your Flavor Bonus!</p>
      <p class="pro-tip">Pro Tip: Clicking empty bubbles will decrease your power!</p>
      <video width="100%" controls autoplay loop class="preview">
        <source src="https://dcyb5ui1o0ebh.cloudfront.net/static/videos/preview-pops.mp4" type="video/mp4">
        <source src="https://dcyb5ui1o0ebh.cloudfront.net/static/videos/preview-pops.webm" type="video/webm">
      </video>
      <button @click="playGame(3)">START PLAYING</button>
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

    <div class="screen" slot="incorrect-content">
      <p class="title">Please rotate your device to portrait.</p>
      <div class="orient-prompt"></div>
    </div>

    <div class="screen" slot="over-content">
      <header>
        <p class="title">Pop-a-licious!</p>
        <p class="small-prompt">Wow, you're a poppin' machine! Enter your initials below and play again to see if you can increase your score.</p>
        <p class="prompt">ENTER YOUR INITIALS</p>
      </header>
      
      <input class="initials" placeholder=" ABC " v-model="data.initials" maxlength="3" minlength="3" :class="checkError">

      <a href="javascript:;" @click="changeState('share')">SKIP</a>
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

      <template v-for="err in data.errors">
        <span class="error" v-text="err"></span>
      </template>

    </div>

    <div class="screen" slot="share-content">
      <p class="title">Way to go!</p>
      <p class="small-prompt">Tell the world about your accomplishments, try to beat your high score or play another game.</p>
      <p class="prompt">Share your Score:</p>
      <div class="row">
        <a class="button social">
          <i class="fa fa-facebook" aria-hidden="true"></i>
          Facebook
        </a>
        <a class="button social"> 
          <i class="fa fa-twitter" aria-hidden="true"></i>
          Twitter
        </a>
      </div>
      <div class="divider"></div>

      <button class="active" @click="restartGame">PLAY AGAIN</button>
      <button @click="changeGame">CHANGE GAME</button>
    </div>

    <div class="screen" slot="info-content">
      <countdown :duration="countdown" size="xl"></countdown>
    </div>
    <!-- end screens -->
  </gui>

  <div class="overlay" v-if="data.resized">
    <h1>You resized your browser!</h1>
    <h2>Please refresh your browser to optimize your experience.</h2>
    <i class="fa fa-refresh" aria-hidden="true" @click="restartGame"></i>
  </div>
  
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
      startTimer() {
        if(this.timerID) {
          clearInterval(this.timerID);
        }
        this.timerID = setInterval((() => {
          this.data.time += 0.1;
        }).bind(this), 100);
      },
      startCountdown(duration) {
        this.countdown = duration;
        if(this.countdownID)
          clearInterval(this.countdownID);

        this.countdownID = setInterval((() => {
          this.countdown--;
          if(this.countdown === 0){
            this.startTimer();
            clearInterval(this.countdownID);
          }

        }).bind(this), 1000);
      },
      bootGame() {
        game.start();
      },
      playGame(timer) {
        document.querySelector('.headerToggle').classList.add('ghost');
        document.querySelector('.headerBar').classList.remove('shadow');
        game.play();

        this.startCountdown(timer);
      },
      resumeGame() {
        document.querySelector('.headerToggle').classList.add('ghost');
        game.resume();

        this.startCountdown(3);
      },
      stopGame() {
        document.querySelector('.headerToggle').classList.remove('ghost');
        clearInterval(this.timerID);
        if(this.data.score >= 500) {
          this.data.won = true;
        }
        game.stop();
      },
      falterGame() {
        document.querySelector('.headerToggle').classList.remove('ghost');

        clearInterval(this.timerID);

        game.falter();
      },
      pauseGame() {
        document.querySelector('.headerToggle').classList.remove('ghost');

        clearInterval(this.timerID);

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
      },
      changeState(state) {
        data.state = state;
      }
    },
    computed: {
      checkError() {
        return {
          error: this.data.errors.length > 0
        }
      }
    },
    watch: {
      data: {
        deep: true,
        handler(val) {
          if(val.state === 'menu' && window.location.hash) {
            this.playGame(4);
          }
        }
      },
      'data.state'(val) {
        if(val === 'incorrect') {
          this.falterGame();
        }
        else if(val === 'correct') {
          this.resumeGame();
        }
      }
    },
    components: {

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
