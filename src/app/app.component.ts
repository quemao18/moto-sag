import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { VersionCheckService } from './services/version-check.service';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {

  constructor(
    private metaService: Meta, 
    private router: Router, 
    private versionCheckService: VersionCheckService,
    private analytics: AngularFireAnalytics,
  ){
    this.analytics.logEvent('app_open', {"component": "AppComponent"});
  }

  ngOnInit(){
    this.metaService.addTags([
      {name: 'keywords', content: 'Moto, Motocross, Suspensión, SAG, Enduro, KTM, YAMAHA, SUZUKI, KAWASAKI, GASGAS, GAS GAS, HONDA, HUSQVARNA, SHERCO, BETA'},
      {name: 'description', content: 'Cálculo para el SAG de una moto de Enduro/Motocross'},
      {name: 'robots', content: 'index, follow'},
      {name: 'author', content: 'Alejandro Toba'},

    ]);

    //scroll to top
    this.router.events.subscribe((event) => {
      window.scroll(0,0);
    });

    this.versionCheckService.initVersionCheck(environment.versionCheckURL);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/