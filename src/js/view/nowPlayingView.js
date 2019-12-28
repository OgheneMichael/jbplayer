import { elements } from "../view/base";

export function renderPlaying(track) {
	renderTrackDetails(track);
	renderArtwork(track);
	// handleAudio(track.filePath);
}

function renderArtwork({ coverArt, songTitle, artistName }) {
	const markup = `
    <img src=${coverArt} alt="Cover Art for ${songTitle} by ${artistName}"/>
  `;

	return (elements.coverArt.innerHTML = markup);
}

function renderTrackDetails({ artistName, songTitle }) {
	const markup = `
    <div class="jbplayer__details--track-artist">
      ${artistName}
    </div>
    <div class="jbplayer__details--track-title">
      ${songTitle}
    </div>
  `;

	return (elements.activeTrackDetails.innerHTML = markup);
}

function handleAudio(filePath) {
	elements.audio.src = filePath;
}

export function handleActiveTrack(track) {
	Array.from(elements.playList.children).forEach(function removeClass(el) {
		el.classList.remove("isPlaying");
	});

	track.classList.add("isPlaying");
}
