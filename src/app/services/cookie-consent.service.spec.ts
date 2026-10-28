import { TestBed } from '@angular/core/testing';

import { CookieConsentService } from './cookie-consent.service';

describe('CookieConsentService', () => {
  let service: CookieConsentService;

  beforeEach(() => {
    localStorage.removeItem('cookieConsent.v1');
    delete (window as any).gtag;
    delete (window as any).dataLayer;
    document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').forEach(script => script.remove());

    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieConsentService);
  });

  it('starts without saved consent', () => {
    expect(service.getState()).toBeNull();
  });

  it('persists rejected analytics consent and emits the updated state', () => {
    const states: unknown[] = [];
    service.consent$.subscribe(state => states.push(state));

    service.rejectAll();

    expect(service.getState()?.choices).toEqual({ necessary: true, analytics: false });
    expect(JSON.parse(localStorage.getItem('cookieConsent.v1')!).choices.analytics).toBeFalse();
    expect(states.length).toBe(2);
  });

  it('restores saved consent on service creation', () => {
    service.acceptAll();
    TestBed.resetTestingModule();

    const restoredService = TestBed.configureTestingModule({}).inject(CookieConsentService);

    expect(restoredService.getState()?.choices).toEqual({ necessary: true, analytics: true });
  });
});
