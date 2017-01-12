export default function header() {
  console.log('header init');
  const headerToggle = document.querySelector('.headerToggle')
  const headerNav = document.querySelector('.headerNav')
  const headerBar = document.querySelector('.headerBar')
  const headerLogoImage = document.querySelector('.headerLogoImage')
  const content = document.querySelector('.contentContainer')
  let navShowing = window.innerWidth > 700

  headerToggle.addEventListener('click', () => {
    navShowing = !navShowing;
    //do DOM stuff here to show or hide the nav
    if (navShowing) {
      headerNav.style.display = 'block';
      headerToggle.children[0].className = "navImage xIcon";
      content.className = "contentContainer blurred";
    } else {
      headerNav.style.display = 'none';
      headerToggle.children[0].className = "navImage hamburger";
      content.className = "contentContainer";
    }
  })
  window.addEventListener('scroll', () => {
    console.log('dom element headerLogoImage', headerLogoImage)
    if (window.innerWidth < 700) {
      console.log('scrolling on mobile')
      headerBar.style.height = '65px';
      headerBar.style.backgroundColor = '#69dce3';
      headerBar.style.boxShadow = "2px 2px 1px #8e8e8e";
      headerLogoImage.className = "headerLogoImage headerLogoImageSmall"
    }
  })
}
