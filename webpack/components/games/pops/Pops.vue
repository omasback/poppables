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
      <button id="play">Play Now</button>
    </div>

    <div id="pause" slot="pause-content">

    </div>
  </gui>
  <div id="game"></div>
</div>
</template>


<script>
  import game from './pops'

  const Pops = {
    data() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        game: null,
      }
    },
    components: {

    },
    methods: {
      listen() {
        //move into pops.js
        window.addEventListener('resize', function () {
          this.game.width = this.width = window.innerWidth; //* window.devicePixelRatio
          this.game.height = this.height = window.innerHeight; //* window.devicePixelRatio 
        }.bind(this));

      },
      getLogo() {

      },
      imgLoad() {

      },
      isShown(state) {
        let gameState = this.game.state.getCurrentState(); // this runs before game is started.
        return gameState ? { ghost: gameState.key != state } : { ghost: true };
      }

    },
    computed: {

    },
    created() {
      this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, 'game', { preload() {}, create() {}, update() {}, render() {} }, true);
      this.game.state.add("boot", game.boot);
      this.game.state.add("load", game.load);
      this.game.state.add("menu", game.menu);
      this.game.state.add("play", game.play);
      this.game.state.start("boot");

      this.listen();
    },
    mounted() {
      // console.log("mounted -- pops")
    }
  }

  export { Pops as default }

</script>

<style lang="scss" scoped>

</style>