<template>
  <div class="redBubble" v-on:click="onClick">
  </div>
</template>

<script>
import bodyMoverMixin from 'util/bodyMoverMixin';
import animationData from './data.json';

export default {
  mixins: [bodyMoverMixin],
  data: () => {
    return {
      contextModule: require.context('./images', false, /^\.\//),
      bmOptions: {
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData
      },
    }
  },
  mounted: function() {
    this.bodyMover.onEnterFrame = goTo30;
  },
  methods: {
    onClick: function() {
      this.bodyMover.onEnterFrame = null;
      this.bodyMover.goToAndPlay(151, true);
      this.bodyMover.onLoopComplete = () => {
        this.bodyMover.goToAndPlay(0, true);
        this.bodyMover.onEnterFrame = goTo30;
      };
    }
  }
}

function goTo30(){
  if (this.currentFrame > 150) {
    this.goToAndPlay(30, true);
  }
}
</script>

<style lang="sass" scoped>

.redBubble {
  width: 300px;
  height: 300px;
  display: inline-block;
}

</style>
