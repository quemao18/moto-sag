importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBOCX47p8hRaijxzZtAyBa22mvrB8Dd6Pg',
  authDomain: 'moto-sag.firebaseapp.com',
  projectId: 'moto-sag',
  storageBucket: 'moto-sag.appspot.com',
  messagingSenderId: '635626247891',
  appId: '1:635626247891:web:15ac8120ea3d34c513a626',
  measurementId: 'G-21L4CVZ4DE'
});

const messaging = firebase.messaging();

// Función común para mostrar notificaciones
// async function showNotification(payload) {
// 	const notificationTitle = payload.notification.title;
// 	const notificationOptions = {
// 		body: payload.notification.body,
// 		icon: '/assets/icons/icon-192x192.png',
// 	};

// 	return self.registration.showNotification(notificationTitle, notificationOptions);
// }

// Solo manejar mensajes de background a través de Firebase
// messaging.onBackgroundMessage(async function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   await showNotification(payload);
// });

// self.addEventListener('push', event => {
//   const payload = event.data?.json();
//   const { title, body, icon } = payload?.notification || payload?.data || {};

//   event.waitUntil(
//     self.registration.showNotification(title || 'Título por defecto', {
//       body: body || 'Mensaje por defecto',
//       icon: icon || '/assets/icons/icon-192x192.png'
//     })
//   );
// });