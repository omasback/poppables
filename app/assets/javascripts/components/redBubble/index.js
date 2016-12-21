import bodymovin from 'bodymovin';
import redBubble from './animation.json';

Array.prototype.forEach.call(document.querySelectorAll('.redBubble'), (el) => {
  const anim = bodymovin.loadAnimation({
    container: el,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: redBubble
  });
});
