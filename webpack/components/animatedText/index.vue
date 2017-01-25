<template>
  <div class="animatedText">
    <div class="crispy"></div>
    <div class="crunchy"></div>
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
      this.$el.style.top = `${Math.random() * 40}%`
      this.$el.style.left = `${Math.random() * 100}%`
      this.$el.style.transform = `translate3d(-50%, -50%, 0) rotate(${Math.random() * 80 - 40}deg)`
      if (i % 2) {
        this.crispy.goToAndPlay(0, true)
      } else {
        this.crunchy.goToAndPlay(0, true)
      }

      this.timeout = window.setTimeout(animateText, Math.random() * 5000 + 5000)
    }
    animateText()
  },
  beforeDestroy() {
    window.clearTimeout(this.timeout)
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/globals';

.animatedText {
  width: 40%;
  position: absolute;

  @media (orientation: landscape) {
    width: 20%;
  }

  > div {
    position: absolute;
  }
}
</style>
