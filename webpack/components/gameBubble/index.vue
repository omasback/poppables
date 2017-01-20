<template>
  <div class="gameBubble" v-on:click="onClick">
    <div>
      <div class="bodymover"></div>
    </div>
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import bodyMoverMixin from 'util/bodyMoverMixin';
import loop from './loop.json';
import pop from './pop.json';

[loop, pop].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./images', false, /^\.\//));
})

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
    this.bodyContainer = this.$el.querySelector('.bodymover');
    this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
      container: this.bodyContainer,
      animationData: loop,
      loop: false
    }));
  },
  methods: {
    onClick: function() {
      this.bodyMover.destroy()
      this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
        container: this.bodyContainer,
        animationData: pop,
        loop: false,
      }));
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/globals';

.gameBubble {
  @include bubble;

  width: 50%;

  @media (orientation: landscape) {
    width: 18%;
  }
}
</style>
