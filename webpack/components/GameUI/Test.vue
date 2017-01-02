<template>
  <div class="wrap">
    <span class="example">{{ greeting }}</span> there
  </div>
</template>

<script>
  const a = () => { console.log('yo') }
  export default {
    data() {
      return { greeting: 'hullo' }
    }
  }
</script>

<style scoped>
.wrap {
  color: blue;
}
.example {
  font-weight: bold;
}
</style>