import rxjsService from "../services/rxjsService";

import {
  animationFrames,
  audit,
  auditTime,
  buffer,
  bufferCount,
  bufferTime,
  bufferToggle,
  bufferWhen,
  catchError,
  combineLatest,
  combineLatestAll,
  concat,
  concatAll,
  concatMap,
  debounce,
  debounceTime,
  defer,
  delay,
  dematerialize,
  distinct,
  distinctUntilChanged,
  elementAt,
  EMPTY,
  endWith,
  exhaustAll,
  exhaustMap,
  expand,
  filter,
  first,
  forkJoin,
  from,
  fromEvent,
  ignoreElements,
  iif,
  interval,
  last,
  map,
  materialize,
  mergeAll,
  mergeMap,
  mergeScan,
  of,
  pairwise,
  race,
  range,
  retry,
  sample,
  scan,
  share,
  skip,
  skipLast,
  skipUntil,
  Subject,
  switchAll,
  switchMap,
  switchScan,
  take,
  takeLast,
  takeUntil,
  takeWhile,
  tap,
  throttle,
  throwError,
  timer,
  window,
  windowCount,
  windowTime,
  windowToggle,
  windowWhen,
} from "rxjs";
import { getDefaultObserver } from "../utils/getDefaultObserver";
import { logDebug } from "../utils/debugLogger";
import { isArray, isEmptyArray } from "../utils/isSomething";
import config from "../config/config";
import { ajax } from "rxjs/internal/ajax/ajax";
import { getNoZeroId } from "../utils/utils";
import { domQueries } from "../config/domQueries";

class RxjsComponent {
  rxService;

  lessonInput;

  submitButton;

  emitterSubject = new Subject();

  constructor() {
    this.initComponent();
  }

  initComponent() {
    this.bindListeners();

    if (rxjsService) {
      this.rxService = rxjsService;
    }

    this.lessonInput = document.querySelector(domQueries.input);

    this.submitButton = document.querySelector(domQueries.submitButton);

    if (this.submitButton) {
      this.submitButton.addEventListener("click", this.emitSubjectNext, {
        passive: true,
      });
    }
  }

  notificationsLog = [];

  useMaterialize() {
    logDebug("useMaterialize start");

    const producerSource = concat(
      throwError(() => new Error("Just silly error")).pipe(
        catchError((error) => of(error)),
      ),
      of("a", "b", "c", 11, "d").pipe(map((value) => value.toUpperCase())),
      EMPTY,
    );

    const materializeSub = producerSource
      .pipe(
        catchError((error) => of(error)),
        materialize(),
        tap((notification) => this.notificationsLog.push(notification)),
        dematerialize(),
      )
      .subscribe(
        getDefaultObserver(
          materializeSub,
          "materialize works",
          (value) => {
            console.log("value: ", value);

            console.log("notificationsLog: ", this.notificationsLog);
          },
          (error) => console.log("err: ", error),
        ),
      );
  }

  useShare() {
    logDebug("useShare start");

    const source = interval(1000).pipe(
      tap(() => console.log("subscription started")),
      take(3),
      share({
        resetOnRefCountZero: timer(1000),
      }),
    );

    const subs1 = source.subscribe(getDefaultObserver(subs1, "subs 1: "));

    setTimeout(() => subs1.unsubscribe(), 1300);

    setTimeout(() => {
      const subs2 = source.subscribe(getDefaultObserver(subs2, "subs 2: "));
    }, 1700);

    setTimeout(() => {
      const subs3 = source.subscribe(getDefaultObserver(subs3, "subs 3: "));
    }, 5000);
  }

  useCombineLatestAll() {
    logDebug("useCombineLatestAll start");

    const numbers1 = range(1, 10).pipe(
      concatMap((value) => timer(2000).pipe(map(() => value))),
    );

    const numbers2 = range(11, 10).pipe(
      concatMap((value) => timer(1500).pipe(map(() => value))),
    );

    const numbers3 = range(21, 10).pipe(
      concatMap((value) => timer(3500).pipe(map(() => value))),
    );

    const clicks = fromEvent(document, "click").pipe(map(() => "click 1!"));

    const subs1 = of([clicks, numbers1, numbers2, numbers3])
      .pipe(combineLatestAll())
      .subscribe(getDefaultObserver(subs1, "working"));
  }

