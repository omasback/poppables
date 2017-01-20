<template>
  <div class="videoBubble" v-on:click="onClick">
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
      loop: true
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

@mixin animate($i) {
  $duration: 25;

  animation-duration: #{$duration}s;
  animation-delay: #{($i - 1) * $duration / 2}s;
  animation-name: redBubble#{$i};
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  > * {
    animation-duration: #{random(3) + 3}s;
    animation-direction: alternate;
    animation-name: redBubbleWiggleX#{$i};
    animation-timing-function: $ease-in-out-quad;
    animation-iteration-count: infinite;

    > * {
      animation-duration: #{random(3) + 3}s;
      animation-direction: alternate;
      animation-name: redBubbleWiggleY#{$i};
      animation-timing-function: $ease-in-out-quad;
      animation-iteration-count: infinite;
    }
  }

  @keyframes videoBubble#{$i} {
    from {
      transform: translate(0, 0);
    }

    to {
      transform: translate(0, calc(-100% - 100vh));
    }
  }

  @keyframes videoBubbleWiggleX#{$i} {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(#{random(60) - 30%});
    }
  }

  @keyframes videoBubbleWiggleY#{$i} {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(#{random(60) - 30%});
    }
  }
}

.videoBubble {
  width: 50%;
  position: absolute;
  top: 100%;

  @media (orientation: landscape) {
    width: 18%;
  }

  &:nth-of-type(1) {
    @include animate(1);
    left: 5%;

    @media (orientation: landscape) {
      left: 15%;
    }
  }
  &:nth-of-type(2) {
    @include animate(2);
    right: 5%;

    @media (orientation: landscape) {
      right: 15%;
    }
  }
}
</style>
