class ViewOperationsProvider {
	addImageToDom(imgUrl) {
		if(imgUrl) {

			const blobbedUrl = URL.createObjectURL(imgUrl);

			const img = document.createElement("img");

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
}

const viewOperationsProvider = new ViewOperationsProvider();

export default viewOperationsProvider;
