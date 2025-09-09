import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { environment } from './environments/environment';

import { AppModule } from './app/app.module';

if (environment.production) {
  enableProdMode();
}

// Keep NgModule bootstrap while using the recommended platformBrowser API (no deprecation).
platformBrowser().bootstrapModule(AppModule)
  .catch(err => console.error(err));


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/