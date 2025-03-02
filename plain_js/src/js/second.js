try {
	console.time("arr create");
	const hugeArr = Array(10_000_000).fill(1);
	console.timeEnd("arr create");
	console.time("arr change");
	for (const [index, item] of hugeArr.entries()) {
		hugeArr[index] = item + 1;
	}
	console.timeEnd("arr change");
	log("second");
} catch (e) {
	console.error('Error while arr create: ', e);
}

