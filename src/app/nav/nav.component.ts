import {ChangeDetectorRef, Component, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  @ViewChild(MatSidenav)
  public snav: MatSidenav;
  public dark: boolean ;
  name: string = "Moto SAG"
  lang: string = "es";
  
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, elementRef: ElementRef, public translate: TranslateService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
    // const hammertime = new Hammer(elementRef.nativeElement, {});
    
        // hammertime.on('panright', (ev) => {
        //     this.snav.open();
        // });
        // hammertime.on('panleft', (ev) => {
        //     this.snav.close();
        // });

        translate.addLangs(['en', 'es', 'it', 'fr']);
        translate.setDefaultLang('en');
        
        const browserLang = translate.getBrowserLang();
        this.lang = browserLang;
        translate.use(browserLang.match(/en|es/) ? browserLang : 'es');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  changeLang(lang){
    this.translate.use(lang);
}


}
