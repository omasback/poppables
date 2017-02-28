<template>
  <div class="playNowBubble">
    <div class="hitbox" v-on:click="onClick"></div>
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import loop from './loop.json';
import pop from './pop.json';

export default {
  props: ['pauseBubbles'],
  data: function() {
    return {
      bmOptions: {
        renderer: 'svg',
        autoplay: false,
      },
      popping: false,
    }
  },
  watch: {
    pauseBubbles: function (pausedCount) {
      if (this.bodyMover) {
        if (pausedCount > 0 && this.popping === false) {
          this.bodyMover.pause()
        } else {
          this.bodyMover.play()
        }
      }
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
      dataLayer.push({'event': 'Play Now Games Bubble'});
      this.bodyMover.destroy()
      this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
        container: this.$el,
        animationData: pop,
        loop: false,
      }));
      this.bodyMover.onComplete = () => {
        window.location = '/games'
      }
      this.popping = true
    }
  }
}
</script>

<style lang="scss">
@import '~styles/helpers';

.playNowBubble {
  width: 81%;
  position: absolute;
  top: -38%;
  right: 0%;
  z-index: $zPlayNowBubble;
  pointer-events: none;
  transform: translate(-25%, 80%);

  @media (orientation: landscape) {
    right: -14%;
    width: 68%;
    top: -33%;
  }

  .phase3 & {
    transform: rotate(3deg);
    transition: transform 1s $ease-out-back;
  }

  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  svg {
    position: absolute;
    top: 0;
  }

  .hitbox {
    position: absolute;
    top: 15%;
    left: 15%;
    width: 70%;
    border-radius: 50%;
    height: 70%;
    z-index: 1;
    pointer-events: all;
    cursor: pointer;
    opacity: 0;
  }
}
</style>
