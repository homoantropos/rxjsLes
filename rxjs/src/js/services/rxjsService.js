import { concat, concatAll, merge, tap, partition } from "rxjs";

class RxjsService {
  merge(...args) {
    return merge(...args);
  }

  concat(...args) {
    return concat(...args);
  }

  partition(observables, predicateFunc) {
    return partition(observables, predicateFunc);
  }
}

const rxjsService = new RxjsService();

export default rxjsService;
