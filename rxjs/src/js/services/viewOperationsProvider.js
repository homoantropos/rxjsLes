class ViewOperationsProvider {
	addImageToDom(imgUrl) {
		if(imgUrl) {

			const blobbedUrl = URL.createObjectURL(imgUrl);

			const img = document.createElement("img");

			img.style.width = '200px';

			img.style.height = 'auto';

			img.style.position = 'absolute';

			img.style.transition = 'transform ease-out 300ms';

			img.onload = () => {
				URL.revokeObjectURL(imgUrl);

				document.body.append(img);
			};

			img.onerror = () => {
				console.error("Error while loading image");
			};

			img.src = blobbedUrl;
		}
	}

	simulateClick(element, x, y) {
		const event = new MouseEvent('click', {
			view: window,
			bubbles: true,
			cancelable: true,
			clientX: x,
			clientY: y
		});

		element.dispatchEvent(event);
	}
}

const viewOperationsProvider = new ViewOperationsProvider();

export default viewOperationsProvider;
