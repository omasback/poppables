class PhaserMath {
  constructor() {

  }
  /* MATH */
  randomRange(start, end) {
    return Math.random() * start + (end - start);
  }
  randomWholeRange(start, end) {
    return Math.floor(Math.random() * start + (end - start + 1));
  }
  radToGrad(rad) {
    return 180 * rad / Math.PI;
  }
  gradToRad(grad) {
    return grad * Math.PI / 180
  }

  getEdge() {

  }
  getScalar(a, b) {
    return a.x * b.x + a.y * b.y;
  }
  checkSpriteOverlap(a, b) {
    let ab = a.getBounds();
    let bb = b.getBounds();
    return this.checkBoundsOverlap(aa, bb);
  }
  checkBoundsOverlap(a, b) {
    return Phaser.Rectangle.intersects(a, b);
  }


}