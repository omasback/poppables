import bodymovin from 'bodymovin';

export default {
  created: function () {
    this.bmOptions.animationData.assets.forEach(asset => {
      if (!asset.layers) {
        asset.p = this.contextModule(`./${asset.p}`);
        asset.u = '';
      }
    });
  },
  mounted: function() {
    this.bodyMover = bodymovin.loadAnimation(Object.assign({
      container: this.$el,
    }, this.bmOptions));
  }
}
