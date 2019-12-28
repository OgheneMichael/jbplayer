export default class Playlist {
	constructor() {
		this.tracks = [];
	}

	getTracks(trackList) {
		// Should be a server request but we move
		this.tracks = trackList;
	}
}
