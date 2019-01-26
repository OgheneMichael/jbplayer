import { elements } from "./view/base";
import { renderPlayIcon, renderPauseIcon } from "./view/playerIcons";
import "../sass/main.scss";
const { audio, controller, playerWrapper, progressBar } = elements;

const playAudio = () => {
	if (audio.paused) {
		audio.play();
		playerWrapper.classList.add("isPlaying");
		advance(audio.duration, audio);
		renderPauseIcon();
	} else {
		audio.pause();
		playerWrapper.classList.remove("isPlaying");
		clearTimeout(timer);
		renderPlayIcon();
	}
};

// audio.onended = () => {
// 	playerWrapper.classList.remove("isPlaying");
// 	clearTimeout(timer);
// 	renderPlayIcon();
// };

let timer;
let percent = 0;

const advance = (duration, element) => {
	let increment = 10 / duration;
	percent = Math.min(increment * element.currentTime * 10, 100);
	progressBar.value = percent / 100;
	startTimer(duration, element);
};

const startTimer = (duration, element) => {
	if (percent < 100) {
		timer = setTimeout(function() {
			advance(duration, element);
		}, 100);
	}
};

document
	.querySelector(".jbplayer__controls")
	.addEventListener("click", event => {
		if (event.target.matches('[data-handle="play"], [data-handle="play"] *')) {
			playAudio();
		}
	});
