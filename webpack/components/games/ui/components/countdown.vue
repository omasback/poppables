<style lang="scss" scoped>
  @keyframes countdown {
    from {
      opacity: .75;
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
    animation: countdown 1.10s infinite;
  }

  .countdown.xl {
    font-size: 25em;
  }

  .countdown.l {
    font-size: 20em;
  }

  .countdown.m {
    font-size: 10em;
  }

  .countdown.s {
    font-size: 5em;
  }

  .countdown .msg {
    opacity: 0;
  }

  .flash {
    animation: countdown 1 1;
  }

</style>

<template>
  <div v-if="duration > 0" class="countdown" :class="showTimer">
    <span> {{duration}} </span>
    
  </div>
</template>

<script>
  export default {
    props: ['duration', 'size'],
    data() {
      return {
        message: 'Pop'
      }
    },
    computed: {
      showTimer() {
        return {
          ghost: this.duration <= 0,
          xl: this.size === 'xl',
          l: this.size === 'l'
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