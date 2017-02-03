<style lang="scss" scoped>
@import '~styles/application';

  .multiplier {
    @include flex(flex-start, space-between, column);
    font-size: 10px;
  }

  .multiplier div {
    @include flex(flex-end);
    height: 15px;
    margin-bottom: 5px;
  }

</style>

<template>
  <div class="multiplier">
    <div>
      <span>x</span> &nbsp; <span id="multiplier">{{multiplier}}</span>
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
