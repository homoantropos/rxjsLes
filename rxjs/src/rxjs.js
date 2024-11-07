import "./rxjs.scss";
import rxjsComponent from "./js/classes/rxjsComponent";
// import { concatAll, interval, map, mergeMap, of, take } from "rxjs";
// import { isSubscription } from "./js/utils/isSomething";
// import reduxStore from "./js/services/reduxStore.js";
//import plainJSLessons from "./js/classes/plainJSLessons";

// import fetchLesson from "./js/classes/fetchLesson";


rxjsComponent.moveImageWhileClicks();

// class ParentClass {
// 	constructor() {
// 		this.commonProp = 'parent'
// 	}
//
// 	logCommonProp() {
// 		console.log(this.commonProp);
// 	}
// }
//
// class ChildComponent extends ParentClass {
// 	constructor() {
// 		super();
//
// 		this.commonProp
// 	}
// }
//
// const childComponent = new ChildComponent();
//
// const parentComponent = new ParentClass();
//
// childComponent.logCommonProp();
//
// parentComponent.logCommonProp();
//
// delete childComponent.commonProp;
//
// ParentClass.prototype.commonProp = 'childParent';
//
// childComponent.logCommonProp();
//
// console.log(childComponent.commonProp);
//
// console.log('commonProp' in childComponent);
//
// const parentObject = {
// 	commonProp: 'parent'
// }
//
// parentObject.logCommonProp = function() {
// 	console.log('object: ', this.commonProp);
// }
//
// const childObject = Object.create(parentObject);
//
// childObject.commonProp = 'child';
//
// parentObject.logCommonProp();
//
// childObject.logCommonProp();
//
// delete childObject.commonProp;
//
// childObject.logCommonProp();
//
// console.log(childObject.commonProp);
//
// console.log('commonProp' in childObject);
//
// console.log(Object.hasOwnProperty.call(childObject, 'commonProp'));
// const arrayLess = plainJSLessons;
//
// arrayLess.checkLoopsTime();

//reduxStore.showStore();

//rxjsComponent.useMaterialize();

//rxjsComponent.useShare();

//rxjsComponent.useCombineLatestAll();

//rxjsComponent.useConcatAll();

//rxjsComponent.useThrottle();

//rxjsComponent.useSkipUntil();

//rxjsComponent.useSample();

//rxjsComponent.useDistinctUntilChange();

//rxjsComponent.useDistinct();

//rxjsComponent.useDebounceTime();

//rxjsComponent.useDebounce();

//rxjsComponent.useAuditTime();

//rxjsComponent.useAudit();

//rxjsComponent.useWindowToggle();

//rxjsComponent.useWindowTime();

//rxjsComponent.useWindowCount();

//rxjsComponent.useWindow();

//rxjsComponent.useSwitchScan();

//rxjsComponent.useScan();

// const div = document.createElement('div');
// document.body.appendChild(div);
// div.style.position = 'absolute';
// div.style.width = '40px';
// div.style.height = '40px';
// div.style.backgroundColor = 'lime';
// div.style.transform = 'translate3d(10px, 0, 0)';
//
// rxjsComponent.tween(0, document.body.clientWidth - div.clientWidth, 4000).subscribe(x => {
//     div.style.transform = `translate3d(${ x }px, 0, 0)`;
// });

//rxjsComponent.usePairWise();

//rxjsComponent.useMergeScan();

//rxjsComponent.useExpand();

//rxjsComponent.useExhaustMap();

//rxjsComponent.useConcatMap();

//rxjsComponent.useExpand();

//rxjsComponent.useExhaust();

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
