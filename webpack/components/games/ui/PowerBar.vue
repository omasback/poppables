<style lang="scss" scoped>
  .power-bar {

  }

  .progress {
    width: 100px;
    height: 20px;
    overflow: hidden;
    background-color: #f5f5f5;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
  }

  .progress-bar {
    height: 100%;
    width: 100%;
    background-color: #3DA045;
    transition: background-color .5s, width .5s;
  }

  .progress-bar.medium {
    background-color: #EF6C00;
  }

  .progress-bar.low {
    background-color: #D50000;
  }


</style>

<template>
  <div class="power-bar">
    <div class="progress">
      <div class="progress-bar" id="power"></div>
    </div>
    <span class="text">power</span>
  </div>
</template>

<script>
  export default {
    
  }
</script>