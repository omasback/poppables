<style lang="scss" scoped>

</style>

<template>
  <div>
    <div>
      
    </div>
    <span class="text">Time Left</span>
  </div>
</template>


<script>
  export default {
    data() {
      return { 
        time: 60
      }
    },
    methods: {
      updateTime(time) {
        this.time = time;
      }
    },
    created() {

    }
  }
</script>