import {  isSubscription} from "./isSomething";

export function getDefaultObserver(subscription, comment, next, errorHandler, completeHandler) {
    return {
        next: (event) => next ? next(event) : console.log(comment || 'Here your value: ', event),
        error: (err) => {
            errorHandler && errorHandler();
            console.error('Error: ', err);
            completeSubscription(subscription);
        },
        complete: (value) => {
            completeHandler && completeHandler();
            console.info('COMPLETED!: ', value);
            completeSubscription(subscription);
        }
    }
}

export function completeSubscription(subscription) {
    isSubscription(subscription) && subscription.unsubscribe();
    isSubscription(subscription) && subscription.complete();
}