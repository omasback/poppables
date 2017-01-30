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
      :{{ myTime }}
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
    props: ['time'],
    methods: {
      
    },
    computed: {
      timeClass() {
        return {
          low: this.myTime <= 10
        }
      }
    },
    created() {
      let self = this;

      self.iid = setInterval(() => {
        self.myTime -= 1;

        if(self.myTime <= 5)
          self.$emit('countdown', self.myTime);

        if(self.myTime <= 0)
          clearInterval(self.iid);
      }, 1000);
    }
  }
</script>