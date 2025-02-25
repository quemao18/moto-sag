import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import Hammer from 'hammerjs/hammer';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    standalone: false
})
export class NavComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  @ViewChild('snav') public snav: MatSidenav;
  public dark: boolean;
  name: string = "Moto SAG";
  lang: string = "es";
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, elementRef: ElementRef, public translate: TranslateService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    
    const hammertime = new Hammer(elementRef.nativeElement);
    hammertime.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });

    hammertime.on('panright', (ev) => {
      this.snav.open();
    });
    hammertime.on('panleft', (ev) => {
      this.snav.close();
    });

    translate.addLangs(['en', 'es', 'it', 'fr']);
    translate.setDefaultLang('en');
    
    const browserLang = translate.getBrowserLang() || 'es';
    this.lang = browserLang;
    translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
  }

  openPayPal(): void {  
    window.open('https://paypal.me/quemao18', '_blank');
  }
}