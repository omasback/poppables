<style lang="scss" scoped>
  @import "../../../styles/globals.scss";

  .pops-menu {
    @include flex-container(center, space-between);

  }
</style>

<template>
<div class="game-body">
  <gui :info="getGameInfo">
    <div slot="header-content">

    </div>
    <div slot="menu-content" class="pops-menu">
      <!-- Possibly put these three components into one component -->
      <power-bar ></power-bar>
      <score-board ></score-board>
      <game-controls v-on:pause="togglePlay" v-on:mute="toggleSound"></game-controls>
    </div>
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

      <button>RESUME GAME</button>

      <div class="divider"></div>

      <div>
        <button>RESTART GAME</button>
        <button>CHANGE GAME</button>
      </div>

      <a href="/">Return Home</a>
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
        headerBar: document.querySelector(".headerBar"),
        width: window.innerWidth,
        height: window.innerHeight - document.querySelector(".headerBar").offsetHeight,
        game: null,
      }
    },
    components: {

    },
    methods: {
      listen() {
        window.addEventListener('resize', function() {
          this.width = window.innerWidth; // * window.devicePixelRatio
          this.height = (window.innerHeight - this.headerBar.offsetHeight); // * window.devicePixelRatio 

          this.game.scale.setGameSize(this.width, this.height);
          this.game.renderer.resize(this.width, this.height);
        }.bind(this));
      },
      startGame() {
        this.game.state.start("play");
        
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
        return gameState ? {state: gameState.key, paused: this.game.paused, closed: gameState.key == 'play' && !this.game.paused} 
                         : {state: 'boot', paused: false, closed: false};
      }
    },
    created() {


      this.game = new Phaser.Game(this.width /* * window.devicePixelRatio */, this.height /* * window.devicePixelRatio */, Phaser.AUTO, 'game', { preload() {}, create() {}, update() {}, render() {} }, true);
      this.game.state.add("boot", game.boot);
      this.game.state.add("load", game.load);
      this.game.state.add("menu", game.menu);
      this.game.state.add("play", game.play);
      this.game.state.add("pause", game.pause);
      this.game.state.add("won", game.won);
      this.game.state.add("over", game.over);

      this.game.state.start("boot");

      this.listen();
    },
    mounted() {}
  }
  export { Pops as default }
</script>