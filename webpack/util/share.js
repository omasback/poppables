import objectToParams from 'util/objectToParams'

export function facebookShare({href: href}) {
  let qs = objectToParams({
    app_id: window.FACEBOOK_APP_ID,
    display: 'popup',
    href: window.APPLICATION_HOST + href,
  });
  let popupUrl = 'https://www.facebook.com/dialog/share?' + qs;

  openPopup(popupUrl, 'share-facebook');
}

export function twitterShare({text: text, url: url}) {
  let qs = objectToParams({
    text: text,
    url: window.APPLICATION_HOST + url,
    via: 'LAYS',
    hashtags: 'lays,poppables'
  });

  let popopUrl = 'https://twitter.com/intent/tweet?' + qs;

  openPopup(popopUrl, 'share-twitter');
}

function openPopup(url, name) {
  let popupOptions = 'width=600,height=400';
  window.open(url, name, popupOptions);
}