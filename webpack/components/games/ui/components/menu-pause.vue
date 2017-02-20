<style lang="scss" scoped>
@import '~styles/helpers';

</style>

<template>
  <div>
    PAUSED
  </div>
</template>

<script>
export default {
  props: [],
  data() {
    return {}
  },
  activated() {
    console.log('menu pause activated')
  }
}
</script>