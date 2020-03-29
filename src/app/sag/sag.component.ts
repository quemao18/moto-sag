import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  constructor() {

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

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
