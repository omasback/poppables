<template>
  <div class="animatedText">
    <canvas width="384" height="256"></canvas>
  </div>
</template>

<script>
import SpriteAnim from 'sprite-anim'

import bitesized from './bitesized_32_384x256.png';
import crispy from './crispy_26_256x256.png';
import crunchy from './crunchy_29_256x256.png';
import delicious from './delicious_32_384x256.png';
import mmmmm from './mmmmm_32_256x256.png';

const sprites = [
  bitesized,
  crispy,
  crunchy,
  delicious,
  mmmmm,
]

export default {
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    const getScaleFactor = () => { return this.$el.parentElement.offsetWidth * 0.35 / 256; }
    const canvas = this.$el.querySelector('canvas')

    sprites.forEach((src, i) => {

      this.scaleTransform = `scale(${getScaleFactor()})`

      const initSprite = (e) => {
        const renderer = new SpriteAnim.CanvasRenderer(canvas, e.target)
        const parser = new SpriteAnim.SimpleParser(e.target, { width: parseInt(src.slice(-11, -8)), height: parseInt(src.slice(-7, -4)) })
        const anim = new SpriteAnim(parser, renderer, {
          frameRate: 30,
          loop: false,
        })

        anim.middleFrame = parseInt(src.slice(-14, -12))

        anim.on('enterFrame', () => {
          if (anim.currentFrame === anim.middleFrame) {
            anim.pause()
            window.setTimeout(() => {
              anim.play()
            }, 1000)
          }
        })

        sprites[i] = anim
      }

      const img = new Image()
      img.addEventListener('load', initSprite)
      img.src = src
    })

    let i = 0;
    const animateText = () => {
      const index = i % sprites.length
      const sprite = sprites[index]

      if (typeof sprite === 'object') {
        this.$el.style.top = `${Math.random() * 40 + 20}%`
        this.$el.style.left = `${Math.random() * 60 + 20}%`
        this.$el.style.animationName = 'none'
        const w = this.$el.offsetWidth
        const scale = Math.min((w / 384), 1)
        canvas.style.transform = `translate(-50%, -50%) scale(${scale})`
        this.$el.style.animationName = 'animateTextDrift'
        sprite.gotoAndPlay(0)
      }

      i++;
      this.timeout = window.setTimeout(animateText, 10000)
    }
    window.setTimeout(animateText, 5000)
  },
  beforeDestroy() {
    window.clearTimeout(this.timeout)
  },
}
</script>

<style lang="scss" scoped>
@import '~styles/helpers';

@keyframes animateTextDrift {
  from {
    transform: translate(0, 0) rotate(-20deg);
  }

  to {
    transform: translateY(-200%) rotate(40deg);
  }
}

.animatedText {
  width: 40%;
  position: absolute;
  animation-duration: 8s;
  animation-timing-function: linear;
  animation-name: animateTextDrift;

  @media (orientation: landscape) {
    width: 20%;
  }
}
</style>
