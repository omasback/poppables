<style lang="scss" scoped>
@import '~styles/mixins';

  .screen {
    @include flex(center, center, column);
  }

  .title {

  }

  .small-title {
    margin-top: 0;
    font-size: 9px;
  }

  .prompt {
    font-size: 14px;
    line-height: 1.5;
  }

  .divider {
    width: 35%;
    height: 1px;
    background-color: #fff;
    margin: 5px 0;
  }

  .row {
    @include flex-container(center, space-between);
  }

  #pause {
    @include flex(center, center, column);
  }

  #pause button {
    font-size: 11px;
    margin-left: 5px;
    margin-right: 5px;
  }

  #pause button.active {
    font-size: 15px;
  }




</style>
<!-- use these slots with spans only! -->
<template>
  <div class="screen">
      <slot name="title"></slot>
      <slot name="small-title"></slot>
      <slot name="prompt"></slot>
      <!-- TODO: remove default slot? -->
      <slot></slot>
  </div>
</template>

<script>

</script>