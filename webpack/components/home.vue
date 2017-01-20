<template>
  <div
    class="home"
    :class="phase"
    :style="wrapperStyle"
  >
    <div class="headline">
      <h1>Pop into a FREE bag of Lay's Poppables!</h1>
      <h2>Start by playing these poppin' games</h2>
    </div>
    <div class="redBubblesHome" ref="redBubblesHome">
      <redBubble/>
      <redBubble/>
    </div>
    <div class="chipsHome" ref="chipsHome">
      <poppableChip v-for="n in 10" ref="n"/>
    </div>
    <img
      class="orangeBag"
      :srcset="getOrangeSrcSet()"
      sizes="55vw, (orientation: landscape) 23vw"
      v-on:load="onImgLoad"
    />
    <img
      class="blueBag"
      :srcset="getBlueSrcSet()"
      sizes="55vw, (orientation: landscape) 23vw"
      v-on:load="onImgLoad"
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
      phase: 'phase0',
      showBubbles: false,
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
      imgCount: 3, // one extra for window.onload
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
    },
    onImgLoad() {
      this.imgCount -= 1
      if (this.imgCount <= 0) {
        window.setTimeout(() => {
          this.phase = 'phase1'
          console.log('imagesLoaded')
        }, 1000)
      }
    },
  },
  created: function() {
    if (document.readyState === 'complete') {
      this.onImgLoad()
    } else {
      window.addEventListener('load', () => {
        this.onImgLoad()
      })
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
}

.headline {
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #1ac5cd;
  z-index: 0;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255, 255, 255, 0.6);

  h1 {
    margin: 0;
    font-size: 19px;
    line-height: 1.6;

    @include desktop {
      font-size: 35px;
    }
  }

  h2 {
    margin: 0;
    font-size: 13px;
    line-height: 1.7;

    @include desktop {
      font-size: 28px;
    }
  }
}

.redBubblesHome {
  opacity: 0;

  .phase1 & {
    opacity: 1;
    transition: opacity 0.3s 1s;
  }
}

.chipsHome {
  position: absolute;
  left: 10%;
  bottom: 0;
  width: 80%;
  opacity: 0;

  @media (orientation: landscape) {
    width: 34%;
    left: 33%;
  }

  .phase1 & {
    opacity: 1;
    transition: opacity 0.3s 1s;
  }

  &:after {
    content: '';
    display: block;
    padding-top: 50%;
    background-color: #82eff5;
    position: relative;
  }
}

@mixin bag {
  width: 55%;
  position: absolute;
  top: 0;

  .phase0 & {
    transform: translateY(-100%);
  }

  .phase1 & {
    transition: all 0.6s $ease-out-quart;
  }
}

.orangeBag {
  @include bag;

  right: 38%;

  @media (orientation: landscape) {
    width: 23%;
    right: 45%;
  }

  .phase1 & {
    transform: translateY(100vh) rotate(-6deg) translateY(-56%);
    transition-delay: 0.1s;

    &:hover {
      transform: translateY(100vh) rotate(-6deg) translateY(-83%);
    }
  }
}

.blueBag {
  @include bag;

  left: 42%;

  @media (orientation: landscape) {
    width: 23%;
    left: 46%;
  }

  .phase1 & {
    transform: translateY(100vh) rotate(6deg) translateY(-56%);

    &:hover {
      transform: translateY(100vh) rotate(6deg) translateY(-83%);
    }
  }
}
</style>
