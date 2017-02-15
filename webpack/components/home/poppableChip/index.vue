<template>
  <div
    class="poppableChip"
    :class="{ paused, exploding, reset }"
  >
    <div>
      <div>
        <div class="shadow">
          <div class="inactive">
          </div>
        </div>
        <div class="chip">
          <div class="chipVisual">
            <div class="inactive"></div>
          </div>
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

const anims = {
  chip_hover_in,
  chip_hover_loop,
  chip_hover_out,
  chip_explode,
  shadow_hover_in,
  shadow_hover_loop,
  shadow_hover_out
}

// Having one set of shared hover and explode animations prevents having to load
// a fresh animation on each hover and click, which badly janks the framerate
// And it prevents each chip having to have its own hover/explode states, which
// bloats the DOM node count
Object.keys(anims).forEach(anim => {
  anims[anim] = bodymovin.loadAnimation({
    container: document.createElement('div'),
    animationData: anims[anim],
    autoplay: false,
    loop: (anim === 'chip_hover_loop' || anim === 'shadow_hover_loop'),
  })
})

class Mover {
  constructor(opts) {
    this.el = opts.el
    this.inactive = this.current = bodymovin.loadAnimation({
      container: this.el.querySelector('.inactive'),
      animationData: opts.animationData,
      autoplay: false,
      loop: false,
    })
  }
  play = (anim) => {
    this.kill()
    if (anim === 'inactive') {
      anim = this.inactive
    }
    this.el.appendChild(anim.wrapper)
    anim.play()
    this.current = anim
  }
  cue = (anim) => {
    if (this.current) {
      this.current.onComplete = () => {
        this.play(anim)
      }
    } else {
      this.play(anim)
    }
  }
  kill = () => {
    if (this.current) {
      this.current.stop()
      if (this.current.wrapper.parentElement === this.el) {
        this.el.removeChild(this.current.wrapper)
      }
      this.current = null
    }
  }
}

export default {
  data: function() {
    return {
      paused: false,
      exploding: false,
      reset: false,
    };
  },
  mounted: function() {
    this.chip = new Mover({
      el: this.$el.querySelector('.chipVisual'),
      animationData: chip_inactive,

    })
    this.shadow = new Mover({
      el: this.$el.querySelector('.shadow'),
      animationData: shadow_inactive,
    })
  },
  methods: {
    onMouseenter: function() {
      if (this.paused === true) {
        return;
      }
      this.paused = true
      this.chip.play(anims.chip_hover_in)
      this.chip.cue(anims.chip_hover_loop)
      this.shadow.play(anims.shadow_hover_in)
      this.shadow.cue(anims.shadow_hover_loop)
    },
    onMouseleave: function() {
      if (this.paused === false || this.exploding === true) {
        return;
      }
      this.paused = false
      this.chip.play(anims.chip_hover_out)
      this.chip.cue('inactive')
      this.shadow.play(anims.shadow_hover_out)
      this.shadow.cue('inactive')
    },
    onClick: function() {
      this.exploding = true
      this.chip.play(anims.chip_explode)
      this.shadow.kill()
      this.chip.current.onComplete = () => {
        this.reset = true
        this.exploding = false
        this.paused = false

        window.setTimeout(() => {
          this.reset = false
          this.chip.play('inactive')
          this.shadow.play('inactive')
        }, 100)
      }
    },
  }
}

</script>

<style lang="scss">
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
      transform: translate(#{$fromX + 0%}, 0);
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
  top: 0;
  left: 0;
  pointer-events: none;

  &:nth-of-type(1) {
    @include animate(1, 175, 60);
  }
  &:nth-of-type(2) {
    @include animate(2, 15, 10);
  }
  &:nth-of-type(3) {
    @include animate(3, 175, 90);
  }
  &:nth-of-type(4) {
    @include animate(4, 15, 30);
  }
  &:nth-of-type(5) {
    @include animate(6, 200, 40);
  }
  &:nth-of-type(6) {
    @include animate(5, 0, 75);
  }
  &:nth-of-type(7) {
    @include animate(8, 175, 80);
  }
  &:nth-of-type(8) {
    @include animate(9, 15, 20);
  }
  &:nth-of-type(9) {
    @include animate(10, 175, 70);
  }
  &:nth-of-type(10) {
    @include animate(7, 15, 20);
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
  width: 100%;

  @media (orientation: landscape) {
    top: 2.5vw;
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
}

.chip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.chipVisual {
  &:after {
    content: '';
    display: block;
    padding-top: 100%;
  }

  svg {
    position: absolute;
    top: 0;
  }
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

  .exploding & {
    pointer-events: none;
  }
}

</style>
