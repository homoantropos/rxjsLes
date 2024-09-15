export function isSubscription(subscription) {
    return !!(subscription && Object.prototype.hasOwnProperty.call(subscription, 'unsubscribe') && typeof subscription.unsubscribe === 'function')
}

export function isArray(arrCandidate) {
    return Array.isArray(arrCandidate);
}

export function isEmptyArray(arrayCandidate) {
    return isArray(arrayCandidate) && (arrayCandidate.length === 0);
}

export function isNullOrUndefined(nullCandidate) {
    return nullCandidate == null;
}