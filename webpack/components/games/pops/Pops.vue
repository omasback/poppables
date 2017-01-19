<template>
<div class="game-body">
  <gui>
    <div slot="menu-content" class="flex-container center-around">
      <power-bar></power-bar>
      <score-board></score-board>
      <game-controls></game-controls>
    </div>
    <div slot="instruction-content">
      <p>How to play:</p>
      <p>Tap or click to pop the poppables!</p>
      <button id="play">Play Now</button>
    </div>
    <div slot="pause-content">

    </div>
  </gui>
  <div id="game">

  </div>
</div>
</template>


<script>
  import game from './pops'

  const Pops = {
    data() {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
        test: null,
        game: null,
      }
    },
    components: {

    },
    methods: {
      /** Listen: Window events and stuff.
       */
      listen() {

        window.addEventListener('resize', function () {
          this.game.width = this.width = window.innerWidth; //* window.devicePixelRatio
          this.game.height = this.height = window.innerHeight; //* window.devicePixelRatio 

        }.bind(this));

      }
    },
    created() {
      this.game = new Phaser.Game(this.width, this.height, Phaser.CANVAS, 'game', { preload() { }, create() { }, update() { }, render() { } }, true);
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