<style lang="scss" scoped>
  @keyframes countdown {
    from {
      opacity: .5;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(1.5);
    }
  }

  .countdown {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    animation: countdown 1s infinite ease-in;

    &.warn {
      color: #ed1846;
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

  .countdown .msg {
    opacity: 0;
  }

</style>

<template>
  <div v-if="duration > 0" class="countdown" :class="showTimer">
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