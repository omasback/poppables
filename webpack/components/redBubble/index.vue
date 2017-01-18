<template>
  <div class="redBubble" v-on:click="onClick">
    <div>
      <div class="bodymover"></div>
    </div>
  </div>
</template>

<script>
import bodyMoverMixin from 'util/bodyMoverMixin';
import animationData from './data.json';

bodyMoverMixin.packAssets(animationData, require.context('./images', false, /^\.\//));

export default {
  mixins: [bodyMoverMixin],
  data: function() {
    return {
      bmOptions: {
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData,
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

  @keyframes redBubble#{$i} {
    from {
      transform: translate(0, 0);
    }

    to {
      transform: translate(0, calc(-100% - 100vh));
    }
  }

  @keyframes redBubbleWiggleX#{$i} {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(#{random(60) - 30%});
    }
  }

  @keyframes redBubbleWiggleY#{$i} {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(#{random(60) - 30%});
    }
  }
}

.redBubble {
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
