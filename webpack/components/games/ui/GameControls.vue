<style lange="scss" scoped>
</style>

<template>
  <div>
    <!--<span id="pause-btn" class="btn btn-pause">| |</span>-->
    <img id="pause-btn" class="btn btn-pause" :srcset="getPauseSrc()" @click="pause">
    <img id="music-btn" class="btn btn-music" :srcset="getMuteSrc()" @click="toggleSound"> 
  </div>
</template>

<script>
import iconPause from './images/icons/pause.svg'
import iconMuted from './images/icons/mute.svg'
import iconSound from './images/icons/unmute.svg'
import logoPoppables from './images/icons/logo-poppables.svg'

export default {
  data() {
    return {

    }
  },
  methods: {
    getPauseSrc() {
      return iconPause;
    },
    getMuteSrc() {
      return iconSound;
    },
    pause() {

    },
    toggleSound() {
      console.log("CLICKED")
    }
  }

}

</script>