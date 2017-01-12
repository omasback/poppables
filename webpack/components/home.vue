<template>
  <div class="home" :style="wrapperStyle">
    <redBubble/>
    <poppableChip/>
    <img
      class="orangeBag"
      :srcset="getOrangeSrcSet()"
      sizes="55vw, (orientation: landscape) 23%"
    />
    <img
      class="blueBag"
      :srcset="getBlueSrcSet()"
      sizes="55vw, (orientation: landscape) 23%"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

import redBubble from './redBubble/index.vue'
import poppableChip from './poppableChip/index.vue'
import bagOrange740 from '../images/bagOrange740.png'
import bagOrange370 from '../images/bagOrange370.png'
import bagOrange185 from '../images/bagOrange185.png'
import bagBlue740 from '../images/bagBlue740.png'
import bagBlue370 from '../images/bagBlue370.png'
import bagBlue185 from '../images/bagBlue185.png'


export default {
  data: () => {
    return {
      wrapperStyle: {
        height: `${window.innerHeight}px`,
      },
      srcs: {
        bagOrange740: bagOrange740,
        bagOrange370: bagOrange370,
        bagOrange185: bagOrange185,
        bagBlue740: bagBlue740,
        bagBlue370: bagBlue370,
        bagBlue185: bagBlue185,
      },
    };
  },
  components: {
    redBubble,
    poppableChip
  },
  methods: {
    getOrangeSrcSet() {
      return `${this.srcs.bagOrange185} 185w, ${this.srcs.bagOrange370} 370w, ${this.srcs.bagOrange740} 740w`
    },
    getBlueSrcSet() {
      return `${this.srcs.bagBlue185} 185w, ${this.srcs.bagBlue370} 370w, ${this.srcs.bagBlue740} 740w`
    }
  },
  mounted: function() {
    const setHeight = () => {
      this.wrapperStyle.height = `${window.innerHeight}px`
    }
    setHeight();
    window.addEventListener('resize', debounce(setHeight), 100)
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/globals';

.home {
  overflow: hidden;
  position: relative;
  // width: 100%;
  // bottom: 150px;
  // top: 0;

  @include desktop {
    // bottom: 50px;
  }
}

.orangeBag {
  width: 55%;
  position: absolute;
  bottom: 0;
  right: 47%;
  transform: rotate(-6deg) translateY(44%);

  @media (orientation: landscape) {
    width: 23%;
    right: 49%;
  }
}

.blueBag {
  width: 55%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: rotate(6deg) translateY(44%);

  @media (orientation: landscape) {
    width: 23%;
  }
}
</style>
