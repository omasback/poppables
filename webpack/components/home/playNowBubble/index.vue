<template>
  <div class="playNowBubble" v-on:click="onClick">
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import loop from './loop.json';
import pop from './pop.json';

export default {
  data: function() {
    return {
      bmOptions: {
        renderer: 'svg',
        autoplay: true,
      },
    }
  },
  mounted: function() {
    this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
      container: this.$el,
      animationData: loop,
      loop: true
    }));
  },

  methods: {
    onClick: function() {
      this.bodyMover.destroy()
      this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
        container: this.$el,
        animationData: pop,
        loop: false,
      }));
      this.bodyMover.onComplete = () => {
        window.location = '/games'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/helpers';

.playNowBubble {
  width: 81%;
  position: absolute;
  top: -38%;
  right: 0%;
  z-index: $zPlayNowBubble;

  @media (orientation: landscape) {
    right: -14%;
    width: 68%;
    top: -33%;
    transform: rotate(3deg);
  }
}
</style>
