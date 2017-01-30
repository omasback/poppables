<style lang="scss" scoped>
@import '../../../../styles/globals';

  .multiplier {
    @include flex(flex-start, space-around, column);
    font-size: 12px;
  }

  .multiplier div {
    margin-bottom: 5px;
  }

</style>

<template>
  <div class="multiplier">
    <div> 
      <span>x</span> 
      <span id="multiplier">{{multiplier}}</span> 
    </div>
    <span class="text">multiplier</span>
  </div>
</template>

<script>

export default {
  data() {
    return {}
  },
  props: ['multiplier'],
  methods: {

  },
  computed: {

  },
  created() {

  }
}
</script>