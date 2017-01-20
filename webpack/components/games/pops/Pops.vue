<template>
<div class="game-body">
  <gui>
    <div slot="header-content">

    </div>
    <div slot="menu-content" class="flex-container center-around">
      <power-bar></power-bar>
      <score-board></score-board>
      <game-controls></game-controls>
    </div>
    <div id="menu" slot="instruction-content" :class="isShown('menu')">
      <p>How to play:</p>
      <p>Tap or click to pop the poppables!</p>
      <button id="play" @click="startGame">Play Now</button>
    </div>
    <div id="pause" slot="pause-content" :class="isShown('pause')">

    </div>
    <div id="won" slot="won-content" :class="isShown('won')">
    </div>
    <div v-if="debug" id="debug" slot="debug-content">
      DEBUG
    </div>
  </gui>
  <div id="game" class="flex-container center-center"></div>
</div>
</template>


<script>
  import game from './pops'

  const Pops = {
    data() {
      return {
        debug: window.location.hostname == "localhost",
        width: window.innerWidth,
        height: window.innerHeight,
        game: null,
      }
    },
    components: {

    },
    methods: {
      listen() {
        window.addEventListener('resize', function() {
          this.game.width = this.width = window.innerWidth; //* window.devicePixelRatio
          this.game.height = this.height = window.innerHeight; //* window.devicePixelRatio 
          this.game.renderer.resize(this.width, this.height);
        }.bind(this));
      },
      isShown(state) {
        let gameState = this.game.state.getCurrentState(); // this runs before game is started.
        return gameState ? { ghost: gameState.key != state } : { ghost: true };
      },
      startGame() {
        // pass over close message to gui.
        this.game.state.start("play");
        
      }

    },
    computed: {

    },
    created() {
      this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, 'game', { preload() {}, create() {}, update() {}, render() {} }, false);
      this.game.state.add("boot", game.boot);
      this.game.state.add("load", game.load);
      this.game.state.add("menu", game.menu);
      this.game.state.add("play", game.play);
      this.game.state.add("pause", game.pause);
      this.game.state.add("won", game.won);
      this.game.state.start("boot");

      this.listen();

      // this.on('something', function() { })
    },
    mounted() {
      // console.log("mounted -- pops")
    }
  }
  export { Pops as default }
</script>

<style lang="scss" scoped>

</style>