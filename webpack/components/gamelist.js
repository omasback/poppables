export default function initCollapse() {
  let videos = Array.from(document.querySelectorAll('video'));
  let gameList = document.querySelectorAll('[data-view-details]');

  function inViewport(ele) {
    return ele.offsetTop >= window.pageYOffset + 70 && ele.offsetTop + ele.offsetHeight <= window.pageYOffset + window.innerHeight;
  }

  function playVideo() {
    videos.map(video => {
      if(inViewport(video)) {
        video.play()
      }
      else {
        video.pause();
      }
    });
  }

  Array.from(gameList).forEach((el) => {
    el.addEventListener('click', element => {
      let elParent = element.target.parentNode;
      elParent.classList.toggle('game--show');
    }, false);
  });

  window.addEventListener('touchStart', playVideo);
  window.addEventListener('scroll', playVideo);

}
