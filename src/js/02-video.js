import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

saveTimeOnLocalStorage();

const onPlay = function (data) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data.seconds));
};
player.on('timeupdate', throttle(onPlay, 1000));

function saveTimeOnLocalStorage() {
  const savedTime = localStorage.getItem(LOCALSTORAGE_KEY);

  if (savedTime) {
    player.setCurrentTime(savedTime);
  }
}

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
