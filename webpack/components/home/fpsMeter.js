import fps from 'fps'

const fpsMeter = fps({
  every: 15,
  decay: 0.01,
})

function tick() {
  fpsMeter.tick()
  window.requestAnimationFrame(tick)
}

window.addEventListener('load', tick)

if (process.env.NODE_ENV === 'development') {
  const el = document.createElement('div')
  el.style.position = 'fixed'
  el.style.top = '0'
  el.style.left = '0'
  el.style.backgroundColor = '#000'
  el.style.color = '#fff'
  document.body.appendChild(el)

  fpsMeter.on('data', (rate) => {
    el.innerHTML = Math.floor(rate)
  })
}

export default fpsMeter;
