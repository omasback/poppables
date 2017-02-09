<template>
  <div
    class="poppableChip"
    :class="{ paused, exploding, reset }"
  >
    <div>
      <div>
        <div class="shadow"></div>
        <div class="chip">
          <div class="chipVisual"></div>
          <div
            class="chipHitbox"
            v-on:mouseenter="onMouseenter"
            v-on:mouseleave="onMouseleave"
            v-on:click="onClick"
            v-on:touchstart="onClick"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import bodyMoverMixin from 'util/bodyMoverMixin'

import chip_inactive    from './chip_inactive.json'
import chip_hover_in    from './chip_hover_in.json'
import chip_hover_loop  from './chip_hover_loop.json'
import chip_hover_out   from './chip_hover_out.json'
import chip_explode     from './chip_explode.json'
import shadow_inactive    from './shadow_inactive.json'
import shadow_hover_in    from './shadow_hover_in.json'
import shadow_hover_loop  from './shadow_hover_loop.json'
import shadow_hover_out   from './shadow_hover_out.json'

[
  chip_inactive,
  chip_hover_in,
  chip_hover_loop,
  chip_hover_out,
  chip_explode
].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./chip', false, /^\.\//))
});

[
  shadow_inactive,
  shadow_hover_in,
  shadow_hover_loop,
  shadow_hover_out
].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./shadow', false, /^\.\//))
});

class Mover {
  constructor(opts) {
    this.el = opts.el
    this.defaultOpts = opts.defaultOpts
    this.bm = null
  }

  newBm = (opts) => {
    if (this.bm) {
      this.bm.destroy()
    }
    this.bm = bodymovin.loadAnimation(Object.assign(this.defaultOpts, opts));
  }
  cueBm = (opts) => {
    if (this.bm) {
      this.bm.onComplete = () => {
        this.newBm(opts)
      }
    } else {
      this.newBm(opts)
    }
  }
}

export default {
  data: function() {
    return {
      bmOpts: {
        autoplay: true,
      },
      paused: false,
      exploding: false,
      reset: false,
    };
  },
  mounted: function() {
    this.chip = new Mover({
      defaultOpts: {
        container: this.$el.querySelector('.chipVisual'),
        loop: false,
      }
    })
    this.shadow = new Mover({
      defaultOpts: {
        container: this.$el.querySelector('.shadow'),
        loop: false,
      }
    })
    this.chip.newBm({ animationData: chip_inactive })
    this.shadow.newBm({ animationData: shadow_inactive })
  },
  methods: {
    onMouseenter: function() {
      if (this.paused === true) {
        return;
      }
      this.paused = true
      this.chip.newBm({ animationData: chip_hover_in, loop: false })
      this.chip.cueBm({ animationData: chip_hover_loop, loop: true })
      this.shadow.newBm({ animationData: shadow_hover_in, loop: false })
      this.shadow.cueBm({ animationData: shadow_hover_loop, loop: true })
    },
    onMouseleave: function() {
      if (this.paused === false || this.exploding === true) {
        return;
      }
      this.paused = false
      this.chip.newBm({ animationData: chip_hover_out, loop: false })
      this.chip.cueBm({ animationData: chip_inactive })
      this.shadow.newBm({ animationData: shadow_hover_out, loop: false })
      this.shadow.cueBm({ animationData: shadow_inactive })
    },
    onClick: function(e) {
      this.exploding = true
      this.chip.newBm({ animationData: chip_explode, loop: false })
      this.shadow.bm.destroy()
      this.chip.bm.onComplete = () => {
        this.reset = true
        this.exploding = false
        this.paused = false

        window.setTimeout(() => {
          this.reset = false
          this.chip.newBm({ animationData: chip_inactive })
          this.shadow.newBm({ animationData: shadow_inactive })
        }, 100)
      }
    },
  }
}

</script>

<style lang="scss" scoped>
@import '~styles/helpers';

@mixin animate($i, $fromX, $toX) {
  $duration: 15;
  $fromXMultiplier: 1.5;

  animation-duration: #{$duration}s;
  animation-delay: #{($i - 1) * $duration / 10}s;
  animation-name: chip#{$i};
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  &.paused {
    animation-play-state: paused;
    z-index: 1;

    > * {
      animation-play-state: paused;

      > * {
        animation-play-state: paused;

        > * {
          animation-play-state: paused;
        }
      }
    }
  }

  &.reset {
    animation-name: none;
    animation-play-state: running;
  }

  > * {
    animation-duration: #{random(3) + 3}s;
    animation-direction: alternate;
    animation-name: xWiggle#{$i};
    animation-timing-function: $ease-in-out-quad;
    animation-iteration-count: infinite;

    > * {
      animation-duration: #{random(3) + 3}s;
      animation-direction: alternate;
      animation-name: yWiggle#{$i};
      animation-timing-function: $ease-in-out-quad;
      animation-iteration-count: infinite;

      > * {
        animation-duration: #{random(5) + 10}s;
        @if ($i % 2 == 1) {
          animation-direction: forward;
        } @else {
          animation-direction: reverse;
        }
        animation-name: spin#{$i};
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }
    }
  }

  @keyframes chip#{$i} {
    from {
      transform: translate(#{($fromX - 50%) * $fromXMultiplier}, 0);
    }

    to {
      transform: translate(#{$toX - 50}vw, -100vh);
    }
  }

  @keyframes xWiggle#{$i} {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(#{random(60) - 30%});
    }
  }

  @keyframes yWiggle#{$i} {
    from {
      transform: translateY(0);
    }

    to {
      transform: translateY(#{random(60) - 30%});
    }
  }

  @keyframes spin#{$i} {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
}

.poppableChip {
  width: 35%;
  max-width: 250px;
  position: absolute;
  bottom: 0;
  left: 25%;
  pointer-events: none;

  &:nth-of-type(1) {
    @include animate(1, 90, 60);
  }
  &:nth-of-type(2) {
    @include animate(2, 50, 10);
  }
  &:nth-of-type(3) {
    @include animate(3, 70, 90);
  }
  &:nth-of-type(4) {
    @include animate(4, 10, 30);
  }
  &:nth-of-type(5) {
    @include animate(5, 0, 75);
  }
  &:nth-of-type(6) {
    @include animate(6, 90, 40);
  }
  &:nth-of-type(7) {
    @include animate(8, 70, 80);
  }
  &:nth-of-type(8) {
    @include animate(9, 30, 20);
  }
  &:nth-of-type(9) {
    @include animate(10, 60, 70);
  }
  &:nth-of-type(10) {
    @include animate(7, 30, 20);
  }

  > * {
    padding-top: 100%;

    > * {
      @include fillContainer;
    }
  }
}

.shadow {
  position: absolute;
  top: 5vw;
  left: 0;

  @media (orientation: landscape) {
    top: 2.5vw;
  }
}

.chip {
  position: absolute;
  top: 0;
  left: 0;
}

.chipHitbox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
  border-radius: 50%;
  pointer-events: all;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  .exploding & {
    pointer-events: none;
  }
}

</style>
