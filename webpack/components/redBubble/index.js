import bodymovin from 'bodymovin';
import redBubble from './animation.json';
import './style.scss'

Array.prototype.forEach.call(document.querySelectorAll('.redBubble'), (el) => {
  const anim = bodymovin.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: redBubble
  });

  console.log(anim);
});
