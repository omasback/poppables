<template>
  <div class="poppableChip">
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
        autoplay: false,
        animationData,
      },
    }
  },
}

</script>

<style lang="scss" scoped>

@mixin animate($i, $fromX, $toX, $rotate) {
  $duration: 30;
  $fromXMultiplier: 1.5;

  animation-duration: #{$duration}s;
  animation-delay: #{($i - 1) * $duration / 10}s;
  animation-name: chip#{$i};
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  @keyframes chip#{$i} {
    from {
      transform: translate(#{($fromX - 50%) * $fromXMultiplier}, 0) rotate(#{$rotate}deg);
    }

    to {
      transform: translate(#{$toX - 50}vw, -100vh) rotate(#{$rotate}deg);
    }
  }
}

.poppableChip {
  width: 50%;
  position: absolute;
  bottom: 0;
  left: 25%;

  &:nth-of-type(1) {
    @include animate(1, 90, 60, 30);
  }
  &:nth-of-type(2) {
    @include animate(2, 70, 10, -60);
  }
  &:nth-of-type(3) {
    @include animate(3, 50, 90, 0);
  }
  &:nth-of-type(4) {
    @include animate(4, 10, 30, -30);
  }
  &:nth-of-type(5) {
    @include animate(5, 30, 75, 60);
  }
  &:nth-of-type(6) {
    @include animate(6, 60, 40, 0);
  }
  &:nth-of-type(7) {
    @include animate(7, 30, 20, 30);
  }
  &:nth-of-type(8) {
    @include animate(8, 50, 80, -30);
  }
  &:nth-of-type(9) {
    @include animate(9, 30, 20, -60);
  }
  &:nth-of-type(10) {
    @include animate(10, 60, 70, 0);
  }
}

</style>
