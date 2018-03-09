<template>
  <div
    class="homeContent"
    :class="{
      phase0,
      phase1,
      phase2,
      phase3,
      hoverOrange,
      hoverBlue,
      hoverRed
    }"
    :style="wrapperStyle"
  >
    <div class="backdrop" v-on:touchstart="onTouchstartBackdrop"></div>
    <div class="headline">
      <div class="pop"></div>
      <h1>Introducing the perfectly poppable crispy potato bites from Lay’s!</h1>
    </div>

    <div class="bubblesHome" ref="bubblesHome">
      <gameBubble v-bind:pauseBubbles="pauseBubbles"/>
    </div>

    <img
      class="backOrangeBag orangeBag"
      :srcset="getOrangeBackSrcSet()"
      sizes="55vw, (orientation: landscape) 23vw"
      v-on:load="onImgLoad"
    />
    <div class="orangeBag">
      <poppableChip id="chip1"/>
      <poppableChip id="chip2"/>
      <poppableChip id="chip3"/>
    </div>
    <img
      class="frontOrangeBag orangeBag"
      :srcset="getOrangeSrcSet()"
      sizes="55vw, (orientation: landscape) 23vw"
      v-on:load="onImgLoad"
      v-on:mouseenter="onMouseenterOrange"
      v-on:mouseleave="onMouseleaveOrange"
      v-on:transitionend="onBagLanding"
    />

    <img
      class="backBlueBag blueBag"
      :srcset="getBlueBackSrcSet()"
      sizes="55vw, (orientation: landscape) 23vw"
      v-on:load="onImgLoad"
    />
    <div class="blueBag">
      <poppableChip id="chip4"/>
      <poppableChip id="chip5"/>
      <poppableChip id="chip6"/>
    </div>
    <img
      class="frontBlueBag blueBag"
      :srcset="getBlueSrcSet()"
      sizes="55vw, (orientation: landscape) 23vw"
      v-on:load="onImgLoad"
      v-on:mouseenter="onMouseenterBlue"
      v-on:mouseleave="onMouseleaveBlue"
    />

    <img
      class="backRedBag redBag"
      :srcset="getRedBackSrcSet()"
      sizes="55vw, (orientation: landscape) 23vw"
      v-on:load="onImgLoad"
    />
    <div class="redBag">
      <poppableChip id="chip7" honeybbq="true"/>
      <poppableChip id="chip8" honeybbq="true"/>
      <poppableChip id="chip9" honeybbq="true"/>
    </div>
    <img
      class="frontRedBag redBag"
      :srcset="getRedSrcSet()"
      sizes="55vw, (orientation: landscape) 23vw"
      v-on:load="onImgLoad"
      v-on:mouseenter="onMouseenterRed"
      v-on:mouseleave="onMouseleaveRed"
      v-on:transitionend="onBagLanding"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import picturefill from 'picturefill'

import fpsMeter from './fpsMeter.js'
import gameBubble from './gameBubble/index.vue'
import videoBubble from './videoBubble/index.vue'
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
import bagRed740 from './images/bagRed740.png'
import bagRed370 from './images/bagRed370.png'
import bagRed185 from './images/bagRed185.png'
import bagRedBack740 from './images/bagRedBack740.png'
import bagRedBack370 from './images/bagRedBack370.png'
import bagRedBack185 from './images/bagRedBack185.png'

import chipSprite from './poppableChip/chip_sprite_256.png'
import shadowSprite from './poppableChip/shadow_sprite_256.png'

import headlineMobile from './images/headlineMobile.png'
import headlineDesktop from './images/headlineDesktop.png'

// window.addEventListener('load', () => { console.log('window loaded', performance.now()) })

