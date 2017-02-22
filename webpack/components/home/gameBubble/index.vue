<template>
  <div
    class="gameBubble"
    v-on:animationiteration="onAnimationiteration"
  >
    <div class="scale" :style="{ transform: scaleTransform }">
      <div>
        <div
          class="bodymover"
          v-on:click="onClick"
          :style="{ backgroundImage: backgroundImage }"
        ></div>
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

const popFallback = `url(${popFallbackSrc})`
const connectFallback = `url(${connectFallbackSrc})`

const connectLoop = JSON.parse(JSON.stringify(popLoop));
const connectClick = JSON.parse(JSON.stringify(popClick));

[popLoop, popClick].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./pop', false, /^\.\//))
});

[connectLoop, connectClick].forEach((anim) => {
  bodyMoverMixin.packAssets(anim, require.context('./connect', false, /^\.\//))
});

export default {
  data: function() {
    return {
      bmOptions: {
        renderer: 'svg',
      },
      game: 'pop',
      scaleTransform: 'scale(1)',
      isWindows8orLower: navigator.userAgent.indexOf('NT 6') > -1 && navigator.userAgent.indexOf('Trident') > -1
    }
  },
  computed: {
    backgroundImage: function() {
      if (this.isWindows8orLower) {
        return this.game === 'pop' ? popFallback : connectFallback
      } else {
        return ''
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
        autoplay: true,
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
      const url = this.game === 'pop' ? '/games/pops' : '/games/dots'
      if (this.isWindows8orLower) {
        window.location = url
      } else {
        this.bodyMover.destroy()
        this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
          container: this.bodyContainer,
          animationData: this.game === 'pop' ? popClick : connectClick,
          loop: false,
        }));
        this.bodyMover.onComplete = () => {
          window.location = url
        }
      }
    },
    onAnimationiteration: function(e) {
      if (e.target === this.$el) {
        this.game = this.game === 'pop' ? 'dots' : 'pop'
        if (!this.isWindows8orLower) {
          this.bodyMover.destroy()
          this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
            container: this.bodyContainer,
            animationData: this.game === 'pop' ? popLoop : connectLoop,
            loop: true,
            autoplay: true,
          }));
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
}
</style>
