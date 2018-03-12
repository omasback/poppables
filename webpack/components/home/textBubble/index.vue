<template>
  <div
    class="textBubble"
    v-on:animationiteration="onAnimationiteration"
  >
    <div class="scale" :style="{ transform: scaleTransform }">
      <div>
        <div
          class="bodymover"
          :style="{ backgroundImage: backgroundImage }"
        >
        </div>
        <div
          class="text"
          :style="{ backgroundImage: textImage }"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import whiteLoop from './bubble_loop_white.json';
import orangeLoop from './bubble_loop_orange.json';
import redLoop from './bubble_loop_red.json';
import blueLoop from './bubble_loop_blue.json';

import whiteFallback from './fallbacks/white.png';
import orangeFallback from './fallbacks/orange.png';
import redFallback from './fallbacks/red.png';
import blueFallback from './fallbacks/blue.png';

import _28pieces from './texts/28pieces.png';
import bitesized from './texts/bitesized.png';
import crisssspy from './texts/crisssspy.png';
import crunchy from './texts/crunchy.png';
import lightandairy from './texts/lightandairy.png';
import mmmmmm from './texts/mmmmmm.png';

const whiteTexts = [
  `url(${bitesized})`,
  `url(${crunchy})`,
  `url(${lightandairy})`,
  `url(${mmmmmm})`,
]
whiteTexts.currentIndex = 0

const orangeTexts = [
  `url(${_28pieces})`,
  `url(${crisssspy})`,
]
orangeTexts.currentIndex = 0

const colors = [
  {
    loop: whiteLoop,
    fallback: `url(${whiteFallback})`,
    texts: orangeTexts
  },
  {
    loop: orangeLoop,
    fallback: `url(${orangeFallback})`,
    texts: whiteTexts,
  },
  {
    loop: redLoop,
    fallback: `url(${redFallback})`,
    texts: whiteTexts,
  },
  {
    loop: blueLoop,
    fallback: `url(${blueFallback})`,
    texts: whiteTexts,
  },
]

export default {
  props: ['pauseBubbles'],
  data: function() {
    return {
      bmOptions: {
        renderer: 'svg',
      },
      color: 0,
      scaleTransform: 'scale(1)',
      isWindows8orLower: navigator.userAgent.indexOf('NT 6') > -1 && navigator.userAgent.indexOf('Trident') > -1
    }
  },
  computed: {
    backgroundImage: function() {
      if (this.isWindows8orLower) {
        return colors[this.color].fallback
      } else {
        return ''
      }
    },
    textImage: function() {
      const texts = colors[this.color].texts
      return texts[texts.currentIndex]
    },
  },
  watch: {
    pauseBubbles: function (pauseBubbles) {
      if (this.bodyMover) {
        if (pauseBubbles > 1) {
          this.bodyMover.pause()
        } else {
          this.bodyMover.play()
        }
      }
    }
  },
  mounted: function() {
    if (!this.isWindows8orLower) {
      this.bodyContainer = this.$el.querySelector('.bodymover');
      this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
        container: this.bodyContainer,
        animationData: whiteLoop,
        loop: true,
        autoplay: false,
      }));
    }

    const getScaleFactor = () => {
      const ww = window.innerWidth
      const wh = window.innerHeight
      let p
      if (ww > wh) {
        p = .15
      } else {
        p = .45
      }

      return Math.min(p * ww / 256, 1);
    }

    this.scaleTransform = `scale(${getScaleFactor()})`

    let prevWidth = 0
    window.addEventListener('resize', () => {
      if (window.innerWidth !== prevWidth) {
        this.scaleTransform = `scale(${getScaleFactor()})`
        prevWidth = window.innerWidth
      }
    })
  },
  methods: {
    onAnimationiteration: function(e) {
      if (e.target === this.$el) {
        this.color = (this.color + 1) % 4
        const texts = colors[this.color].texts
        texts.currentIndex = (texts.currentIndex + 1) % texts.length
        if (!this.isWindows8orLower) {
          this.bodyMover.destroy()
          this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
            container: this.bodyContainer,
            animationData: colors[this.color].loop,
            loop: true,
            autoplay: false,
          }));
          if (this.pauseBubbles > 1) {
            this.bodyMover.goToAndStop(0)
          } else {
            this.bodyMover.play()
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import '~styles/helpers';

.textBubble {
  @include bubble;

  .bodymover {
    background-size: contain;

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

  .text {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    border-radius: 50%;
    height: 80%;
    z-index: 1;
    pointer-events: all;
    cursor: pointer;
    background-position: center center;
    background-size: contain;
  }
}
</style>
