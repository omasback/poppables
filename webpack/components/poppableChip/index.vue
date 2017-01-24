<template>
  <div
    class="poppableChip"
    :class="{paused: paused}"
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
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import bodyMoverMixin from 'util/bodyMoverMixin'

import chip_1_inactive    from './chip_1_inactive.json'
import chip_1_hover_in    from './chip_1_hover_in.json'
import chip_1_hover_loop  from './chip_1_hover_loop.json'
import chip_1_hover_out   from './chip_1_hover_out.json'
import chip_1_explode     from './chip_1_explode.json'
import chip_1_shadow_inactive    from './chip_1_shadow_inactive.json'
import chip_1_shadow_hover_in    from './chip_1_shadow_hover_in.json'
import chip_1_shadow_hover_loop  from './chip_1_shadow_hover_loop.json'
import chip_1_shadow_hover_out   from './chip_1_shadow_hover_out.json'

import chip_2_inactive    from './chip_2_inactive.json'
import chip_2_hover_in    from './chip_2_hover_in.json'
import chip_2_hover_loop  from './chip_2_hover_loop.json'
import chip_2_hover_out   from './chip_2_hover_out.json'
import chip_2_explode     from './chip_2_explode.json'
import chip_2_shadow_inactive    from './chip_2_shadow_inactive.json'
import chip_2_shadow_hover_in    from './chip_2_shadow_hover_in.json'
import chip_2_shadow_hover_loop  from './chip_2_shadow_hover_loop.json'
import chip_2_shadow_hover_out   from './chip_2_shadow_hover_out.json'

[
  chip_1_inactive,
  chip_1_hover_in,
  chip_1_hover_loop,
  chip_1_hover_out
].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./chip_1', false, /^\.\//))
});

[
  chip_1_shadow_inactive,
  chip_1_shadow_hover_in,
  chip_1_shadow_hover_loop,
  chip_1_shadow_hover_out
].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./chip_1_shadow', false, /^\.\//))
});

bodyMoverMixin.packAssets(chip_1_explode, require.context('./chip_1_explode', false, /^\.\//));

[
  chip_2_inactive,
  chip_2_hover_in,
  chip_2_hover_loop,
  chip_2_hover_out
].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./chip_2', false, /^\.\//))
});

[
  chip_2_shadow_inactive,
  chip_2_shadow_hover_in,
  chip_2_shadow_hover_loop,
  chip_2_shadow_hover_out
].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./chip_2_shadow', false, /^\.\//))
});

bodyMoverMixin.packAssets(chip_2_explode, require.context('./chip_2_explode', false, /^\.\//));

const chip1 = {
  inactive: chip_1_inactive,
  hover_in: chip_1_hover_in,
  hover_loop: chip_1_hover_loop,
  hover_out: chip_1_hover_out,
  shadow_inactive: chip_1_shadow_inactive,
  shadow_hover_in: chip_1_shadow_hover_in,
  shadow_hover_loop: chip_1_shadow_hover_loop,
  shadow_hover_out: chip_1_shadow_hover_out,
  explode: chip_1_explode
}

const chip2 = {
  inactive: chip_2_inactive,
  hover_in: chip_2_hover_in,
  hover_loop: chip_2_hover_loop,
  hover_out: chip_2_hover_out,
  shadow_inactive: chip_2_shadow_inactive,
  shadow_hover_in: chip_2_shadow_hover_in,
  shadow_hover_loop: chip_2_shadow_hover_loop,
  shadow_hover_out: chip_2_shadow_hover_out,
  explode: chip_2_explode
}

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
      v: Math.round(Math.random()) ? chip1 : chip2,
      paused: false,
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
    this.chip.newBm({ animationData: this.v.inactive })
    this.shadow.newBm({ animationData: this.v.shadow_inactive })
  },
  methods: {
    onMouseenter: function(e) {
      if (this.paused === true) {
        return;
      }
      this.paused = true
      this.chip.newBm({ animationData: this.v.hover_in })
      this.chip.cueBm({ animationData: this.v.hover_loop })
      this.shadow.newBm({ animationData: this.v.shadow_hover_in })
      this.shadow.cueBm({ animationData: this.v.shadow_hover_loop })
    },
    onMouseleave: function(e) {
      if (this.paused === false) {
        return;
      }
      this.paused = false
      this.chip.newBm({ animationData: this.v.hover_out })
      this.chip.cueBm({ animationData: this.v.inactive })
      this.shadow.newBm({ animationData: this.v.shadow_hover_out })
      this.shadow.cueBm({ animationData: this.v.shadow_inactive })
    }
  }
}

</script>

<style lang="scss" scoped>
@import '../../styles/globals';

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
    z-index: 1000;

    > * {
      animation-play-state: paused;

      > * {
        animation-play-state: paused;
      }
    }
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
  width: 50%;
  position: absolute;
  bottom: 0;
  left: 25%;
  pointer-events: none;

  &:nth-of-type(1) {
    @include animate(1, 90, 60);
  }
  &:nth-of-type(2) {
    @include animate(2, 70, 10);
  }
  &:nth-of-type(3) {
    @include animate(3, 50, 90);
  }
  &:nth-of-type(4) {
    @include animate(4, 10, 30);
  }
  &:nth-of-type(5) {
    @include animate(5, 30, 75);
  }
  &:nth-of-type(6) {
    @include animate(6, 60, 40);
  }
  &:nth-of-type(7) {
    @include animate(7, 30, 20);
  }
  &:nth-of-type(8) {
    @include animate(8, 50, 80);
  }
  &:nth-of-type(9) {
    @include animate(9, 30, 20);
  }
  &:nth-of-type(10) {
    @include animate(10, 60, 70);
  }
}

.shadow {
  position: relative;
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
  // background-color: rgba(0, 255, 0, 0.5);
}

</style>
