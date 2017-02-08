<template>
  <div
    class="homeContent"
    :class="phase"
    :style="wrapperStyle"
  >
    <div class="headline">
      <h1>Pop into a FREE bag of Lay's Poppables!</h1>
      <h2>Start by playing these poppin' games</h2>
    </div>
    <animatedText/>
    <div class="backBags" :class="{ hoverOrange, hoverBlue }">
      <img
        class="orangeBag"
        :srcset="getOrangeBackSrcSet()"
        sizes="55vw, (orientation: landscape) 23vw"
        v-on:load="onImgLoad"
      />
      <div class="blueBag">
        <playNowBubble/>
      </div>
      <img
        class="blueBag"
        :srcset="getBlueBackSrcSet()"
        sizes="55vw, (orientation: landscape) 23vw"
        v-on:load="onImgLoad"
      />
    </div>
    <div class="bubblesHome" ref="bubblesHome" v-if="showBodyMovers">
      <videoBubble/>
      <gameBubble game="pop"/>
      <gameBubble game="connect"/>
      <videoBubble/>
    </div>
    <div class="chipsHome" ref="chipsHome" v-if="showBodyMovers">
      <poppableChip v-for="n in 10" ref="n"/>
    </div>
    <div class="frontBags" :class="{ hoverOrange, hoverBlue }">
      <img
        class="blueBag"
        :srcset="getBlueSrcSet()"
        sizes="55vw, (orientation: landscape) 23vw"
        v-on:load="onImgLoad"
        v-on:mouseenter="onMouseenterBlue"
        v-on:mouseleave="onMouseleaveBlue"
      />
      <img
        class="orangeBag"
        :srcset="getOrangeSrcSet()"
        sizes="55vw, (orientation: landscape) 23vw"
        v-on:load="onImgLoad"
        v-on:mouseenter="onMouseenterOrange"
        v-on:mouseleave="onMouseleaveOrange"
      />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

import animatedText from './animatedText/index.vue'
import gameBubble from './gameBubble/index.vue'
import videoBubble from './videoBubble/index.vue'
import playNowBubble from './playNowBubble/index.vue'
import poppableChip from './poppableChip/index.vue'
import bagOrange740 from './images/bagOrange740.png'
import bagOrange370 from './images/bagOrange370.png'
import bagOrange185 from './images/bagOrange185.png'
import bagOrangeBack740 from './images/bagOrangeBack740.png'
import bagOrangeBack370 from './images/bagOrangeBack370.png'
import bagOrangeBack185 from './images/bagOrangeBack185.png'
import bagBlue740 from './images/bagBlue740.png'
import bagBlue370 from './images/bagBlue370.png'
import bagBlue185 from './images/bagBlue185.png'
import bagBlueBack740 from './images/bagBlueBack740.png'
import bagBlueBack370 from './images/bagBlueBack370.png'
import bagBlueBack185 from './images/bagBlueBack185.png'

export default {
  data: () => {
    return {
      phase: 'phase0',
      hoverOrange: false,
      hoverBlue: false,
      showBodyMovers: false,
      srcs: {
        bagOrange740,
        bagOrange370,
        bagOrange185,
        bagOrangeBack740,
        bagOrangeBack370,
        bagOrangeBack185,
        bagBlue740,
        bagBlue370,
        bagBlue185,
        bagBlueBack740,
        bagBlueBack370,
        bagBlueBack185,
      },
      imgCount: 5, // one extra for window.onload
      wrapperStyle: {
        height: '0px',
      }
    };
  },
  components: {
    animatedText,
    gameBubble,
    videoBubble,
    poppableChip,
    playNowBubble,
  },
  methods: {
    getOrangeSrcSet() {
      return `${this.srcs.bagOrange185} 185w, ${this.srcs.bagOrange370} 370w, ${this.srcs.bagOrange740} 740w`
    },
    getBlueSrcSet() {
      return `${this.srcs.bagBlue185} 185w, ${this.srcs.bagBlue370} 370w, ${this.srcs.bagBlue740} 740w`
    },
    getOrangeBackSrcSet() {
      return `${this.srcs.bagOrangeBack185} 185w, ${this.srcs.bagOrangeBack370} 370w, ${this.srcs.bagOrangeBack740} 740w`
    },
    getBlueBackSrcSet() {
      return `${this.srcs.bagBlueBack185} 185w, ${this.srcs.bagBlueBack370} 370w, ${this.srcs.bagBlueBack740} 740w`
    },
    onImgLoad() {
      this.imgCount -= 1
      if (this.imgCount <= 0) {
        console.log('imagesLoaded')
        window.setTimeout(() => {
          console.log('phase1')
          this.phase = 'phase1'

          window.setTimeout(() => {
            console.log('showBodyMovers')
            this.showBodyMovers = true
          }, 1000)
        }, 1000)
      }
    },
    onMouseenterOrange() {
      this.hoverOrange = true
    },
    onMouseleaveOrange() {
      this.hoverOrange = false
    },
    onMouseenterBlue() {
      this.hoverBlue = true
    },
    onMouseleaveBlue() {
      this.hoverBlue = false
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
    let width = 0;
    const setHeight = () => {
      const newWidth = window.innerWidth
      if (newWidth === width) {
        return
      }
      width = newWidth
      let height = window.innerHeight
      if (window.innerWidth >= 1024) {
        height -= document.querySelector('.footer').offsetHeight
      }
      this.wrapperStyle.height = `${height}px`
      console.log('home resize')
    }
    setHeight();
    window.addEventListener('resize', debounce(setHeight), 100)
  },
}
</script>

<style lang="scss" scoped>
@import '~styles/helpers';

.homeContent {
  overflow: hidden;
  position: relative;
  pointer-events: none;
  height: 100vh;

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

.backBags {
  @include fillContainer;

  z-index: $zBackBags;
}

.bubblesHome {
  @include fillContainer;

  opacity: 0;
  z-index: $zFloatingBubbles;

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
  z-index: $zChips;

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
    padding-top: 49%;
    background-color: #82eff5;
    position: relative;
  }
}

.frontBags {
  @include fillContainer;

  z-index: $zFrontBags;
}

@mixin bag {
  width: 55%;
  position: absolute;
  top: 100%;
  pointer-events: all;

  .phase0 & {
    transform: translateY(-100vh) translateY(-100%);
  }

  .phase1 & {
    transition: all 1s $ease-out-quart;
  }

  &:before {
    content: '';
    display: block;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 141%;
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
    transform: rotate(-6deg) translateY(-56%);
    transition-delay: 0.1s;
  }

  .hoverOrange & {
    transform: rotate(-6deg) translateY(-83%);
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
    transform: rotate(6deg) translateY(-56%);
  }

  .hoverBlue & {
    transform: rotate(6deg) translateY(-83%);
  }

  img {
    width: 100%;
    position: relative;
  }
}
</style>
