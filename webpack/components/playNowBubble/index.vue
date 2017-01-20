<template>
  <div class="wrapper" v-on:click="onClick">
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import bodyMoverMixin from 'util/bodyMoverMixin';
import animationData from './data.json';

export default {
  data: function() {
    return {
      bmOptions: {
        renderer: 'svg',
        autoplay: true,
        animationData,
      },
    }
  },
  mounted: function() {
    // this.bodyContainer = this.$el.querySelector('.bodymover');
    this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
      container: this.$el,
      animationData,
      loop: true
    }));
    this.bodyMover.playSegments([[0, 120]], true)
    return;

    this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
      container: this.bodyContainer,
      animationData: grow,
      loop: false
    }));
    this.bodyMover.onComplete = () => {
      this.bodyMover.destroy()
      this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
        container: this.bodyContainer,
        animationData: loop,
        loop: true,
      }));
    }
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

.wrapper {
  width: 81%;
  position: absolute;
  top: -38%;
  right: 0%;
  transform: rotate(-15deg);

  @media (orientation: landscape) {
    right: -14%;
    width: 67%;
    top: -32%;
    transform: rotate(-12deg);
  }
}
</style>
