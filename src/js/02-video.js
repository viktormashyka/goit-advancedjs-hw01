import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe#vimeo-player');
const player = new Player(iframe);
const localStorageKey = 'videoplayer-current-time';
const videoPlayerCurrentTime = JSON.parse(
  localStorage.getItem(localStorageKey)
).seconds;

player.on('play', function () {
  console.log('played the video!');
});

player.on(
  'timeupdate',
  throttle(data => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    console.log('current player time (seconds): ', Math.floor(data.seconds));
  }, 1000)
);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});

player
  .setCurrentTime(videoPlayerCurrentTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
    console.log('time start video (seconds): ', Math.floor(seconds));
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
