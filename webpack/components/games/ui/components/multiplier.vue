<style lang="scss" scoped>
@import '../../../../styles/globals';

  .multiplier {
    @include flex(flex-start, center, column);
    font-size: 10px;
  }

  .multiplier div {
    @include flex(flex-end);
    height: 15px;
    margin-bottom: 5px;
  }

  @media (max-width: 699px) {
    .multiplier div {
      margin-bottom: 7px;
    }
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