  useConcatAll() {
    logDebug("useConcatAll start");

    const mainSubs = interval(1000).pipe(takeUntil(this.emitterSubject));

    const concatAllSub = mainSubs
      .pipe(
        map((x) => of(x)),
        concatAll(),
      )
      .subscribe(getDefaultObserver(concatAllSub, "concatMap works!"));

    mainSubs.pipe().subscribe({
      next: (x) => console.log("econd: ", x),
      complete: () => console.log("complete second"),
    });
  }

  useThrottle() {
    logDebug("useThrottle start");

    const intervalEmitter = interval(1000).pipe(take(20));

    const intervalSub = intervalEmitter
      .pipe(throttle(() => this.emitterSubject.asObservable()))
      .subscribe(getDefaultObserver(intervalSub, "useSkipUntil works"));
  }

  useSkipUntil() {
    logDebug("useSkipUntil start");

    const intervalEmitter = interval(1000).pipe(take(10));

    const intervalSub = intervalEmitter
      .pipe(takeLast(2))
      .subscribe(getDefaultObserver(intervalSub, "useSkipUntil works"));
  }

  useSample() {
    logDebug("useSample start");

    if (this.lessonInput) {
      const listenInput = fromEvent(this.lessonInput, "input").pipe(
        map((inputEvent) => inputEvent.target.value),
      );

      const sampleSub = listenInput
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          filter((value) => value.includes("a")),
          //sample(this.emitterSubject.asObservable()),
          skipLast(),
        )
        .subscribe(getDefaultObserver(sampleSub, "sample works: "));
    }
  }

  useDistinctUntilKeyChanged() {}

  useDistinctUntilChange() {
    logDebug("useDistinctUntilChange start");

    if (this.lessonInput) {
      const listenInput = fromEvent(this.lessonInput, "input").pipe(
        map((inputEvent) => inputEvent.target.value),
      );

      const debounceSub = listenInput
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          filter((value) => value.includes("a")),
        )
        .subscribe(
          getDefaultObserver(debounceSub, "distinctUntilChange works: "),
        );
    }
  }

  useDistinct() {
    logDebug("useDistinct start");

    if (this.lessonInput) {
      const listenInput = fromEvent(this.lessonInput, "input").pipe(
        map((inputEvent) => inputEvent.target.value),
      );

      const debounceSub = listenInput
        .pipe(debounceTime(300), distinct())
        .subscribe(getDefaultObserver(debounceSub, "distinct works: "));
    }
  }

  useDebounceTime() {
    logDebug("useDebounceTime start");

    if (this.lessonInput) {
      const listenInput = fromEvent(this.lessonInput, "input").pipe(
        map((inputEvent) => inputEvent.target.value),
      );

      const debounceSub = listenInput
        .pipe(debounceTime(500))
        .subscribe(getDefaultObserver(debounceSub, "debounceTime works: "));
    }
  }

  useDebounce() {
    logDebug("useDebounce start");

    if (this.lessonInput) {
      const listenInput = fromEvent(this.lessonInput, "input").pipe(
        map((inputEvent) => inputEvent.target.value),
      );

      const debounceSub = listenInput
        .pipe(debounce(() => interval(1000)))
        .subscribe(getDefaultObserver(debounceSub, "debounce works: "));
    }
  }

  useAuditTime() {
    logDebug("useAuditTime start");

    const mouseMove = fromEvent(document, "mousemove").pipe(
      map((museMove) => ({ x: museMove.clientX, y: museMove.clientY })),
    );

    const auditSubs = mouseMove
      .pipe(auditTime(5000))
      .subscribe(getDefaultObserver(auditSubs, "audit works: "));
  }

  useAudit() {
    logDebug("useAudit start");

    const mouseMove = fromEvent(document, "mousemove").pipe(
      map((museMove) => ({ x: museMove.clientX, y: museMove.clientY })),
    );

    const auditSubs = mouseMove
      .pipe(audit(() => interval(5000).pipe(take(20))))
      .subscribe(getDefaultObserver(auditSubs, "audit works: "));
  }

  useWindowToggle() {
    logDebug("useWindow start");

    const opening = fromEvent(document, "click");

    const sec1 = interval(1000).pipe(take(50));

    const close = interval(5000).pipe(take(50));

    const windowToggleSub = sec1
      .pipe(
        windowToggle(opening, () => close),
        mergeAll(),
      )
      .subscribe(getDefaultObserver(windowToggleSub, "window toggle works"));
  }

  useWindowTime() {
    logDebug("useWindow start");

    const clicks = fromEvent(document, "click").pipe(
      map(() => 1),
      mergeScan((acc, curr) => of(acc + curr), 0),
    );

    const sec1 = interval(1000).pipe(
      take(10),
      map((x) => x + 1),
    );

    const sec2 = interval(500).pipe(
      take(10),
      map((x) => x + 1),
    );

    const getPost = (id) => ajax.getJSON(config.url + "/" + getNoZeroId(id));

    const winTimerSubs = clicks
      .pipe(
        switchMap((x) => (x % 2 ? sec1 : sec2)),
        concatMap((x) => getPost(x)),
        windowTime(2000, 5000),
        mergeAll(),
      )
      .subscribe(getDefaultObserver(winTimerSubs, "winTimer works"));
  }

  useWindowCount() {
    logDebug("useWindow start");

    const clicks = fromEvent(document, "click");

    const sec1 = interval(1000).pipe(take(10));

    const sec2 = interval(500).pipe(take(10));

    const getPosts = (id) => ajax.getJSON(config.url + "/" + Number(id + 1));

    const winCountSub = clicks
      .pipe(
        map(() => 1),
        mergeScan((acc, curr) => of(acc + curr), 0),
        mergeMap((v) => (v % 2 ? sec1 : sec2)),
        concatMap((x) => getPosts(x)),
        windowCount(2, 4),
        concatAll(),
      )
      .subscribe(getDefaultObserver(winCountSub, "winCount works"));
  }

  useWindow() {
    logDebug("useWindow start");

    const clicks = fromEvent(document, "click");

    const sec1 = interval(1000).pipe(map((v) => "sec1: " + " " + v));

    const sec2 = interval(5000).pipe(
      tap(() => console.log("sec 2 emitted!")),
      map((v) => "sec2: " + " " + v),
    );

    const winSubs = sec1
      .pipe(
        window(sec2),
        //map(win => win.pipe(take(2))),
        //switchAll(),
        take(100),
      )
      .subscribe(getDefaultObserver(winSubs, "window works!"));
  }

  useSwitchScan() {
    logDebug("useSwitchScan start");

    let getFirst = true;

    const interval1 = interval(1000).pipe(take(10));

    const interval2 = interval(1000).pipe(take(10));

    const getIIF = iif(
      () => getFirst,
      interval(1000).pipe(take(10)),
      interval(1000).pipe(take(10)),
    );

    const clicks = fromEvent(document, "click").pipe(
      mergeScan((acc, current) => of(acc + current), 0),
    );

    const def = defer(clicks);
    const scanSubs = clicks
      .pipe(mergeMap((v) => of(v)))
      .subscribe(getDefaultObserver(scanSubs, "scan works"));
  }

  useScan() {
    logDebug("useScan start");

    const int = interval(1000).pipe(take(20));

    const scanSubs = int
      .pipe(scan((acc, curr) => acc + curr, 0))
      .subscribe(getDefaultObserver(scanSubs, "scan works"));
  }

  tween(start, end, duration) {
    const diff = end - start;
    return animationFrames().pipe(
      map(({ elapsed }) => elapsed / duration),
      takeWhile((v) => v < 1),
      endWith(1),
      map((v) => v * diff + start),
    );
  }

  usePairWise() {
    logDebug("usePairWise start");

    const clicks = fromEvent(document, "click");

    const pairs = clicks.pipe(pairwise());

    const distance = pairs.pipe(
      map(([first, second]) => {
        const x0 = first.clientX;
        const y0 = first.clientY;

        const x1 = second.clientX;
        const y1 = second.clientY;

        return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
      }),
    );

    const distanceSubs = distance.subscribe(
      getDefaultObserver(distanceSubs, "pairwise works"),
    );
  }

  useMergeScan() {
    logDebug("useMergeScan start");

    const clicks = fromEvent(document, "click").pipe(map(() => 1));

    const mergeScanSubs = clicks
      .pipe(
        mergeScan((acc, x) => of(acc + x), 0),
        exhaustMap((x) => {
          if (x !== 0 && !(x % 2)) {
            console.log("odd");
            return interval(1000).pipe(
              map((t) => t + x),
              take(5),
            );
          } else {
            console.log("even");
            return interval(1000).pipe(
              map((t) => t * (x + 1)),
              take(5),
              delay(1000),
            );
          }
        }),
        mergeMap((x) => ajax.getJSON(config.url + "/" + Number(x ? x : x + 1))),
        mergeScan((acc, post) => of([...acc, post]), []),
      )
      .subscribe(
        getDefaultObserver(mergeScanSubs, "", (value) =>
          console.log("posts: ", JSON.parse(JSON.stringify(value))),
        ),
      );
  }

  useExpand() {
    logDebug("useExpand start");

    const clicks = fromEvent(document, "click").pipe(
      tap(() => console.log("New Click!")),
      map((x) => 1),
      expand((x) => of(2 * x).pipe(delay(1000))),
      take(10),
    );

    const clicksSub = clicks.subscribe(
      getDefaultObserver(clicksSub, "concatMap works!"),
    );
  }

  useExhaustMap() {
    logDebug("useExhaustMap start");

    const clicks = fromEvent(document, "click").pipe(
      tap(() => console.log("New Click!")),
      exhaustMap((x) => interval(100).pipe(take(5))),
      map((x) => ajax.getJSON(config.url + "/" + Number(x + 1))),
    );

    const clicksSub = clicks
      .pipe(concatAll())
      .subscribe(getDefaultObserver(clicksSub, "exhaustMap works!"));
  }

  useConcatMap() {
    logDebug("useConcatMap start");

    const startId = 1;

    const clicks = fromEvent(document, "click").pipe(
      tap(() => console.log("New Click!")),
      concatMap((x) => interval(1000).pipe(take(5))),
    );

    const clicksSub = clicks
      .pipe(concatMap((x) => ajax.getJSON(config.url + "/" + Number(x + 1))))
      .subscribe(getDefaultObserver(clicksSub, "concatMap works!"));
  }

  useBufferWhen() {
    logDebug("useBufferWhen start");

    const intervalObs = interval(1000).pipe(tap(() => "intervalObs"));

    const getPosts = (id) => ajax.getJSON(config.url + "/" + Number(id + 1));

    const clicks = fromEvent(document, "click");

    const clickSub = clicks
      .pipe(
        switchMap(() => intervalObs),
        take(50),
        switchMap((id) => getPosts(id)),
        bufferWhen(() => interval(5000)),
        filter((value) => !isEmptyArray(value)),
      )
      .subscribe(getDefaultObserver(clickSub, "buffer when works: "));
  }

  useBufferToggle() {
    logDebug("useBufferToggle");

    const openings = fromEvent(document, "click");

    const signaled = interval(1000);

    const bufferToggleSubs = signaled
      .pipe(bufferToggle(openings, (i) => (i ? interval(5000) : EMPTY)))
      .subscribe(
        getDefaultObserver(
          bufferToggleSubs,
          "Buffered TOGGLE works: ",
          (value) => isArray(value) && console.log("dd", value),
        ),
      );
  }

  useBufferTime() {
    logDebug("useBufferTime");

    const intervalObs = interval(1000);

    const bufferTimeSubs = intervalObs
      .pipe(bufferTime(2000, 5000, 1))
      .subscribe(getDefaultObserver(bufferTimeSubs, "BufferTime works"));
  }

  useBufferCount() {
    logDebug("UseBufferCount start");

    const clicks = fromEvent(document, "click");

    const intervalEvents = interval(1000);

    const bufferCountSubs = intervalEvents
      .pipe(bufferCount(1))
      .subscribe(getDefaultObserver(bufferCountSubs, "Buffer: "));
  }

  useBuffer() {
    logDebug("UseBuffer start");

    const clicks = fromEvent(document, "click");

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

  bindListeners() {
    this.emitSubjectNext = this.emitSubjectNext.bind(this);
  }

  emitSubjectNext() {
    this.emitterSubject.next();
  }
}

const rxjsComponent = new RxjsComponent();

export default rxjsComponent;
