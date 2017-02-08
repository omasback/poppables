<style lang="scss" scoped>
  .timer {
    text-align: center;
  }
  .low {
    color: #ed1846;
  }
</style>

<template>
  <div>
    <div class="timer" :class="timeClass">
      <span v-text="myTime"></span>
    </div>
    <span class="text">Time Left</span>
  </div>
</template>


<script>
  export default {
    data() {
      return { 
        iid: null,
        myTime: this.time
      }
    },
    props: ['time', 'start'],
    methods: {
      startTimer() {
        let self = this;
        self.iid = setInterval(() => {
          self.myTime -= 1;

          if(self.myTime <= 5) {
            self.$emit('countdown', self.myTime);
          }
          if(self.myTime <= 0) {
            console.log(self.myTime)
            self.$emit('stop')
            clearInterval(self.iid);
          }
        }, 1000);
      }
    },
    watch: {
      start(val) {
        if(val) {
          this.startTimer();
        }
      }
    },
    computed: {
      timeClass() {
        return {
          low: this.myTime <= 10
        }
      },
      
    },
    created() {
      
    },
    beforeUpdate() {

    },
    updated() {

    }
  }
</script>