export default {
  data: () => {
    return {
      phase0: true,
      phase1: false,
      phase2: false,
      phase3: false,
      hoverOrange: false,
      hoverBlue: false,
      hoverRed: false,
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
        bagRed740,
        bagRed370,
        bagRed185,
        bagRedBack740,
        bagRedBack370,
        bagRedBack185,
        headlineMobile,
        headlineDesktop,
      },
      imgCount: 7, // one extra for window.onload
      wrapperStyle: {
        height: '0px',
      },
      pauseBubbles: 3,
    };
  },
  components: {
    gameBubble,
    videoBubble,
    poppableChip,
  },
  methods: {
    getOrangeSrcSet() {
      return `${this.srcs.bagOrange185} 185w, ${this.srcs.bagOrange370} 370w, ${this.srcs.bagOrange740} 740w`
    },
    getBlueSrcSet() {
      return `${this.srcs.bagBlue185} 185w, ${this.srcs.bagBlue370} 370w, ${this.srcs.bagBlue740} 740w`
    },
    getRedSrcSet() {
      return `${this.srcs.bagRed185} 185w, ${this.srcs.bagRed370} 370w, ${this.srcs.bagRed740} 740w`
    },
    getOrangeBackSrcSet() {
      return `${this.srcs.bagOrangeBack185} 185w, ${this.srcs.bagOrangeBack370} 370w, ${this.srcs.bagOrangeBack740} 740w`
    },
    getBlueBackSrcSet() {
      return `${this.srcs.bagBlueBack185} 185w, ${this.srcs.bagBlueBack370} 370w, ${this.srcs.bagBlueBack740} 740w`
    },
    getRedBackSrcSet() {
      return `${this.srcs.bagRedBack185} 185w, ${this.srcs.bagRedBack370} 370w, ${this.srcs.bagRedBack740} 740w`
    },
    onImgLoad() {
      this.imgCount -= 1
      if (this.imgCount <= 0) {
        const phase1 = () => {
          // console.log('imagesLoaded, window loaded', performance.now())
          window.hideLoader()

          window.setTimeout(() => {
            // console.log('phase1, bags begin drop', performance.now())
            this.phase1 = true
          }, 1000)
        }

        if (document.readyState === 'complete') {
          phase1()
        } else {
          window.addEventListener('load', phase1)
        }
      }
    },
    onBagLanding() {
      if (this.phase1) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // this is when the transition really ends
            // console.log('phase2, bags land', performance.now())
            this.phase2 = true

            window.setTimeout(() => {
              // console.log('phase3, show red bubbles', performance.now())
              this.phase3 = true
            }, 1000)
          })
        })
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
    onMouseenterRed() {
      this.hoverRed = true
    },
    onMouseleaveRed() {
      this.hoverRed = false
    },
    onTouchstartBackdrop() {
      this.hoverOrange = false
      this.hoverBlue = false
      this.hoverRed = false
    }
  },
  created: function() {
    if (document.readyState === 'complete') {
      this.onImgLoad()
    } else {
      window.addEventListener('load', () => {
        this.onImgLoad()
      })
    }
    [
      chipSprite,
      shadowSprite,
    ].forEach(src => {
      const img = new Image()
      img.onload = this.onImgLoad
      img.src = src
    })
  },
  mounted: function() {
    // console.log('home mounted start, ', performance.now())
    let oldWidth = 0
    let oldHeight = 0

    const setHeight = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      if (newWidth === oldWidth && (Math.abs(newHeight - oldHeight) < 90 && newWidth < 1024)) {
        //if it's a mobile browser showing/hiding tollbars, ignore
        return
      }
      oldWidth = newWidth
      oldHeight = newHeight
      let contentHeight = newHeight
      if (window.innerWidth >= 1024) {
        contentHeight -= document.querySelector('.footer').offsetHeight
      }
      this.wrapperStyle.height = `${contentHeight}px`
      // console.log('home resize')
    }

    setHeight()

    window.addEventListener('resize', debounce(setHeight), 100)

    picturefill()

    // randomly pop bubbles
    window.setInterval(() => {
      if (!document.hasFocus()) {
        return
      }
      const mouseenter = document.createEvent('Event')
      mouseenter.initEvent('mouseenter', true, true)
      const click = document.createEvent('Event')
      click.initEvent('mousedown', true, true)
      const innerHeight = window.innerHeight
      const middleChip = Array.prototype
        .map
        .call(document.querySelectorAll('.chipHitbox'), (chip) => {
          return {
            chip,
            top: Math.abs(chip.getBoundingClientRect().top - innerHeight * 0.3)
          }
        })
        .sort((a, b) => a.top - b.top)[0]

      middleChip.chip.dispatchEvent(mouseenter);
      window.setTimeout(() => {
        middleChip.chip.dispatchEvent(click);
      }, 200)
    }, 10000)

    let delay = 200

    const decrement = () => {
      this.pauseBubbles = Math.max(this.pauseBubbles - 1, 0)
      window.setTimeout(decrement, delay)
      delay = Math.min(delay * 1.5, 32000)
      // console.log('delay', delay)
    }

    window.setTimeout(decrement, delay)

    fpsMeter.on('data', (rate) => {
      if (!document.hasFocus()) {
        return
      }
      if (rate < 55) {
        this.pauseBubbles = Math.min(this.pauseBubbles + 1, 2)
      }
      // console.log('pauseBubbles home', this.pauseBubbles)
    })
    // console.log('home mounted end, ', performance.now())
  },
}
</script>

