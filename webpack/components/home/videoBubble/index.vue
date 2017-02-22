<template>
  <div class="videoBubble">
    <div class="scale" :style="{ transform: scaleTransform }">
      <div>
        <div class="bodymover" v-on:click="onClick"></div>
      </div>
    </div>
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import bodyMoverMixin from 'util/bodyMoverMixin';
import loop from './loop.json';
import pop from './pop.json';

[loop, pop].forEach((anim) => {
  /*global require*/
  bodyMoverMixin.packAssets(anim, require.context('./images', false, /^\.\//));
})

export default {
  data: function() {
    return {
      bmOptions: {
        renderer: 'svg',
        autoplay: true,
      },
      scaleTransform: 'scale(1)',
    }
  },
  mounted: function() {
    this.bodyContainer = this.$el.querySelector('.bodymover');
    this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
      container: this.bodyContainer,
      animationData: loop,
      loop: true
    }));

    const getScaleFactor = () => {
      const ww = window.innerWidth
      const wh = window.innerHeight
      let p
      if (ww > wh) {
        p = .12
      } else {
        p = .3
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
      this.bodyMover.destroy()
      this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
        container: this.bodyContainer,
        animationData: pop,
        loop: false,
      }));
    }
  }
}
</script>

<style lang="scss">
@import '~styles/helpers';

.videoBubble {
  @include bubble;

  .bodymover {
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
