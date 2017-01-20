import glvbg from 'gl-vignette-background'
import hex from 'hex-rgb'
import debounce from 'lodash/debounce'
import webglContext from 'webgl-context'

import debrisSrc from 'images/debris.png'
// import ringSrc from 'images/ring.png'

function rgb (str) {
  return hex(str).map(function (a) {
    return a / 255
  })
}

export default function bg() {
  function drawBg() {

    const startTime = performance.now();
    const vignetteCanvas = document.createElement('canvas')
    const bgCanvas = document.querySelector('.background')
    const w = bgCanvas.width = bgCanvas.clientWidth
    const h = bgCanvas.height = bgCanvas.clientHeight

    // Draw vignette/noise
    const gl = webglContext({
      canvas: vignetteCanvas, //the canvas DOM element to use
      width: w, //resizes the canvas..
      height: h,
      preserveDrawingBuffer: true
    })

    console.log(gl)

    const bg = glvbg(gl)

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.disable(gl.DEPTH_TEST)
    gl.disable(gl.CULL_FACE)

    bg.style({
      scale: [ 0.7, 0.7 ],
      aspect: 1,
      color1: rgb('#a6f7fb'),
      color2: rgb('#00cbd6'),
      // smoothing: [ -0.5, 1.0 ],
      noiseAlpha: 0.1,
      coloredNoise: false,
      offset: [ 0, -0.1 ]
    })
    bg.draw()

    // Draw dot matrix
    const bgCtx = bgCanvas.getContext('2d')
    const startingRadius = 22
    const spacing = 78
    const numRows = 14

    bgCtx.drawImage(vignetteCanvas, 0, 0)

    bgCtx.globalCompositeOperation = 'multiply';

    const cols = w / spacing + 1;
    for (let row = 0; row < numRows; row++) {
      let opacity = (numRows - row) / numRows * 0.3;
      bgCtx.fillStyle = `rgba(0, 173, 183, ${opacity})`
      let y = h - row * spacing / 2
      let radius = startingRadius - (row * startingRadius / numRows)

      for (let col = 0; col < cols; col++) {
        let x = col * spacing
        if (row % 2) {
          x += spacing / 2
        }
        bgCtx.beginPath()
        bgCtx.arc(x, y, radius, 0, Math.PI * 2, true)
        bgCtx.fill()
        bgCtx.closePath()
      }
    }

    bgCtx.globalCompositeOperation = 'source-over';

    const debrisImg = new Image()
    debrisImg.onload = function() {
      const debrisImgWidth = 1509
      bgCtx.drawImage(debrisImg, (w - debrisImgWidth) / 2, 0)
    }
    debrisImg.src = debrisSrc

    // Draw rings - ended up using debris.png for these
    // const ringsCanvas = document.querySelector('.rings')
    // ringsCanvas.width = w
    // ringsCanvas.height = h
    // const ringsCtx = ringsCanvas.getContext('2d')
    // const ringDensity = 0.00001;
    // const numRings = ringDensity * w * h
    // const ringImg = new Image()
    // ringImg.onload = function(){
    //   ringsCtx.fillRect(10, 10, 100, 50)
    //
    //   for (let i = 1; i < numRings; i++) {
    //     ringsCtx.save()
    //     const tx = Math.random() * w
    //     const ty = Math.random() * h
    //     const r = Math.random() * Math.PI * 2
    //     const s = Math.random() * 0.5
    //     ringsCtx.translate(tx, ty)
    //     ringsCtx.rotate(r)
    //     ringsCtx.scale(s, s)
    //     ringsCtx.drawImage(ringImg, 0, 0)
    //     ringsCtx.restore()
    //   }
    // };
    // ringImg.src = ringSrc


    console.log(`drawBg: ${(performance.now() - startTime).toFixed(1)}ms`)
  }

  window.addEventListener('resize', debounce(drawBg, 1000))

  drawBg()
}
