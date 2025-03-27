class IndexedDbService {
	indexedDB;

	idbName = 'idb_lessons';

	idbVersion = 1;

	objectStoresConfig = [
		{storeName: 'lessons', keyPath: null},
		{storeName: 'products', keyPath: 'id'}
	]

	async openDb() {
		console.time("indexedDb open");

		try {
			return await new Promise((resolve, reject) => {
				this.idbVersion++;

				const request = window.indexedDB.open(this.idbName, this.idbVersion);

				if (request) {
					request.onupgradeneeded = (event) => this._onUpgradeneeded(event);

					request.onsuccess = () => {
						this._onSuccess();

						resolve(this.indexedDB);
					};

					request.onblocked = () => this._onBlocked();

					request.onerror = () => this._onBlocked();
				} else {
					console.warn("indexedDb open error");
				}
			})

			console.timeEnd("indexedDb open");
		} catch(e) {
			console.log('indexedDb open error', e);
		}
	}

	async _onUpgradeneeded(event) {
		console.time('upgradeneeded');

		try {
			const db = event?.target?.result;

			if (db) {
				this._createObjectStores(db);

				this.indexedDB = db;

				console.log('onUprage: ', this.indexedDB);
			} else {
				throw new Error('indexedDb open upgradeneeded error');
			}
		} catch (e) {
			console.error('indexedDb open upgradeneeded error', e);
		}

		console.timeEnd('upgradeneeded');
	}

	_onSuccess() {
		console.time('open success');
		try {

		} catch(e) {
			console.error('indexedDb open success error', e);
		}
		console.timeEnd('open success');
	}

	_onBlocked() {
		console.time('blocked');
		try {
			console.warn("indexedDb open blocked");
		} catch(e) {
			console.error('indexedDb open blocked error', e);
		}
		console.timeEnd('blocked');
	}

	_onError() {
		console.timeEnd('open error');
		try {

		} catch(e) {
			console.error('indexedDb open error', e);
		}
		console.timeEnd('open success');
	}

	_createObjectStores(indexedDb) {
		console.time('createObjectStores');
		try {
			for (let storeConfig of this.objectStoresConfig) {
				const {storeName, keyPath} = storeConfig;

				if (!indexedDb.objectStoreNames.contains(storeName)) {
					indexedDb.createObjectStore(storeName, keyPath ? {keyPath} : undefined);
				}
			}
		} catch (e) {
			console.error('indexedDb createObjectStores error', e);
		}
		console.timeEnd('createObjectStores');
	}
}

const indexedDb = new IndexedDbService();

export default indexedDb;
