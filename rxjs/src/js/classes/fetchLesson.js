import viewClassBinder from "../services/viewClassBinder";
import { domQueries } from "../config/domQueries";
import { ajax } from "rxjs/internal/ajax/ajax";
import config from "../config/config";
import { map } from "rxjs";

class FetchLesson {
	fetchButton;

	constructor() {
		this.initComponent();
	}

	initComponent() {
		viewClassBinder.createClassPropsDueViewConfig().bind(this)(this._configView);

		if (this.fetchButton) {
			this.fetchLessons = this.fetchLessons.bind(this);

			this.addListenerOnCreate();
		}
	}


	fetchTries = 1;

	fetchImage(imageUrl = "https://picsum.photos/200/300") {
		ajax({ url: imageUrl, responseType: 'blob' }).pipe(
			map(response => {
				if (response.status === 200) {
					return response.response;
				} else {
					throw new Error("Failed to fetch image");
				}
			})
		).subscribe({
			next: (blob) => {
				if (blob) {
					const blobbedUrl = URL.createObjectURL(blob);

					const img = document.createElement("img");

					img.onload = () => {
						URL.revokeObjectURL(blob);

						document.body.append(img);

						this.fetchTries--;

						setTimeout(
							() => this.fetchTries >= 0 && this.fetchImage(blobbedUrl), 30000
						);
					};

					img.onerror = () => {
						console.error("Error while loading image");
					};


					img.src = blobbedUrl;
				}
			}
		});
		// fetch(imageUrl)
		// 	.then(response => {
		// 		if(response.ok) {
		// 			return response.blob();
		// 		}
		// 	}).then(blob => {
		// 		if(blob) {
		// 			const blobbedUrl = URL.createObjectURL(blob);
		//
		// 			const img = document.createElement('img');
		//
		// 			img.onload = () => {
		// 				URL.revokeObjectURL(blob);
		//
		// 				document.body.append(img);
		//
		// 				this.fetchTries--;
		//
		// 				setTimeout(
		// 					() => this.fetchTries >= 0 && this.fetchImage(blobbedUrl), 30000
		// 				)
		// 			}
		//
		// 			img.onerror = () => {
		// 				console.error('Error while loading image');
		// 			}
		//
		//
		//
		// 			img.src = blobbedUrl;
		// 		}
		// 	})
	}

	fetchLessons() {
		this.fetchImage();
	}

	addListenerOnCreate() {
		this.fetchButton.addEventListener("click", this.fetchLessons, { passive: true });
	}


	_configView = [domQueries.fetchButton];
}

const fetchLessons = new FetchLesson();

export default fetchLessons;
