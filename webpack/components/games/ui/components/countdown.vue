<style lang="scss" scoped>
  @keyframes countdown {
    0% {
      opacity: .45;
      transform: scale(1);
    }
    95% {
      opacity: 0;
      transform: scale(1.5);
    }
  }

  .countdown {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    opacity: .45;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    /*animation: countdown 1s infinite ease-in;*/

    &.warn {
      color: #ed1846;
      opacity: .2;
    }
    &.xl {
      font-size: 25em;
    }
    &.l {
      font-size: 20em;
    }
    &.m {
      font-size: 10em;
    }
    &.s {
      font-size: 5em;
    }
  }

</style>

<template>
  <div v-if="duration > 0" id="countdown" class="countdown" :class="showTimer">
    <span v-text="duration"></span>
  </div>
</template>

<script>
  export default {
    props: ['duration', 'size', 'warn'],
    data() {
      return {
        message: 'Pop'
      }
    },
    computed: {
      showTimer() {
        return {
          ghost: this.duration <= 0,
          warn: this.warn === true,
          xl: this.size === 'xl',
          l: this.size === 'l',
          m: this.size === 'm',
          s: this.size === 's'
        }
      },
      showMessage() {
        return {
          flash: this.duration === 0
        }
      }
      
    },
    watch: {

    },
    methods: {
    
    },
    created() {
      //console.log(this.duration, this.size);
    },
    beforeUpdate() {
      //this.time = this.duration;
    },
    updated() {

    }
  }
</script>