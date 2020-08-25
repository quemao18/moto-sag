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
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { VersionCheckService } from './services/version-check.service';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [  
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sag/:type', component: SagComponent },
];

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
    HttpClientModule
  ],
  entryComponents: [
    AppComponent,
    HomeComponent,
    NavComponent,
    DialogOverviewDialogFront,
    DialogOverviewDialogRear
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    SagComponent,
    DialogOverviewDialogFront,
    DialogOverviewDialogRear,
  ],
  providers: [
    VersionCheckService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'standard' } },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/