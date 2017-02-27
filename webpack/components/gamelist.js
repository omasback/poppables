export default function initCollapse() {
  let videos = Array.from(document.querySelectorAll('video'));
  let gameList = document.querySelectorAll('[data-view-details]');

  function inViewport(ele) {
    return ele.offsetTop >= window.pageYOffset && ele.offsetTop <= window.pageYOffset + window.innerHeight;
  }

  Array.from(gameList).forEach((el) => {
    el.addEventListener('click', element => {
      let elParent = element.target.parentNode;
      elParent.classList.toggle('game--show');
    }, false);
  });

  window.addEventListener('scroll', () => {
    videos.filter(inViewport).map(video => video.play());
  });

}
