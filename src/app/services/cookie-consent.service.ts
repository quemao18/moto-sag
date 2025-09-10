import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

export interface CookieConsentChoices {
	necessary: true;
	analytics: boolean;
}

export interface CookieConsentState {
	version: string;
	timestamp: number;
	choices: CookieConsentChoices;
}

const CONSENT_VERSION = '1';
const STORAGE_KEY = 'cookieConsent.v1';

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
	private state: CookieConsentState | null = null;
	private subject = new BehaviorSubject<CookieConsentState | null>(null);
	consent$ = this.subject.asObservable();
	private gtagBaseInjected = false;
	private measurementId = environment.firebaseConfig.measurementId;
		private reopenSubject = new Subject<void>();
		reopen$ = this.reopenSubject.asObservable();

	constructor() {
		this.load();
	}

		reopenPreferences() { this.reopenSubject.next(); }

		getState() { return this.state; }

	private load() {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;
			const parsed: CookieConsentState = JSON.parse(raw);
			if (parsed.version !== CONSENT_VERSION) return;
			this.state = parsed;
			this.subject.next(this.state);
			if (this.state.choices.analytics) {
				this.ensureGtagBase();
				this.updateConsentMode(this.state.choices);
			} else {
				this.ensureGtagBase();
				this.updateConsentMode({ ...this.state.choices, analytics: false });
			}
		} catch {
			
		}
	}

	acceptAll() {
		this.save({ necessary: true, analytics: true });
	}

	rejectAll() {
		this.save({ necessary: true, analytics: false });
	}

	savePartial(choices: Omit<CookieConsentChoices, 'necessary'>) {
		this.save({ necessary: true, ...choices });
	}

	private save(choices: CookieConsentChoices) {
		this.state = {
			version: CONSENT_VERSION,
			timestamp: Date.now(),
			choices
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
		this.subject.next(this.state);
		this.ensureGtagBase();
		this.updateConsentMode(choices);
	}

	private ensureGtagBase() {
		if (this.gtagBaseInjected) return;
		// dataLayer + gtag stub + default denied
		(window as any).dataLayer = (window as any).dataLayer || [];
		const gtag = function () { (window as any).dataLayer.push(arguments); } as any;
		(window as any).gtag = gtag;
		gtag('consent', 'default', { analytics_storage: 'denied' });
		const s = document.createElement('script');
		s.async = true;
		s.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
		document.head.appendChild(s);
		this.gtagBaseInjected = true;
	}

	private updateConsentMode(choices: CookieConsentChoices) {
		const gtag = (window as any).gtag || function () { };
		gtag('consent', 'update', { analytics_storage: choices.analytics ? 'granted' : 'denied' });
	}
}
