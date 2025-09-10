import { Component, OnInit } from "@angular/core";
import { Meta } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { VersionCheckService } from "./services/version-check.service";
import { AngularFireAnalytics } from "@angular/fire/compat/analytics";
import { NavComponent } from "./nav/nav.component";
import { CookieConsentBannerComponent } from './cookie-consent-banner/cookie-consent-banner.component';
import { CookieConsentService } from './services/cookie-consent.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  standalone: true,
  imports: [
    NavComponent,
    CookieConsentBannerComponent
  ]
})
export class AppComponent implements OnInit {
  constructor(
    private metaService: Meta,
    private router: Router,
    public versionCheckService: VersionCheckService,
    private analytics: AngularFireAnalytics,
    private cookieConsent: CookieConsentService
  ) {
    this.cookieConsent.consent$.subscribe(state => {
      if (state?.choices.analytics) {
        this.analytics.logEvent("app_open", { component: "AppComponent" });
      }
    });
  }

  ngOnInit() {
    this.metaService.addTags([
      {
        name: "keywords",
        content:
          "Moto, Motocross, Suspensión, SAG, Enduro, KTM, YAMAHA, SUZUKI, KAWASAKI, GASGAS, GAS GAS, HONDA, HUSQVARNA, SHERCO, BETA",
      },
      {
        name: "description",
        content: "Cálculo para el SAG de una moto de Enduro/Motocross",
      },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Alejandro Toba" },
    ]);

    //scroll to top
    this.router.events.subscribe(() => {
      window.scroll(0, 0);
    });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
