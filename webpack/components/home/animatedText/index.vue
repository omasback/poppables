<template>
  <div class="animatedText">
    <div class="animatedTextInner">
      <div class="crispy"></div>
      <div class="crunchy"></div>
    </div>
  </div>
</template>

<script>
import bodymovin from 'bodymovin';

import crispy from './crispy.json';
import crunchy from './crunchy.json';

export default {
  data() {
    return {
      timeout: null
    }
  },
  mounted() {
    this.crispy = bodymovin.loadAnimation({
      container: this.$el.querySelector('.crispy'),
      renderer: 'svg',
      autoplay: false,
      loop: false,
      animationData: crispy,
    });
    this.crunchy = bodymovin.loadAnimation({
      container: this.$el.querySelector('.crunchy'),
      renderer: 'svg',
      autoplay: false,
      loop: false,
      animationData: crunchy,
    });
    let i = 0;
    const animateText = () => {
      i++;
      this.$el.style.top = `${Math.random() * 80}%`
      this.$el.style.left = `${Math.random() * 100}%`
      this.$el.style.animationName = 'none'
      this.$el.offsetTop
      this.$el.style.animationName = 'animateTextDrift'
      this.$el
      if (i % 2) {
        this.crispy.goToAndPlay(0, true)
      } else {
        this.crunchy.goToAndPlay(0, true)
      }

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

  .animatedTextInner {
    width: 100%;
    padding-top: 100%;

    > * {
      position: absolute;
      top: 0;
      transform: translate3d(-50%, -50%, 0)
    }
  }
}
</style>
