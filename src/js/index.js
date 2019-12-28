import { elements } from "./view/base";
import { renderPlayIcon, renderPauseIcon } from "./view/playerIcons";
import "../sass/main.scss";
const { controller, playerWrapper, progressBar } = elements;
import Playlist from "./models/playlist";
import NowPlaying from "./models/nowPlaying";
import { renderTrack } from "./view/playlistView";
import { renderPlaying, handleActiveTrack } from "./view/nowPlayingView";

const state = {};

function initAudioPlayer() {
	state.audio = new Audio();
	// state.audio.src = filePath;
	// audio.loop = true;
	// audio.play();

	state.audio.onended = function() {
		if (state.playlist.tracks.length === state.nowPlaying.id) {
			playerWrapper.classList.remove("isPlaying");
			clearTimeout(timer);
			renderPlayIcon();
			setNextTrack();
		} else {
			setNextTrack(state.nowPlaying.id++);
			playAudio();
		}
	};
}

function playAudio() {
	if (state.audio.paused) {
		state.audio.play();
		playerWrapper.classList.add("isPlaying");
		renderPauseIcon();
		advance(state.audio.duration, state.audio);
		// state.audio.ondurationchange = function() {
		// };
	} else {
		state.audio.pause();
		playerWrapper.classList.remove("isPlaying");
		clearTimeout(timer);
		renderPlayIcon();
	}
}

let timer;
let percent = 0;

function advance(duration, element) {
	let increment = 10 / duration;
	percent = Math.min(increment * element.currentTime * 10, 100);
	progressBar.value = percent / 100;
	startTimer(duration, element);
}

const startTimer = (duration, element) => {
	if (percent < 100) {
		timer = setTimeout(function() {
			advance(duration, element);
		}, 100);
	}
};

controller.addEventListener("click", event => {
	if (event.target.matches('[data-handle="play"], [data-handle="play"] *')) {
		playAudio();
	}
});

/**
 * PLAYLIST CONTROLLER
 */

function controlPlaylist() {
	const tracks = [
		{
			id: 1,
			artistName: "Chopstix",
			songTitle: "Judah (feat. Endia & Patoranking)",
			coverArt: "./judah_artwork.jpg",
			filePath: "./judah.mp3"
		},
		{
			id: 2,
			artistName: "Burna Boy",
			songTitle: "Calm Down",
			coverArt: "./calm_down_artwork.jpg",
			filePath: "./calm_down.m4a"
		}
	];

	// Create a new Playlist IF there is none yet
	if (!state.playlist) {
		state.playlist = new Playlist();
		state.playlist.getTracks(tracks);
	}
	// Render the tracks to the UI
	state.playlist.tracks.forEach(function listTrack(track) {
		renderTrack(track);
	});
}

/**
 * TRACK CONTROLLER
 */

function initializeTrack() {
	if (!state.nowPlaying) {
		state.nowPlaying = new NowPlaying();
		setNextTrack();
	}
}

function setNextTrack(trackId = 0) {
	state.nowPlaying.handlePlaying(state.playlist.tracks[trackId]);
	handleActiveTrack(Array.from(elements.playList.children)[trackId]);
	state.audio.src = state.nowPlaying.filePath;
	renderPlaying(state.nowPlaying);
}

function findTrack(elementId) {
	return state.playlist.tracks.find(function(track) {
		return track.id == elementId;
	});
}

function handleTrackClick() {
	if (state.playlist) {
		Array.from(elements.playList.children).forEach(function(el) {
			el.addEventListener("click", function() {
				if (state.nowPlaying.id != el.dataset.id) {
					state.nowPlaying.handlePlaying(findTrack(el.dataset.id));
					renderPlaying(state.nowPlaying);
					state.audio.src = state.nowPlaying.filePath;
					handleActiveTrack(el);
					state.audio.onloadedmetadata = function() {
						playAudio();
					};
				} else {
					handleActiveTrack(el);
					playAudio();
				}
			});
		});
	}
}

function onInit() {
	initAudioPlayer();
	controlPlaylist();
	initializeTrack();
	handleTrackClick();
}

window.addEventListener("load", onInit);
