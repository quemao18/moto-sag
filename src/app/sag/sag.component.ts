import { Component, OnInit, inject, } from '@angular/core';
import { UntypedFormControl, Validators, FormGroupDirective, NgForm, UntypedFormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavComponent } from '../nav/nav.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';

export interface DialogDataSagFront {
  sagEIdealMinFront: number | null;
  sagEIdealMaxFront: number | null;
  sagDIdealMinFront: number | null;
  sagDIdealMaxFront: number | null;
  dark: boolean;
}

export interface DialogDataSagRear {
  sagEIdealMinRear:number | null;
  sagEIdealMaxRear:number | null;
  sagDIdealMinRear:number | null;
  sagDIdealMaxRear:number | null;
  dark: boolean;
}

@Component({
  selector: 'app-sag',
  templateUrl: './sag.component.html',
  styleUrls: ['./sag.component.css'],
  animations: [
    trigger('animate', [
      state('*', style({
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0,
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out'),
      ])
    ]),
    trigger('flip', [
      transition('void => *', [
        style({opacity: 0,
          transform: 'rotateY(180deg)',
        }),
        animate('0.3s 0s ease-out'),
      ])
    ])  
  ],
})
export class SagComponent implements OnInit {

  mobileQuery: MediaQueryList;

  type:string;
  sagEIdealMinRear = 30;
  sagEIdealMaxRear = 40;
  sagDIdealMinRear = 100;
  sagDIdealMaxRear = 110;
  errorSagERear:string;
  errorSagDRear:string;
  sagEIdealMinFront = 30;
  sagEIdealMaxFront = 40;
  sagDIdealMinFront = 60;
  sagDIdealMaxFront = 70;
  errorSagEFront:string;
  errorSagDFront:string;

  msgMorePre =  "SAG.MORE_PRE";
  msgLessPre =  "SAG.LESS_PRE";
  msgOkPre = "SAG.OK_PRE";

  dataSourceFront: any = {
    sagE:'',
    sagD:'',
    msgE:'',
    msgD:'',
    errorD:true,
    errorE:true,
  };
  dataSourceRear: any = {
    sagE:'',
    sagD:'',
    msgE:'',
    msgD:'',
    errorE:true,
    errorD:true,
  };

  sagRearForm = new UntypedFormGroup({
      
    raFormControl : new UntypedFormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),

    rbFormControl : new UntypedFormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),

    rcFormControl : new UntypedFormControl('', [
      Validators.pattern("^[0-9]*$"),
    ]),

  });

  sagFrontForm = new UntypedFormGroup({
      
    raFormControl : new UntypedFormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),

    rbFormControl : new UntypedFormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),

    rcFormControl : new UntypedFormControl('', [
      Validators.pattern("^[0-9]*$"),
    ]),

  });

  constructor(
      public routes: Router,
      public overlayContainer: OverlayContainer,
      public nav:NavComponent,
      public dialog: MatDialog, 
      private route: ActivatedRoute, 
      media: MediaMatcher,
      private analytics: AngularFireAnalytics,
    ) {
      this.analytics.logEvent(this.type === 'rear' ? 'sag_open_rear': 'sag_open_front', {"component": "SagComponent"});
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
   }

   scrollToBottom(): void {
    const element = document.getElementById('yourElementId');
    element!.scrollTop = element!.scrollHeight;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type') || 'front';
    });
  }

  matcher = new MyErrorStateMatcher();

  getSagRear(){
    const sagE = this.ra-this.rb;
    const sagD = this.ra-this.rc

    if(sagE<this.sagEIdealMinRear){
      this.errorSagERear = this.msgLessPre;
      this.dataSourceRear.errorE = true;
    }
    if(sagE<=this.sagEIdealMaxRear && sagE>=this.sagEIdealMinRear){
      this.errorSagERear = this.msgOkPre;
      this.dataSourceRear.errorE = false;
    }
    if(sagE>this.sagEIdealMaxRear){
      this.errorSagERear = this.msgMorePre;
      this.dataSourceRear.errorE = true;
    }
    
    if(sagD<this.sagDIdealMinRear){
      this.errorSagDRear = this.msgLessPre;
      this.dataSourceRear.errorD = true;
    }
    if(sagD<=this.sagDIdealMaxRear && sagD>=this.sagDIdealMinRear){
      this.errorSagDRear = this.msgOkPre;
      this.dataSourceRear.errorD = false;
    }
    if(sagD>this.sagDIdealMaxRear){
      this.errorSagDRear = this.msgMorePre;
      this.dataSourceRear.errorD = true;
    }

    this.dataSourceRear.sagE = sagE == 0 ? "0": sagE;
    this.dataSourceRear.msgE = this.errorSagERear;
    this.dataSourceRear.sagD = sagD;
    this.dataSourceRear.msgD = this.errorSagDRear;
    this.scrollToBottom()
  }

  getSagFront(){
    const sagE = this.fa-this.fb;
    const sagD = this.fa-this.fc;

    if(sagE<this.sagEIdealMinFront){
      this.errorSagEFront = this.msgLessPre;
      this.dataSourceFront.errorE = true;
    }
    if(sagE<=this.sagEIdealMaxFront && sagE>=this.sagEIdealMinFront){
      this.errorSagEFront = this.msgOkPre;
      this.dataSourceFront.errorE = false;
    }
    if(sagE>this.sagEIdealMaxFront){
      this.errorSagEFront = this.msgMorePre;
      this.dataSourceFront.errorE = true;
    }
    
    if(sagD<this.sagDIdealMinFront){
      this.errorSagDFront = this.msgLessPre;
      this.dataSourceFront.errorD = true;
    }
    if(sagD<=this.sagDIdealMaxFront && sagD>=this.sagDIdealMinFront){
      this.errorSagDFront = this.msgOkPre;
      this.dataSourceFront.errorD = false;
    }
    if(sagD>this.sagDIdealMaxFront){
      this.errorSagDFront = this.msgMorePre;
      this.dataSourceFront.errorD = true;
    }
    
    this.dataSourceFront.sagE = sagE == 0 ? "0": sagE;
    this.dataSourceFront.msgE = this.errorSagEFront;
    this.dataSourceFront.sagD = sagD;
    this.dataSourceFront.msgD = this.errorSagDFront;
    this.scrollToBottom();
  }
  
  get ra() { return this.sagRearForm.get('raFormControl')?.value || 0; }
  get rb() { return this.sagRearForm.get('rbFormControl')?.value || 0; }
  get rc() { return this.sagRearForm.get('rcFormControl')?.value || 0; }

  get fa() { return this.sagFrontForm.get('raFormControl')?.value || 0; }
  get fb() { return this.sagFrontForm.get('rbFormControl')?.value || 0; }
  get fc() { return this.sagFrontForm.get('rcFormControl')?.value || 0; }

  openDialogSettingSagFront(): void { 
    const dialogRef = this.dialog.open(DialogOverviewDialogFront, {
      panelClass: this.nav.dark ? 'dark': 'default',
      data: {
        dark : this.nav.dark,
        sagEIdealMinFront: this.sagEIdealMinFront, 
        sagEIdealMaxFront: this.sagEIdealMaxFront,
        sagDIdealMinFront: this.sagDIdealMinFront,
        sagDIdealMaxFront: this.sagDIdealMaxFront
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined) return;
      this.sagEIdealMinFront = result.sagEIdealMinFront;
      this.sagEIdealMaxFront = result.sagEIdealMaxFront;
      this.sagDIdealMinFront = result.sagDIdealMinFront;
      this.sagDIdealMaxFront = result.sagDIdealMaxFront;
      if(this.sagFrontForm.valid)
        this.getSagFront();
    });
  }

  openDialogSettingSagRear(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogRear, {
      panelClass: this.nav.dark ? 'dark': 'default',
      data: {
        dark : this.nav.dark,
        sagEIdealMinRear: this.sagEIdealMinRear, 
        sagEIdealMaxRear: this.sagEIdealMaxRear,
        sagDIdealMinRear: this.sagDIdealMinRear,
        sagDIdealMaxRear: this.sagDIdealMaxRear
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == undefined) return;
      
      this.sagEIdealMinRear = result.sagEIdealMinRear;
      this.sagEIdealMaxRear = result.sagEIdealMaxRear;
      this.sagDIdealMinRear = result.sagDIdealMinRear;
      this.sagDIdealMaxRear = result.sagDIdealMaxRear;
      if(this.sagRearForm.valid)
        this.getSagRear();
    });
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-sag-setting-front.html',
  styleUrls: ['./sag.component.css']
})
export class DialogOverviewDialogFront {

