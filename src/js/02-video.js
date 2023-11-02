import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe#vimeo-player');
const player = new Player(iframe);
const localStorageKey = 'videoplayer-current-time';
const videoPlayerCurrentTime = JSON.parse(
  localStorage.getItem(localStorageKey)
)?.seconds;

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  }, 1000)
);

player.setCurrentTime(videoPlayerCurrentTime);
