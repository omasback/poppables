<template>
  <div
    class="homeContent"
    :class="{ phase0, phase1, phase2, phase3 }"
    :style="wrapperStyle"
  >
    <div class="backdrop" v-on:touchstart="onTouchstartBackdrop"></div>
    <div class="headline">
      <h1>Experience the fun with these poppin' games!</h1>
      <!--<h2>Start by playing these poppin' games</h2>-->
    </div>
    <animatedText/>
    <div class="backBags" :class="{ hoverOrange, hoverBlue }">
      <img
        class="backOrangeBag orangeBag"
        :srcset="getOrangeBackSrcSet()"
        sizes="55vw, (orientation: landscape) 23vw"
        v-on:load="onImgLoad"
      />
      <div class="playNowWrapper blueBag">
        <playNowBubble/>
      </div>
      <img
        class="backBlueBag blueBag"
        :srcset="getBlueBackSrcSet()"
        sizes="55vw, (orientation: landscape) 23vw"
        v-on:load="onImgLoad"
      />
    </div>
    <div class="bubblesHome" ref="bubblesHome">
      <gameBubble/>
    </div>
    <div class="chipsHome" ref="chipsHome">
      <poppableChip v-for="n in 10" ref="n"/>
    </div>
    <div class="frontBags" :class="{ hoverOrange, hoverBlue }">
      <img
        class="frontBlueBag blueBag"
        :srcset="getBlueSrcSet()"
        sizes="55vw, (orientation: landscape) 23vw"
        v-on:load="onImgLoad"
        v-on:mouseenter="onMouseenterBlue"
        v-on:mouseleave="onMouseleaveBlue"
      />
      <img
        class="frontOrangeBag orangeBag"
        :srcset="getOrangeSrcSet()"
        sizes="55vw, (orientation: landscape) 23vw"
        v-on:load="onImgLoad"
        v-on:mouseenter="onMouseenterOrange"
        v-on:mouseleave="onMouseleaveOrange"
        v-on:transitionend="onBagLanding"
      />
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import picturefill from 'picturefill'

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
import chipSprite from './poppableChip/chip_sprite_256.png'
import shadowSprite from './poppableChip/shadow_sprite_256.png'

window.addEventListener('load', () => { console.log('window loaded', performance.now()) })

export default {
  data: () => {
    return {
      phase0: true,
      phase1: false,
      phase2: false,
      phase3: false,
      hoverOrange: false,
      hoverBlue: false,
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
      imgCount: 7, // one extra for window.onload
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
        const phase1 = () => {
          console.log('imagesLoaded, window loaded', performance.now())
          window.hideLoader()

          window.setTimeout(() => {
            console.log('phase1, bags begin drop', performance.now())
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
            console.log('phase2, bags land', performance.now())
            this.phase2 = true

            window.setTimeout(() => {
              console.log('phase3, show red bubbles', performance.now())
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
    onTouchstartBackdrop() {
      this.hoverOrange = false
      this.hoverBlue = false
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
    [chipSprite, shadowSprite].forEach(src => {
      const img = new Image()
      img.onload = this.onImgLoad
      img.src = src
    })
    console.log('home created, ', performance.now())
  },
  mounted: function() {
    console.log('home mounted start, ', performance.now())
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
      click.initEvent('click', true, true)
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
    console.log('home mounted end, ', performance.now())
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
  width: 90%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -150%);
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

.bubblesHome {
  @include fillContainer;

  z-index: $zFloatingBubbles;
}

.chipsHome {
  position: absolute;
  left: 10%;
  bottom: 0;
  width: 80%;
  z-index: $zChips;
  opacity: 0;

  .phase2 & {
    opacity: 1;
  }

  @media (orientation: landscape) {
    width: 34%;
    left: 33%;
  }

  &:after {
    content: '';
    display: block;
    padding-top: 49%;
  }
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
    transition: all 1s $ease-in-quart;
  }

  .phase2 & {
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

  .frontBags & {
    z-index: $zFrontBags;
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
