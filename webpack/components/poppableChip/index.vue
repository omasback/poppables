<template>
  <div class="poppableChip">
  </div>
</template>

<script>
import bodyMoverMixin from 'util/bodyMoverMixin';
import animationData from './data.json';

export default {
  mixins: [bodyMoverMixin],
  data: () => {
    return {
      contextModule: require.context('./images', false, /^\.\//),
      bmOptions: {
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData
      },
    }
  },
}

</script>

<style lang="sass" scoped>

.poppableChip {
  width: 300px;
  height: 300px;
  display: inline-block;
}

</style>
