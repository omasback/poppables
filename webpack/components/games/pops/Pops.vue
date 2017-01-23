<template>
<div class="game-body">
  <gui>
    <div slot="header-content">

    </div>
    <div slot="menu-content" class="flex-container center-between">
      <power-bar></power-bar>
      <score-board></score-board>
      <game-controls></game-controls>
    </div>
    <div id="menu" slot="instruction-content" :class="isShown('menu')">
      <p>How to play:</p>
      <p>Tap or click to pop the poppables!</p>
      <div>
        <img data-src="holder.js/250x180">
      </div>
      <button id="play" @click="startGame">Start Playing</button>
    </div>
    <div id="pause" slot="pause-content" :class="isShown('pause')">

    </div>
    <div id="won" slot="won-content" :class="isShown('won')">
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
        debug: window.location.hostname == "localhost",
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
          //this.game.width = this.width = window.innerWidth * window.devicePixelRatio
          //this.game.height = this.height = (window.innerHeight - this.headerBar.offsetHeight) * window.devicePixelRatio 
          this.game.scale.setGameSize(this.width, this.height);
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
      this.game = new Phaser.Game(this.width /* * window.devicePixelRatio */, this.height /* * window.devicePixelRatio */, Phaser.AUTO, 'game', { preload() {}, create() {}, update() {}, render() {} }, true);
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