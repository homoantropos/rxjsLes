import { PushNotifications } from '@capacitor/push-notifications';

class FirebasePushNotificationsService {
	constructor() {}

	async initService(){
		await this.registerNotifications();
		await this.addListeners();
	}

	async addListeners(){
		await PushNotifications.addListener('registration', token => {
			console.info('Registration token: ', token.value);
		});

		await PushNotifications.addListener('registrationError', err => {
			console.error('Registration error: ', err.error);
		});

		await PushNotifications.addListener('pushNotificationReceived', notification => {
			console.log('Push notification received: ', notification);
		});

		await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
			console.log('Push notification action performed', notification.actionId, notification.inputValue);
		});
	}

	async registerNotifications() {
		let permStatus = await PushNotifications.checkPermissions();

		if (permStatus.receive === 'prompt') {
			permStatus = await PushNotifications.requestPermissions();
		}

		if (permStatus.receive !== 'granted') {
			throw new Error('User denied permissions!');
		}

		await PushNotifications.register();
	}

	async getDeliveredNotifications(){
		const notificationList = await PushNotifications.getDeliveredNotifications();
		console.log('delivered notifications', notificationList);
	}

}

const firebasePushNotificationsService = new FirebasePushNotificationsService();

export default firebasePushNotificationsService;
