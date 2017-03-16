<template>
  <div
    class="gameBubble"
    v-on:animationiteration="onAnimationiteration"
  >
    <div class="scale" :style="{ transform: scaleTransform }">
      <div>
        <div
          class="bodymover"
          :style="{ backgroundImage: backgroundImage }"
        >
        </div>
        <div class="hitbox" v-on:click="onClick"></div>
      </div>
    </div>
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import bodyMoverMixin from 'util/bodyMoverMixin';
import popLoop from './loop.json';
import popClick from './pop.json';

import popFallbackSrc from './popFallback.png';
import connectFallbackSrc from './connectFallback.png';
import tossFallbackSrc from './tossFallback.png';

const popFallback = `url(${popFallbackSrc})`
const connectFallback = `url(${connectFallbackSrc})`

const connectLoop = JSON.parse(JSON.stringify(popLoop));
const connectClick = JSON.parse(JSON.stringify(popClick));

const tossLoop = JSON.parse(JSON.stringify(popLoop));
const tossClick = JSON.parse(JSON.stringify(popClick));

[popLoop, popClick].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./pop', false, /^\.\//))
});

[connectLoop, connectClick].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./connect', false, /^\.\//))
});

[tossLoop, tossClick].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./toss', false, /^\.\//))
});

const games = [
  {
    loop: popLoop,
    click: popClick,
    fallback: popFallbackSrc,
    path: '/games/pops',
  },
  {
    loop: connectLoop,
    click: connectClick,
    fallback: connectFallbackSrc,
    path: '/games/drop',
  },
  {
    loop: tossLoop,
    click: tossClick,
    fallback: tossFallbackSrc,
    path: '/games/toss',
  },
]

export default {
  props: ['pauseBubbles'],
  data: function() {
    return {
      bmOptions: {
        renderer: 'svg',
      },
      popping: false,
      game: 0,
      scaleTransform: 'scale(1)',
      isWindows8orLower: navigator.userAgent.indexOf('NT 6') > -1 && navigator.userAgent.indexOf('Trident') > -1
    }
  },
  computed: {
    backgroundImage: function() {
      if (this.isWindows8orLower) {
        return games[this.game].fallback
      } else {
        return ''
      }
    }
  },
  watch: {
    pauseBubbles: function (pauseBubbles) {
      if (this.bodyMover) {
        if (pauseBubbles > 1 && this.popping === false) {
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
        animationData: popLoop,
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

      return p * ww / 256;
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
    onClick: function() {
      this.popping = true

      const url = games[this.game].path

      if (url === '/games/pops') {
        dataLayer.push({'event': 'Play Pop the Poppables Bubble'});
      } else {
        dataLayer.push({'event': 'Play Pop and Drop Bubble'});
      }

      if (this.isWindows8orLower) {
        window.location = url
      } else {
        this.bodyMover.destroy()
        this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
          container: this.bodyContainer,
          animationData: games[this.game].click,
          loop: false,
          autoplay: true,
        }));
        this.bodyMover.onComplete = () => {
          window.location = url
        }
      }
    },
    onAnimationiteration: function(e) {
      if (e.target === this.$el) {
        this.game = (this.game + 1) % 3
        if (!this.isWindows8orLower) {
          this.bodyMover.destroy()
          this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
            container: this.bodyContainer,
            animationData: games[this.game].loop,
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

.gameBubble {
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

  .hitbox {
    position: absolute;
    top: 15%;
    left: 15%;
    width: 70%;
    border-radius: 50%;
    height: 70%;
    z-index: 1;
    pointer-events: all;
    cursor: pointer;
    opacity: 0;
  }
}
</style>
