<template>
  <div class="wrap">
    <span class="example">{{ greeting }}</span> there
  </div>
</template>

<script>
  const a = () => { console.log('yo') }

  export default {
    data() {
      return { greeting: 'hi' }
    }
  }
</script>

<style lang="sass" scoped>
.wrap {
  color: blue;
  .example {
    font-weight: bold;
  }
}
</style>