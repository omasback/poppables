import glvbg from 'gl-vignette-background'
import hex from 'hex-rgb'
import debounce from 'lodash/debounce';

function rgb (str) {
  return hex(str).map(function (a) {
    return a / 255
  })
}

export default function bg() {
  const canvas = document.querySelector('.background')

  function drawBg() {

    const startTime = performance.now();
    const w = canvas.clientWidth
    const h = canvas.clientHeight

    const gl = require('webgl-context')({
      canvas: canvas, //the canvas DOM element to use
      width: w, //resizes the canvas..
      height: h,
      // antialias: true //can specify custom attributes here
    })

    const bg = glvbg(gl)

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.disable(gl.DEPTH_TEST)
    gl.disable(gl.CULL_FACE)

    bg.style({
      // scale: [ 1, 1 ],
      aspect: 1,
      color1: rgb('#a6f7fb'),
      color2: rgb('#00c9d4'),
      // smoothing: [ -0.5, 1.0 ],
      noiseAlpha: 0.15,
      coloredNoise: false,
      offset: [ 0, -0.15 ]
    })
    bg.draw()

    console.log(`drawBg: ${(performance.now() - startTime).toFixed(1)}ms`)
  }

  window.addEventListener('resize', debounce(drawBg, 1000))

  drawBg()
}
