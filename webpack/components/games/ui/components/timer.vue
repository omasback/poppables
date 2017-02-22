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
      <span v-text="time"></span>
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
    
    },
    watch: {

    },
    computed: {
      timeClass() {
        return {
          low: this.myTime <= 10
        }
      }
    },
    created() {
      
    },
    beforeUpdate() {

    },
    updated() {

    }
  }
</script>