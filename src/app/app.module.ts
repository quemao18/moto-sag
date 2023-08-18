import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SagComponent, DialogOverviewDialogFront, DialogOverviewDialogRear } from './sag/sag.component';
import { environment } from 'src/environments/environment';

import {ScreenTrackingService, UserTrackingService}
from '@angular/fire/analytics';
import {AngularFireAnalyticsModule} from "@angular/fire/compat/analytics";
import {AngularFireModule} from "@angular/fire/compat";

import { VersionCheckService } from './services/version-check.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sag/:type', component: SagComponent },
  { path: 'privacy', component: PrivacyComponent },
];

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAnalyticsModule,
        BrowserAnimationsModule,
        MaterialModule,
        LayoutModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        SagComponent,
        DialogOverviewDialogFront,
        DialogOverviewDialogRear,
        PrivacyComponent,
    ],
    providers: [
        VersionCheckService,
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
        ScreenTrackingService,
        UserTrackingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/