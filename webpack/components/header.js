import debounce from 'lodash/debounce'

export default function header() {
  const body = document.querySelector('body');
  const headerToggle = document.querySelector('.headerToggle')
  const headerBar = document.querySelector('.headerBar')

  let navShowing = false
  const isGamePage = body.classList.contains('gameBody')

  function toggleMobileNav() {
    if (navShowing) {
      body.classList.add('navModalOpen')
    } else {
      body.classList.remove('navModalOpen')
    }
  }

  function checkForScrollNav() {
    let yScroll = window.pageYOffset;
    if (yScroll < 15) { //large logo
      headerBar.classList.remove('headerBarScroll');
    } else { //small logo
      headerBar.classList.add('headerBarScroll');
    }
  }

  headerToggle.addEventListener('click', () => {
    navShowing = !navShowing;
    toggleMobileNav()
  });

  window.addEventListener('resize', debounce(() => {
    navShowing = navShowing && window.innerWidth < 700
    toggleMobileNav()
  }), 500);

  if (!isGamePage) {
    checkForScrollNav();
    window.addEventListener('scroll', () => {
      checkForScrollNav();
    });
  }

  window.addEventListener('click', (e) => {
    let target = e.target;
    let id = target.getAttribute('data-ga-id');
    if (id) {
      dataLayer.push({'event': id});
    }
  })
}
