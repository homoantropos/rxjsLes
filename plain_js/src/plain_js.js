import "./plain_js.scss";
import indexedDbService from "./js/services/indexedDbService";

console.time('full process');

const idb = await indexedDbService.openDb();

console.log('out of openDb', idb);

console.timeEnd('full process');
