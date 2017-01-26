<style lang="scss" scoped>
  @import "../../../styles/globals.scss";

  .pops-menu {
    @include flex-container(center, space-between);
  }
  .score-board {
    @include flex();
  }
</style>

<template>
<div class="game-body">
  <gui :info="getGameInfo" >
    <div slot="header-content"></div>
   
    <power-bar slot="menu-content"></power-bar>

    <div slot="menu-content" class="score-board">
      <score-board></score-board>
      <multiplier :class="isPaused"></multiplier>
    </div>
    
    <game-controls slot="menu-content" v-on:pause="togglePlay" v-on:mute="toggleSound"></game-controls>

    <div id="won" slot="won-content">
    </div>

    <div id="lost" slot="lost-content">
    </div>

    <div id="menu" slot="instruction-content">
      <!--Instructions itself can be a module with slots
        - title
        - description
        - video/tutorial
      -->
      <p>How to play:</p>
      <p>Tap or click to pop the poppables!</p>
      <button id="play" @click="startGame">START PLAYING</button>
    </div>

    <div id="pause" slot="pause-content">
      <h2> Game Paused </h2>

      <button class="active" @click="resumeGame">RESUME GAME</button>

      <div class="divider"></div>

      <div>
        <button @click="restartGame">RESTART GAME</button>
        <button @click="changeGame">CHANGE GAME</button>
      </div>

      <a href="/games">Return Home</a>
    </div>
  
    <div id="error" slot="error-content">

    </div>

    <div id="debug" slot="debug-content">
      <label>
        Max Speed ({{ maxSpeed }}):
        <input v-model.number="maxSpeed" v-on:input="updateMaxSpeed()" id="max-speed" type="range" min="1" max="20">
      </label>
      <label>
        Speed ({{ speed }}):
        <input v-model.number="speed" v-on:input="updateSpeed()" id="current-speed" type="range" min="0" :max="maxSpeed">
      </label>
      <label>
        Chance ({{ chance }}):
        <input v-model.number="chance" v-on:input="updateChance()" id="current-chance" type="range" max="1" step=".01">
      </label>
    </div>
  </gui>
  <div id="pops-container" class="game-container">
    <div id="game"></div>
  </div>

</div>
</template>


<script>
  import game from './pops'

  const Pops = {
    data() {
      return {
        headerBar: document.querySelector('.headerBar'),
        width: window.innerWidth,
        height: window.innerHeight - document.querySelector('.headerBar').offsetHeight,
        game: null,
        maxSpeed: 5,
        speed: 0,
        chance: .25
      }
    },
    components: {

    },
    methods: {
      listen() {
        window.addEventListener('resize', (() => {
          this.width = window.innerWidth; // * window.devicePixelRatio
          this.height = (window.innerHeight - this.headerBar.offsetHeight); // * window.devicePixelRatio 

          this.game.scale.setGameSize(this.width, this.height);
          this.game.renderer.resize(this.width, this.height);

          this.$emit('resize');
        }).bind(this));
      },
      updateGame(action) {
        switch(action) {
        case 'start':
          this.game.state.start('play');
          break;
        case 'restart':
          window.location.reload();
          break;
        case 'change':
          window.location = '/games';
          break;
        case 'resume':
          this.game.paused = false;
          break;
        default: 
          console.warn('Undefined action: ' + action)
          break;
        }
      },
      startGame() {
        this.game.state.start('play');
      },
      restartGame() {
        window.location.reload();
      },
      changeGame() {
        window.location = '/games';
      },
      resumeGame() {
        this.game.paused = false;
      },
      //TODO - toggle function with one input
      togglePlay() {
        this.game.paused = !this.game.paused;
      },
      toggleSound() {
        this.game.sound.mute = !this.game.sound.mute;
      },
      //TODO - update function with one input.
      updateSettings(variable) {
        let val = this[variable];
        game.settings.update(variable, val)
      },
      updateMaxSpeed() {
        game.settings.maxSpeed = this.maxSpeed;
      },
      updateSpeed() {
        game.settings.speed = this.speed;
      },
      updateChance() {
        game.settings.chance = this.chance;
      }
    },
    computed: {
      getGameInfo() {
        let gameState = this.game.state.getCurrentState();
        return gameState ? {state: gameState.key, paused: this.game.paused, closed: gameState.key === 'play' && !this.game.paused} 
                         : {state: 'boot', paused: false, closed: false};
      },
      isPaused() {
        return { ghost: this.game.paused }
      },
    },
    created() {
      /* 
        BoardGame.config = {
          width: set || window.innerWidth,
          height: set || window.innerHeight,
          tiles: 
          infiniteScroll: bool,
          resize: function(){ callback }
          gameLogic: function() { callback }
        }

      */

      //new BoardGame(config)

      this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, 'game', { preload() {}, create() {}, update() {}, render() {} }, true);
      this.game.state.add('boot', game.boot);
      this.game.state.add('load', game.load);
      this.game.state.add('menu', game.menu);
      this.game.state.add('play', game.play);
      this.game.state.add('won', game.won);
      this.game.state.add('over', game.over);

      this.game.state.start('boot');

      this.listen();
    },
    mounted() {}
  }
  export { Pops as default }
</script>