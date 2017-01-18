import bodymovin from 'bodymovin';

export default {
  mounted: function() {
    this.bodyMover = bodymovin.loadAnimation(Object.assign({
      container: this.$el,
    }, this.bmOptions));
  },
  packAssets: function(animationData, contextModule) {
    animationData.assets.forEach(asset => {
      if (!asset.layers) {
        asset.p = contextModule(`./${asset.p}`);
        asset.u = '';
      }
    });
  }
};