  readonly dialogRef = inject(MatDialogRef<DialogDataSagFront>);
  readonly data = inject<DialogDataSagFront>(MAT_DIALOG_DATA);

  constructor(
    private analytics: AngularFireAnalytics,
    ) {
      this.analytics.logEvent('sag_config_front_open', {"component": "DialogOverviewDialogFront"});
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  check(data: DialogDataSagFront): boolean {
    if( 
    data.sagEIdealMinFront == null ||
    data.sagEIdealMaxFront == null ||
    data.sagDIdealMinFront == null ||
    data.sagDIdealMaxFront == null
    )
     return true;
    return false;
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-sag-setting-rear.html',
  styleUrls: ['./sag.component.css'],
})
export class DialogOverviewDialogRear {

  readonly dialogRef = inject(MatDialogRef<DialogDataSagRear>);
  readonly data = inject<DialogDataSagRear>(MAT_DIALOG_DATA);

  constructor(
    private analytics: AngularFireAnalytics,
    ) {
      this.analytics.logEvent('sag_config_rear_open', {"component": "DialogOverviewDialogRear"});
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  check(data: DialogDataSagRear): boolean {
    if( 
    data.sagEIdealMinRear == null ||
    data.sagEIdealMaxRear == null ||
    data.sagDIdealMinRear == null ||
    data.sagDIdealMaxRear == null
    )
     return true;
    return false;
  }

}
