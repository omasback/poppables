<style lang="scss" scoped>
  .countdown {
    color: #fff;
    opacity: .5;
  }
  .countdown.xl {

  }
  .countdown.l {

  }
  .countdown.m {

  }
  .countdown.s {

  }

</style>

<template>
  <div class="countdown" :class="showTimer">
    <p> {{time}} </p>
  </div>
</template>

<script>
  export default {
    props: ['duration', 'size'],
    data() {
      return {
        time: 0
      }
    },
    computed: {
      showTimer() {
        return {
          ghost: this.duration <= 0
        }
      },
      
      
    },
    methods: {
      
      countDown() {
        setInterval((() => {
          this.time--;
        }).bind(this), 1000);
      }
    
    },
    created() {

    },
    beforeUpdate() {
      console.log(this.duration)
      //this.time = this.duration;
      //this.countDown();
    },
    updated() {

    }
  }
</script>