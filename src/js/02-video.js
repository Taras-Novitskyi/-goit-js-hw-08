import Player from '@vimeo/player';

// const player = new Player('handstick', {
//   id: 19231868,
// 	width: 640,
// });

// const options = {
//   id: 19231868,
//   	width: 640,
// };

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
player.addEventListener('timeupdate', onPlay);

const onPlay = function (data) {
	console.log(data);
};

player.on('play', onPlay);

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});
