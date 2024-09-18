import rxjsService from "../services/rxjsService";
import {
    buffer,
    bufferCount,
    bufferTime,
    bufferToggle, bufferWhen,
    concatAll, concatMap, defer,
    EMPTY, exhaustAll, exhaustMap, filter,
    fromEvent, iif,
    interval,
    map, mergeAll, mergeMap, of, switchMap, take,
    tap,
    timer
} from "rxjs";
import { getDefaultObserver } from "../utils/getDefaultObserver";
import { logDebug } from "../utils/debugLogger";
import {isArray, isEmptyArray} from "../utils/isSomething";
import {ajax} from "rxjs/internal/ajax/ajax";
import config from "../config/config";

class RxjsComponent {
    rxService;

    constructor() {
        this.initComponent();
    }

    initComponent() {
        if(rxjsService) {
            this.rxService = rxjsService;
        }
    }

    useExhaustMap() {
        const startId = 1;

        const clicks = fromEvent(document, 'click').pipe(
            tap(() => console.log('New Click!')),
            concatMap(
                (x) => interval(100).pipe(take(5))
            ),
            map(
                (x) => ajax.getJSON(config.url + '/' + Number(x + 1))
            )
        );

        const clicksSub = clicks.pipe(
            concatAll()
        ).subscribe(getDefaultObserver(clicksSub, 'concatMap works!'))
    }

    useConcatMap() {
        const startId = 1;

        const clicks = fromEvent(document, 'click').pipe(
            tap(() => console.log('New Click!')),
            concatMap(
                (x) => interval(1000).pipe(take(5))
            )
        );

        const clicksSub = clicks.pipe(
            concatMap(
                (x) => ajax.getJSON(config.url + '/' + Number(x + 1))
            )
        ).subscribe(getDefaultObserver(clicksSub, 'concatMap works!'))
    }

    useBufferWhen() {
        const intervalObs = interval(1000).pipe(
            tap(() => 'intervalObs'),
        );

        const getPosts = (id) => ajax.getJSON(config.url + '/' + Number(id+1));

        const clicks = fromEvent(document, 'click');

        const clickSub = clicks.pipe(
            switchMap(
                () => intervalObs
            ),
            take(50),
            switchMap(
                (id) => getPosts(id)
            ),
            bufferWhen(() => interval(5000)),
            filter((value) => !isEmptyArray(value))
        ).subscribe(getDefaultObserver(clickSub, 'buffer when works: '));
    }

    useBufferToggle() {
        logDebug("useBufferToggle");

        const openings = fromEvent(document, 'click');

        const signaled = interval(1000);

        const bufferToggleSubs = signaled.pipe(
            bufferToggle(openings, i => i ? interval(5000) : EMPTY)
        ).subscribe(
            getDefaultObserver(bufferToggleSubs, 'Buffered TOGGLE works: ', (value) => isArray(value) && console.log('dd', value)),
        );

    }

    useBufferTime() {
        logDebug("useBufferTime");

        const intervalObs = interval(1000);

        const bufferTimeSubs = intervalObs.pipe(
            bufferTime(2000, 5000, 1)
        ).subscribe(getDefaultObserver(bufferTimeSubs, 'BufferTime works'));
    }

    useBufferCount() {
        logDebug('UseBufferCount start');

        const clicks = fromEvent(document, 'click');

        const intervalEvents = interval(1000);

        const bufferCountSubs = intervalEvents.pipe(bufferCount(1)).subscribe(getDefaultObserver(bufferCountSubs, 'Buffer: '));
    }

    useBuffer() {
        logDebug('UseBuffer start');

        const clicks = fromEvent(document, 'click');

        const intervalEvents = interval(5000);

        //const bufferSubs = clicks.pipe(buffer(intervalEvents)).subscribe(getDefaultObserver(bufferSubs, 'Buffer: '));
    }

    usePartition(observable, predicateFunc) {
        return this.rxService.partition(observable, predicateFunc);
    }

    useMerge(...args) {
        return this.rxService.merge(...args);
    }

    useConcat(...arg) {
        return this.rxService.concat(...arg);
    }
}

const rxjsComponent = new RxjsComponent();

export default rxjsComponent;