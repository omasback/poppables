import logoPoppables from './games/ui/images/logos/poppables.svg'

export default function header() {
  const headerToggle = document.querySelector('.headerToggle')
  const headerNav = document.querySelector('.headerNav')
  const headerBar = document.querySelector('.headerBar')
  const headerLogo = document.querySelector('.headerLogo')
  const gameLogo = document.querySelector('.headerGameImage')
  const content = document.querySelector('.content')

  let path = window.location.pathname.split('/')
  if(path.length > 1) {
    let game = path[2];
    switch(game) {
    case 'pops':
      gameLogo.style.backgroundImage = 'url('+logoPoppables+')';
      break;
    case 'dots':
      break;
    case 'catch':
      break;
    }
  }

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
  });

  window.addEventListener('resize', () => {
    navShowing = window.innerWidth > 570;
  });

  //function to re-size the logo
  window.addEventListener('scroll', () => {
    let yScroll = window.pageYOffset;
    if (yScroll < 15) { //large logo
      //headerLogoImage.classList.remove('headerLogoImageSmall');
      headerLogo.classList.remove('small');
      headerBar.classList.remove('headerBarScroll');
    } else { //small logo
      //headerLogoImage.classList.add('headerLogoImageSmall');
      headerLogo.classList.add('small');
      headerBar.classList.add('headerBarScroll');
    }
  });
}
