export default class NowPlaying {
	constructor() {
		this.id;
		this.percent = 0;
		this.timer;
	}

	handlePlaying({ id, artistName, songTitle, coverArt, filePath }) {
		this.id = id;
		this.artistName = artistName;
		this.songTitle = songTitle;
		this.coverArt = coverArt;
		this.filePath = filePath;
	}

	startTimer(duration, element) {
		if (this.percent < 100) {
			this.timer = setTimeout(function() {
				this.advance(duration, element);
			}, 100);
		}
	}

	advance(duration, element) {
		let increment = 10 / duration;
		this.percent = Math.min(increment * element.currentTime * 10, 100);
		// progressBar.value = this.percent / 100;
		this.startTimer(duration, element);
	}
}
