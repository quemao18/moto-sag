import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface DialogDataSagFront {
  sagEIdealMinFront:number;
  sagEIdealMaxFront:number;
  sagDIdealMinFront:number;
  sagDIdealMaxFront:number;
}

export interface DialogDataSagRear {
  sagEIdealMinRear:number;
  sagEIdealMaxRear:number;
  sagDIdealMinRear:number;
  sagDIdealMaxRear:number;
}

@Component({
  selector: 'app-sag',
  templateUrl: './sag.component.html',
  styleUrls: ['./sag.component.css']
})
export class SagComponent implements OnInit {

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

  msgMorePre =  "Aumentar precarga, apretar/cambiar resorte";
  msgLessPre =  "Quitar precarga, aflojar/cambiar resorte";
  msgOkPre = "Precarga correcta";

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

  sagRearForm = new FormGroup({
      
    raFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),

    rbFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),

    rcFormControl : new FormControl('', [
      Validators.pattern("^[0-9]*$"),
    ]),

  });

  sagFrontForm = new FormGroup({
      
    raFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),

    rbFormControl : new FormControl('', [
      Validators.required,
      Validators.pattern("^[0-9]*$"),
    ]),

    rcFormControl : new FormControl('', [
      Validators.pattern("^[0-9]*$"),
    ]),

  });

  constructor(public dialog: MatDialog) {

   }

  ngOnInit(): void {
  }

  matcher = new MyErrorStateMatcher();

  getSagRear(){
    // console.log(this.sagRearForm.get('sagE').invalid)
    const sagE = this.ra.value-this.rb.value;
    const sagD = this.ra.value-this.rc.value
    // this.sagRearForm.get('sagE').setValue(sagE);
    // this.sagRearForm.get('sagD').setValue(sagD);
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

    this.dataSourceRear.sagE = sagE;
    this.dataSourceRear.msgE = this.errorSagERear;
    this.dataSourceRear.sagD = sagD;
    this.dataSourceRear.msgD = this.errorSagDRear;
      
  }

  getSagFront(){
    // console.log(this.sagRearForm.get('sagE').invalid)
    const sagE = this.fa.value-this.fb.value;
    const sagD = this.fa.value-this.fc.value
    // this.sagRearForm.get('sagE').setValue(sagE);
    // this.sagRearForm.get('sagD').setValue(sagD);
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

    this.dataSourceFront.sagE = sagE;
    this.dataSourceFront.msgE = this.errorSagEFront;
    this.dataSourceFront.sagD = sagD;
    this.dataSourceFront.msgD = this.errorSagDFront;
      
  }

  get ra() { return this.sagRearForm.get('raFormControl'); }
  get rb() { return this.sagRearForm.get('rbFormControl'); }
  get rc() { return this.sagRearForm.get('rcFormControl'); }

  get fa() { return this.sagFrontForm.get('raFormControl'); }
  get fb() { return this.sagFrontForm.get('rbFormControl'); }
  get fc() { return this.sagFrontForm.get('rcFormControl'); }

  openDialogSettingSagFront(): void {
    const dialogRef = this.dialog.open(DialogOverviewDialogFront, {
      // width: '400px',
      // data: {name: this.name, animal: this.animal}
      data: {
        sagEIdealMinFront: this.sagEIdealMinFront, 
        sagEIdealMaxFront: this.sagEIdealMaxFront,
        sagDIdealMinFront: this.sagDIdealMinFront,
        sagDIdealMaxFront: this.sagDIdealMaxFront
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
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
      // width: '400px',
      // data: {name: this.name, animal: this.animal}
      data: {
        sagEIdealMinRear: this.sagEIdealMinRear, 
        sagEIdealMaxRear: this.sagEIdealMaxRear,
        sagDIdealMinRear: this.sagDIdealMinRear,
        sagDIdealMaxRear: this.sagDIdealMaxRear
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
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
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
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

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialogFront>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSagFront) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  check(data){
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
  styleUrls: ['./sag.component.css']
})
export class DialogOverviewDialogRear {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDialogRear>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataSagRear) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  check(data){
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
