function getRxjsIsDownloaded(tries = 3) {
	if (typeof rxjs !== 'undefined') {
		log('third SUCCESS');

		return rxjs;
	}

	tries >= 0 && setTimeout(() => {
		log(`try ${4 - tries}`);

		getRxjsIsDownloaded(tries - 1);
	}, 1000);

	tries < 0 && log('rxjs is not downloaded');
}

const rxjsLib = getRxjsIsDownloaded();
