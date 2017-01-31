<style lang="scss" scoped>
@import '../../../../styles/application';

  .score {
    @include flex(flex-start, space-between, column);
    margin-left: 5px;
    margin-right: 7px;
  }

  #score {
    font-size: 14px;
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