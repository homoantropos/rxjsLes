import { isSubscription } from "./isSomething";

export function getDefaultObserver(subscription, comment, next) {
  return {
    next: (event) =>
      next ? next(event) : console.log(comment || "Here your value: ", event),
    error: (err) => {
      console.error("Error: ", err);
      isSubscription(subscription) && subscription.unsubscribe();
      isSubscription(subscription) && subscription.complete();
    },
    complete: () => {
      console.info("COMPLETED!");
      isSubscription(subscription) && subscription.unsubscribe();
      isSubscription(subscription) && subscription.complete();
    },
  };
}
