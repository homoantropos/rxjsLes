
const CONFIG_OBJ = Object.freeze({
	localStorageHolds: {
		version: "versionCount"
	},
	logNames: {
		version: "version"
	}
});

let counter = Number(localStorage.getItem(CONFIG_OBJ.localStorageHolds.version));

!counter ? counter = 1 : counter++;

localStorage.setItem(CONFIG_OBJ.localStorageHolds.version, String(counter));

function getLogFunc(versionCount) {
	const version = versionCount;

	return (logInfo) => console.log('version: ', version, logInfo);
}

const log = getLogFunc(counter);

document.addEventListener('DOMContentLoaded', () => {
	log("DOMContentLoaded");
}, { once: true });

document.addEventListener('click', () => {
	log("click");
}, { once: true });

log("first");
