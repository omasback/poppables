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
      this.popping = true
      dataLayer.push({'event': 'Learn More Bubble'});
      this.bodyMover.destroy()
      this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
        container: this.$el,
        animationData: pop,
        loop: false,
        autoplay: true,
      }));
      this.bodyMover.onComplete = () => {
        window.location = '/about'
      }
    }
  }
}
</script>

<style lang="scss">
@import '~styles/helpers';

.playNowBubble {
  width: 81%;
  position: absolute;
  top: -41%;
  right: -19%;
  z-index: $zPlayNowBubble;
  pointer-events: none;
  transform: translate(-25%, 80%);

  @media (orientation: landscape) {
    right: -14%;
    width: 68%;
    top: -33%;
  }

  .phase3 & {
    transform: rotate(-6deg);
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
    top: 10%;
    left: 10%;
    width: 80%;
    border-radius: 50%;
    height: 80%;
    z-index: 1;
    pointer-events: all;
    cursor: pointer;
    background: url('~./learnmore.png');
    background-position: 50% 40%;
    background-size: contain;
  }
}
</style>
