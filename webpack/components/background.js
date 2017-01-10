import glvbg from 'gl-vignette-background'
import hex from 'hex-rgb'
import debounce from 'lodash/debounce'
import webglContext from 'webgl-context'

function rgb (str) {
  return hex(str).map(function (a) {
    return a / 255
  })
}

export default function bg() {
  const vignetteCanvas = document.querySelector('.vignette')

  function drawBg() {

    const startTime = performance.now();
    const w = vignetteCanvas.clientWidth
    const h = vignetteCanvas.clientHeight

    const gl = webglContext({
      canvas: vignetteCanvas, //the canvas DOM element to use
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

    const dotsCanvas = document.querySelector('.dots')
    dotsCanvas.width = w
    dotsCanvas.height = h
    const dotsCtx = dotsCanvas.getContext('2d')
    const startingRadius = 22
    const spacing = 78
    const numRows = 14

    const cols = w / spacing + 1;
    for (let row = 0; row < numRows; row++) {
      let opacity = (numRows - row) / numRows;
      dotsCtx.fillStyle = `rgba(0, 173, 183, ${opacity})`
      let y = h - row * spacing / 2
      let radius = startingRadius - (row * startingRadius / numRows)

      for (let col = 0; col < cols; col++) {
        let x = col * spacing
        if (row % 2) {
          x += spacing / 2
        }
        dotsCtx.beginPath()
        dotsCtx.arc(x, y, radius, 0, Math.PI * 2, true)
        dotsCtx.fill()
        dotsCtx.closePath()
      }
    }

    console.log(`drawBg: ${(performance.now() - startTime).toFixed(1)}ms`)
  }

  window.addEventListener('resize', debounce(drawBg, 1000))

  drawBg()
}
