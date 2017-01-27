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
      :{{ time }}
    </div>
    <span class="text">Time Left</span>
  </div>
</template>


<script>
  export default {
    data() {
      return { 
  
      }
    },
    props: ['time'],
    methods: {
      
    },
    computed: {
      timeClass() {
        return {
          low: this.time <= 10
        }
      }
    },
    created() {

    }
  }
</script>