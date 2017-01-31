<style lang="scss" scoped>
@import '../../../../styles/application';

  .controls {
    @include flex(center, space-around);
  }

  .control {
    margin: 0 6px;
    width: 15px;
    height: 15px;
    font-weight: bold;
    color: #FD6B15;
    cursor: pointer;
    transition: width .25s, height .25s;
  }

</style>

<template>
  <div class="controls">
    <!--<span id="pause-btn" class="btn btn-pause">| |</span>-->
    <img id="pause-btn" class="control control-pause" :srcset="getPauseSrc()" @click="togglePlay">
    <img id="music-btn" class="control control-music" :srcset="getMuteSrc()" @click="toggleSound">
  </div>
</template>

<script>
import iconPlay from '../images/icons/pause.svg'
import iconPause from '../images/icons/pause.svg'
import iconMuted from '../images/icons/mute.svg'
import iconSound from '../images/icons/unmute.svg'

// import logoPoppables from './images/logos/poppables.svg'

export default {
  data() {
    return {
      muted: false,
      paused: false
    }
  },
  methods: {
    getPauseSrc() {
      return this.paused ? iconPlay : iconPause;
    },
    getMuteSrc() {
      return this.muted ? iconMuted : iconSound;
    },
    togglePlay() {
      this.paused = !this.paused;
      this.$emit('pause');
    },
    toggleSound() {
      this.muted = !this.muted;
      this.$emit('mute');
    }
  }

}

</script>