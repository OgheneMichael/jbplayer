import { elements } from "../view/base";

export function renderTrack({ id, artistName, songTitle }) {
	const markup = `
    <li class="jbplayer__list--item" data-id=${id}>${artistName} – ${songTitle}</li>
  `;

	return elements.playList.insertAdjacentHTML("beforeend", markup);
}
