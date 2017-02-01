<style lang="scss" scoped>
@import '~styles/mixins';

  .screen {
    @include flex-container(center, center, column);
  }


  .pause-title {
    margin-top: 1.25em;
    margin-bottom: 1.85em;
    font-size: 38px;
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

<template>
  <div class="screen">
      <slot name="title" class="title"></slot>
      <slot name="small-title" class="small-title"></slot>
      <slot name="prompt"  class="prompt"></slot>
      <!-- TODO: remove default slot? -->
      <slot></slot>
  </div>
</template>

<script>

</script>