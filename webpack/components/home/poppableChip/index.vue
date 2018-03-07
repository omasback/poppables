<template>
  <div
    class="poppableChip"
    :id="id"
    :class="{ paused, exploding, reset, slow }"
    v-on:animationiteration="onAnimationiteration"
  >
    <div class="scale" :style="{ transform: scaleTransform }">
      <div class="xWiggle">
        <div class="yWiggle">
          <div class="shadow"></div>
          <div class="chip">
            <div class="chipVisual"></div>
            <div
              class="chipHitbox"
              v-on:mouseenter="onMouseenter"
              v-on:mouseleave="onMouseleave"
              v-on:mousedown="onClick"
              v-on:touchstart="onClick"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SpriteAnim from 'sprite-anim'

import chip_sprite from './chip_sprite_256.png'
import chip_sprite_bbq from './chip_sprite_bbq_256.png'
import shadow_sprite from './shadow_sprite_256.png'

const chipSpriteImg = new Image()
chipSpriteImg.src = chip_sprite

const chipSpriteBbqImg = new Image()
chipSpriteBbqImg.src = chip_sprite_bbq

const shadowSpriteImg = new Image()
shadowSpriteImg.src = shadow_sprite

export default {
  props: ['id', 'honeybbq'],
  data: function() {
    return {
      paused: false,
      exploding: false,
      reset: false,
      slow: false,
      scaleTransform: 'scale(1)',
    };
  },
  mounted: function() {
    console.log(this)

    const getScaleFactor = () => { return this.$el.parentElement.offsetWidth * 0.35 / 256; }

    this.scaleTransform = `scale(${getScaleFactor()})`

    const initChipSprite = () => {
      const renderer = new SpriteAnim.DOMRenderer(this.$el.querySelector('.chipVisual'), {
        scaleFactor: 1,
        sprite: this.honeybbq ? chipSpriteBbqImg : chipSpriteImg
      });
      const parser = new SpriteAnim.SimpleParser(chipSpriteImg, {width: 256, height: 256});
      this.chip = new SpriteAnim(parser, renderer, {
        frameRate: 30,
        loop: false,
        numFrames: 67,
      });
      this.chip.on('enterFrame', () => {
        if (this.chip.currentFrame === 28) {
          this.chip.gotoAndPlay(14)
          this.shadow.gotoAndPlay(14)
        } else if (this.chip.currentFrame === 46) {
          this.chip.gotoAndStop(0)
          this.shadow.gotoAndStop(0)
        }
      })
      this.chip.on('complete', () => {
        this.reset = true
        this.exploding = false
        this.paused = false

        window.setTimeout(() => {
          this.reset = false
          this.chip.gotoAndStop(0)
          this.shadow.gotoAndStop(0)
        }, 100)
      })
    }

    if (chipSpriteImg.naturalWidth) {
      initChipSprite()
    } else {
      chipSpriteImg.addEventListener('load', initChipSprite)
    }

    const initShadowSprite = () => {
      const renderer = new SpriteAnim.DOMRenderer(this.$el.querySelector('.shadow'), {
        scaleFactor: 1,
        sprite: shadowSpriteImg
      });
      const parser = new SpriteAnim.SimpleParser(shadowSpriteImg, {width: 256, height: 256});
      this.shadow = new SpriteAnim(parser, renderer, {
        frameRate: 30,
        loop: false,
      });
      this.shadow.on('enterFrame', () => {
        if (this.shadow.currentFrame === 28) {
          this.shadow.gotoAndPlay(14)
        } else if (this.shadow.currentFrame === 46) {
          this.shadow.gotoAndStop(0)
        }
      })
    }

    if (shadowSpriteImg.naturalWidth) {
      initShadowSprite()
    } else {
      shadowSpriteImg.addEventListener('load', initShadowSprite)
    }

    let prevWidth = 0
    window.addEventListener('resize', () => {
      if (window.innerWidth !== prevWidth) {
        this.scaleTransform = `scale(${getScaleFactor()})`
        prevWidth = window.innerWidth
      }
    })
  },
  methods: {
    onMouseenter: function() {
      if (this.paused === true || this.exploding === true) {
        return;
      }
      this.paused = true
      this.chip.gotoAndPlay(1)
      this.shadow.gotoAndPlay(1)
    },
    onMouseleave: function() {
      if (this.paused === false || this.exploding === true) {
        return;
      }
      this.paused = false
      this.chip.gotoAndPlay(29)
      this.shadow.gotoAndPlay(29)
    },
    onClick: function() {
      if (this.exploding === true) {
        return;
      }
      this.exploding = true
      this.chip.gotoAndPlay(47)
      this.shadow.gotoAndPlay(47)
    },
    onAnimationiteration: function(e) {
      if (this.slow === true) {
        return
      }
      if (e.target === this.$el && this.slow === false) {
        this.reset = true
        this.slow = true

        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            this.reset = false
          })
        })
      }
    }
  }
}

</script>

<style lang="scss">
@import '~styles/helpers';

@mixin animate($i, $fromX, $toX, $order) {
  animation-duration: #{$order * 1.5}s;
  animation-timing-function: $ease-out-quad;
  animation-iteration-count: infinite;
  left: ($fromX * 0.5 + 0.1) + 0%;

  &.paused {
    animation-play-state: paused;
    z-index: 1;

    > * {
      animation-play-state: paused;

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
  }

  .phase0 & {
    animation-name: none;
  }

  .phase2 & {
    animation-name: chip#{$i};
  }

  &.reset {
    animation-name: none;
  }

  &.slow {
    animation-duration: 15s;
    animation-timing-function: linear;
  }

  // scale
  > * {
    transform-origin: 0 0;

    // wiggle X
    > * {
      animation-duration: #{random(2) + 2}s;
      animation-direction: alternate;
      animation-name: xWiggle#{$i};
      animation-timing-function: $ease-in-out-quad;
      animation-iteration-count: infinite;

      // wiggle Y
      > * {
        animation-duration: #{random(2) + 2}s;
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
  }

  @keyframes chip#{$i} {
    from {
      transform: translate(0, 0);
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
      // IE11 cannot handle yoyoing percentage transforms
      transform: translateX(#{random(150) - 75px});
    }
  }

  @keyframes yWiggle#{$i} {
    from {
      transform: translateY(0);
    }

    to {
      // IE11 cannot handle yoyoing percentage transforms
      transform: translateY(#{random(150) - 75px});
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
  width: 256px;
  height: 256px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;

  &#chip1 {
    @include animate(1, 5, 60, 3);
  }
  &#chip2 {
    @include animate(2, 30, 30, 7);
  }
  &#chip3 {
    @include animate(3, 60, 90, 1);
  }
  &#chip4 {
    @include animate(4, 40, 30, 5);
  }
  &#chip5 {
    @include animate(5, 70, 70, 6);
  }
  &#chip6 {
    @include animate(6, 100, 40, 1);
  }
  &#chip7 {
    @include animate(8, 0, 80, 8);
  }
  &#chip8 {
    @include animate(9, 50, 20, 2);
  }
  &#chip9 {
    @include animate(10, 100, 70, 4);
  }

  > * {
    @include fillContainer;

    > * {
      @include fillContainer;

      > * {
        @include fillContainer;
      }
    }
  }
}

.poppableChip .shadow {
  position: absolute;
  top: 3vw;
  left: 0;
  width: 100%;
  background-repeat: no-repeat;

  @media (orientation: landscape) {
    top: 1.5vw;
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

.poppableChip .chip {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.chipVisual {
  background-repeat: no-repeat;

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
  cursor: pointer;
}

</style>
