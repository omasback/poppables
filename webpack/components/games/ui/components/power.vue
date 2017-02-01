<style lang="scss" scoped>
@import '~styles/application';

  .power-bar {
    @include flex(flex-start, space-between, column);
  }

  .progress {
    width: 86px;
    height: 12px;
    overflow: hidden;
    background-color: #E5E5E5;
    border-radius: 15px;
    -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);

  }

  .progress-bar {
    height: 100%;
    width: 100%;
    border-radius: 15px;
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
  data() {
    return {

    }
  },
  props: ['misses'],
  computed: {

  },
  methods: {
    check() {
    }
  },
  created() {
  }
}
</script>