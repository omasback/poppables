<template>
  <div
    class="gameBubble"
    v-on:click="onClick"
    v-on:animationiteration="onAnimationiteration"
  >
    <div>
      <div class="bodymover"></div>
    </div>
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import bodyMoverMixin from 'util/bodyMoverMixin';
import popLoop from './loop.json';
import popClick from './pop.json';

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
    }
  },
  mounted: function() {
    this.bodyContainer = this.$el.querySelector('.bodymover');
    this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
      container: this.bodyContainer,
      animationData: popLoop,
      loop: true,
      autoplay: true,
    }));
  },
  methods: {
    onClick: function() {
      this.bodyMover.destroy()
      this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
        container: this.bodyContainer,
        animationData: this.game === 'pop' ? popClick : connectClick,
        loop: false,
      }));
      this.bodyMover.onComplete = () => {
        const url = this.game === 'pop' ? '/games/pops' : '/games/dots'
        window.location = url
      }
    },
    onAnimationiteration: function(e) {
      if (e.target === this.$el) {
        this.game = this.game === 'pop' ? 'dots' : 'pop'
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
</script>

<style lang="scss" scoped>
@import '~styles/helpers';

.gameBubble {
  @include bubble;

  width: 45%;

  @media (orientation: landscape) {
    width: 15%;
  }
}
</style>
