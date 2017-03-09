<style lang="scss" scoped>
@import '~styles/helpers';

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
      <div class="progress-bar" id="power" :class="updateClass" :style="updateWidth"></div>
    </div>
    <span class="text">power</span>
  </div>
</template>

<script>

export default {
  data() {
    return {
      width: 100
    }
  },
  props: ['misses', 'time'],
  computed: {
    updateClass() {
      return {
        medium: this.width > 20 && this.width <= 60,
        low: this.width <= 20
      }
    },
    updateWidth() {
      return {
        width: this.width + '%'
      }
    }
  },
  methods: {
    startDecay() {
      let self = this;
      self.iid = setInterval(() => {
        self.width -= .1;
      }, 100)
    }
  },
  watch: {
    misses(val) {
      let newWidth = 100 - (20 * val);
      this.width = newWidth < this.width ? newWidth : this.width - 20;
    },
    width(val) {
      if(val <= 0) {
        this.$emit('empty');
        clearInterval(this.iid);
      }
    }
  },
  created() {
    if(this.time > 0) {
      let newWidth = 100 - (20 * this.misses) - this.time;
      this.width = newWidth;
    }
    setTimeout(this.startDecay, 4000)
  },
  destroyed() {
    clearInterval(this.iid);
  }
}
</script>
