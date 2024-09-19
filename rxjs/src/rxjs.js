import './rxjs.scss';
import rxjsComponent from "./js/classes/rxjsComponent";
import {concatAll, interval, map, mergeMap, of, take} from "rxjs";
import { isSubscription } from "./js/utils/isSomething";

rxjsComponent.usePairWise();

//rxjsComponent.useMergeScan();

//rxjsComponent.useExpand();

//rxjsComponent.useExhaustMap();

//rxjsComponent.useConcatMap();

//rxjsComponent.useBufferWhen();

//rxjsComponent.useBufferToggle();

//rxjsComponent.useBufferTime();

//rxjsComponent.useBufferCount();

//rxjsComponent.useBuffer();

// const interval1 = interval(500).pipe(
//     take(10)
// );
//
// const interval2 = interval(1000).pipe(
//     take(3),
//     map(
//         (numberValue) => `i_2_${numberValue}`
//     )
// );
//
// const interval3 = interval(1500).pipe(
//     take(2),
//     map(
//         (numberValue) => `i_3_${numberValue}`
//     )
// );
//
// const [$even, $odds] = rxjsComponent.usePartition(interval1, x => x % 2 === 0);

// const evensSubs =   $even.subscribe(getDefaultObserver(evensSubs, 'even'));
//
// const oddsSubs =   $odds.subscribe(getDefaultObserver(oddsSubs, 'odd'));

//const concatSubs = rxjsComponent.useMerge($even, $odds, 1).subscribe(getDefaultObserver(concatSubs, 'concatenated'));

// const mergeSubs = rxjsComponent.useMerge(interval1, interval2, interval3).subscribe({
//     next: (value) => console.log(value),
//     error: (err) => {
//         console.error('Error: ', err);
//         mergeSubs.unsubscribe();
//     },
//     complete: () => {
//         console.info('COMPLETED!');
//         mergeSubs.unsubscribe();
//     }
// })