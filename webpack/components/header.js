export default function header() {
  const headerToggle = document.querySelector('.headerToggle')
  const headerNav = document.querySelector('.headerNav')
  const headerBar = document.querySelector('.headerBar')
  const headerLogo = document.querySelector('.headerLogo')
  const content = document.querySelector('.content')

  if (process.env.ELECTRON) {
    return
  }

  let navShowing = window.innerWidth > 570 // to only switch to the hamburger when the screen is too small for the desktopNav

  headerToggle.addEventListener('click', () => {
    navShowing = !navShowing;
    if (navShowing) {
      headerNav.style.display = 'block';
      headerToggle.children[0].classList.add('xIcon');
      headerToggle.children[0].classList.remove('hamburger');
      content.classList.add('blurred');
    } else {
      headerNav.style.display = 'none';
      headerToggle.children[0].classList.remove('xIcon');
      headerToggle.children[0].classList.add('hamburger');
      content.classList.remove('blurred');
    }
  })

  //function to re-size the logo
  window.addEventListener('scroll', () => {
    let yScroll = window.pageYOffset;
    if (yScroll < 1) { //large logo
      //headerLogoImage.classList.remove('headerLogoImageSmall');
      headerLogo.classList.remove('small');
      headerBar.classList.remove('headerBarScroll');
    } else { //small logo
      //headerLogoImage.classList.add('headerLogoImageSmall');
      headerLogo.classList.add('small');
      headerBar.classList.add('headerBarScroll');
    }
  })
}
