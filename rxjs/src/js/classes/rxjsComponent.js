import rxjsService from "../services/rxjsService";
import {
    buffer,
    bufferCount,
    bufferTime,
    bufferToggle, bufferWhen,
    concatAll, concatMap, defer, delay,
    EMPTY, exhaustAll, exhaustMap, expand, filter, from,
    fromEvent, iif,
    interval,
    map, mergeAll, mergeMap, mergeScan, of, pairwise, switchMap, take,
    tap, throwError,
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

    usePairWise() {
        logDebug('usePairWise start');

        const clicks = fromEvent(document, 'click');

        const pairs = clicks.pipe(pairwise());

        const distance = pairs.pipe(
            map(
                ([first, second]) => {
                    const x0 = first.clientX;
                    const y0 = first.clientY;

                    const x1 = second.clientX;
                    const y1 = second.clientY;

                    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
                }
            )
        );

        const distanceSubs = distance.subscribe(getDefaultObserver(distanceSubs, 'pairwise works'));
    }

    useMergeScan() {
        logDebug('useMergeScan start');

        const clicks = fromEvent(document, "click").pipe(map(() => 1));

        const mergeScanSubs = clicks.pipe(
            mergeScan((acc, x) => of(acc + x), 0),
            exhaustMap((x) => {
                if(x !==0 && !(x % 2)) {
                    console.log('odd');
                    return interval(1000).pipe(map(t => t + x), take(5))
                } else {
                    console.log('even');
                    return interval(1000).pipe(map(t => t * (x + 1)), take(5), delay(1000))
                }
            }),
            mergeMap((x) => ajax.getJSON(config.url + '/' + Number(x ? x : x + 1))),
            mergeScan((acc, post) => of([...acc, post]), [])
        ).subscribe(getDefaultObserver(mergeScanSubs, '', (value) => console.log('posts: ', JSON.parse(JSON.stringify(value)))));
    }

    useExpand() {
        logDebug('useExpand start');

        const clicks = fromEvent(document, 'click').pipe(
            tap(() => console.log('New Click!')),
            map(
                (x) => 1
            ),
            expand(
                (x) => of(2 * x).pipe(delay(1000))
            ),
            take(10)
        );

        const clicksSub = clicks.subscribe(getDefaultObserver(clicksSub, 'concatMap works!'))
    }

    useExhaustMap() {
        logDebug('useExhaustMap start');

        const clicks = fromEvent(document, 'click').pipe(
            tap(() => console.log('New Click!')),
            exhaustMap(
                (x) => interval(100).pipe(take(5))
            ),
            map(
                (x) => ajax.getJSON(config.url + '/' + Number(x + 1))
            )
        );

        const clicksSub = clicks.pipe(
            concatAll()
        ).subscribe(getDefaultObserver(clicksSub, 'exhaustMap works!'))
    }

    useConcatMap() {
        logDebug('useConcatMap start');

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
        logDebug('useBufferWhen start');

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