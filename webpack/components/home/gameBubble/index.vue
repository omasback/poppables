<template>
  <div class="gameBubble" v-on:click="onClick">
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
  props: {
    game: String,
  },
  data: function() {
    return {
      bmOptions: {
        renderer: 'svg',
        autoplay: true,
      },
    }
  },
  mounted: function() {
    this.bodyContainer = this.$el.querySelector('.bodymover');
    this.bodyMover = bodymovin.loadAnimation(Object.assign(this.bmOptions, {
      container: this.bodyContainer,
      animationData: this.game === 'pop' ? popLoop : connectLoop,
      loop: true
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
