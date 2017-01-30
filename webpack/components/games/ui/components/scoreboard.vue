<style lang="scss" scoped>
@import '../../../../styles/globals';

  .score {
    @include flex(flex-start, space-around, column);
    margin: 0 5px;
  }

  #score {
    font-weight: bold;
    font-size: 18px; 
  }

</style>

<template>
  <div class="score">
    <span id="score">{{score}}</span>
    <span class="text">score</span>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['score']
}
</script>