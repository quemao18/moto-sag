import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieConsentService } from '../services/cookie-consent.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
	selector: 'app-cookie-consent-banner',
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatCardModule, TranslateModule, FormsModule],
	styleUrls: ['./cookie-consent-banner.component.css'],
	template: `
		<div class="cc-root" *ngIf="visible()">
			<mat-card class="cc-surface mat-elevation-z8" *ngIf="!collapsed()" role="dialog" aria-modal="true" aria-labelledby="cc-title" aria-describedby="cc-desc">
				<div class="cc-header">
					<h3 id="cc-title" class="cc-title">{{ 'COOKIE.TITLE' | translate }}</h3>
					<p id="cc-desc" class="cc-desc">{{ 'COOKIE.TEXT' | translate }}</p>
				</div>
				<div class="cc-actions" [attr.aria-label]="( 'COOKIE.TITLE' | translate ) + ' actions'">
					<button mat-flat-button color="primary" (click)="acceptAll()" class="cc-btn-primary">{{ 'COOKIE.ACCEPT_ALL' | translate }}</button>
					<button mat-button color="primary" (click)="rejectAll()" class="cc-btn-tertiary">{{ 'COOKIE.REJECT_ALL' | translate }}</button>
				</div>
			</mat-card>
		</div>
		`
})
export class CookieConsentBannerComponent {
	private consentService = inject(CookieConsentService);
	analyticsChoice = true;
	visible = signal<boolean>(true);
	collapsed = signal<boolean>(false);

	constructor() {
		this.consentService.consent$.subscribe(state => {
			if (state) this.visible.set(false);
		});

		this.consentService.reopen$.subscribe(() => {
			this.visible.set(true);
			this.collapsed.set(false);
		});
	}

	acceptAll() { this.consentService.acceptAll(); }
	rejectAll() { this.consentService.rejectAll(); }

	noop(_e: any) { }
	// No collapse mode in simplified version
}
