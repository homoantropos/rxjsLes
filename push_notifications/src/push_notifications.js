import './push_notifications.scss';

import firebasePushNotificationsService from "./js/firebase-push-notifications.service";

firebasePushNotificationsService.initService();


window.addEventListener('online', () => {
	console.log('The app is now online.');

	firebasePushNotificationsService.getDeliveredNotifications();
});

