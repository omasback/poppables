<style lang="scss" scoped>

  .target {
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: white;
    border-radius: 50%;
    top: 0;
    left: 0;
    opacity: .4;
    pointer-events: none;
    transition: opacity .5s;

    &.fade {
      opacity: 0;
    }
  }

  .target:before,
  .target:after {
    content: '';
    position: absolute;
    border-radius: 50%;
  }

  .target:before {
    top: -8px;
    left: -8px;
    width: 40px;
    height: 40px;
    border: 1px solid white;
  }

  .target:after {
    top: -5.75px;
    left: -5.9px;
    width: 35px;
    height: 35px;
    border: 1px solid red;
  }

</style>

<template>
  <div class="target" :style="style" :class="klass"></div>
</template>

<script>
  export default {
    props: ['x', 'y', 'dir', 'misses', 'score'],
    data() {
      return {

      }
    },
    computed: {
      style() {
        return {
          left: this.dir === 1 ? this.x + 150 +'px' : this.x - 150 +'px',
          top: this.y + 'px'
        }
      },
      klass() {
        return {
          fade: this.misses < 10 || this.score > 0
        }
      }
    }
  }
</script>