<style lang="scss" scoped>
@import '~styles/helpers';

.homeContent {
  overflow: hidden;
  position: relative;
  height: 100vh;
  pointer-events: none;

  * {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
}

.headline {
  pointer-events: all;
  position: absolute;
  width: 46%;
  top: 34%;
  left: 52%;
  transform: translate(-50%, -50%);
  z-index: 0;
  background: url('~./images/headlineMobile.png') 0 0 no-repeat;
  background-size: contain;

  @include tablet {
    // transform: translate(-50%, -140%);
  }

  @media (orientation: landscape) {
    width: 46.5%;
    top: 30%;
    left: 50.6%;
    background-image: url('~./images/headlineDesktop.png');

    @include tablet {
      // transform: translate(-50%, -140%);
    }
  }

  &:before {
    content: '';
    display: block;
    padding-top: 118%;

    @media (orientation: landscape) {
      padding-top: 15%;
    }
  }

  .pop {
    background: url('~./images/headlinePopMobile.png') 0 0 no-repeat;
    background-size: contain;
    position: absolute;
    width: 136%;
    top: 16%;
    left: -22%;
    transition: transform 0.3s $ease-out-quint;

    @media (orientation: landscape) {
      background-image: url('~./images/headlinePopDesktop.png');
      width: 45.6%;
      top: -13%;
      left: 18.9%;
    }

    &:hover {
      transform: scale(1.1);
    }

    &:before {
      content: '';
      display: block;
      padding-top: 52%;
    }
  }

  h1 {
    margin: 0;
    font-size: 4.7vw;
    line-height: 1.5;
    text-align: center;
    color: #fa3f4a;
    position: absolute;
    width: 200%;
    left: -54%;
    top: 111%;

    @media (orientation: landscape) {
      font-size: 1.78vw;
      top: 177%;
      width: 80%;
      left: 8.9%;
      line-height: 1.3;
    }
  }
}

.bubblesHome {
  @include fillContainer;
}

@mixin bag {
  position: absolute;
  top: 100%;

  .phase0 & {
    // transform: translateY(-100vh) translateY(-100%);
  }

  .phase1 & {
    transition: all 0.3s $ease-out-quart;
  }

  .phase2 & {
    transition: all 1s $ease-out-quart;
  }

  .phase3 & {
    pointer-events: all;
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

  width: 37%;
  right: 56%;

  @media (orientation: landscape) {
    width: 23%;
    right: 49%;
  }

  .phase1 & {
    transform: rotate(0deg) translateY(-56%);
    transition-delay: 0.1s;

    @media (orientation: landscape) {
      transform: rotate(-11deg) translateY(-33%);
    }
  }

  .hoverOrange & {
    transform: rotate(0deg) translateY(-79%);

    @media (orientation: landscape) {
      transform: rotate(-11deg) translateY(-53%);
    }
  }
}

.blueBag {
  @include bag;

  width: 37%;
  left: 56%;

  @media (orientation: landscape) {
    width: 23%;
    left: 49%;
  }

  .phase1 & {
    transform: rotate(0deg) translateY(-56%);

    @media (orientation: landscape) {
      transform: rotate(11deg) translateY(-33%);
    }
  }

  .hoverBlue & {
    transform: rotate(0deg) translateY(-79%);

    @media (orientation: landscape) {
      transform: rotate(11deg) translateY(-53%);
    }
  }

  img {
    width: 100%;
    position: relative;
  }
}

.redBag {
  @include bag;

  width: 42%;
  left: 29%;

  @media (orientation: landscape) {
    width: 23%;
    left: 38.2%;
  }

  .phase1 & {
    transform: rotate(0deg) translateY(-60%);
    transition-delay: 0.2s;

    @media (orientation: landscape) {
      transform: rotate(0deg) translateY(-44%);
    }
  }

  .hoverRed & {
    transform: rotate(0deg) translateY(-82%);

    @media (orientation: landscape) {
      transform: rotate(0deg) translateY(-64%);
    }
  }

  img {
    width: 100%;
    position: relative;
  }
}
</style>
