import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private currentMessage = new BehaviorSubject<any>(null);
  message$ = this.currentMessage.asObservable();

  constructor(private afMessaging: AngularFireMessaging) { }

  async requestPermission(): Promise<void> {
    try {
      if (!('Notification' in window)) {
        console.warn('Este navegador no soporta notificaciones push');
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        console.warn('Permiso de notificaciones denegado');
        return;
      }

      // Registrar el Service Worker manualmente
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registrado:', registration);

        this.requestToken();
      }
    } catch (err) {
      console.error('Error al inicializar las notificaciones:', err);
    }
  }

  private requestToken(): void {
    this.afMessaging.getToken.subscribe({
      next: (token: string | null) => {
        if (token) {
          console.log('Token FCM:', token);
          // Aquí puedes enviar el token a tu backend si lo necesitas
        } else {
          console.warn('No se pudo obtener el token FCM');
        }
      },
      error: (err: Error) => {
        console.error('Error al obtener el token FCM:', err);
      }
    });
  }

}