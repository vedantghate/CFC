import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-physical-meet',
  templateUrl: './physical-meet.component.html',
  styleUrls: ['./physical-meet.component.scss']
})
export class PhysicalMeetComponent implements OnInit {

  public form: FormGroup;
  public submitted: boolean = false;
  public todaysdate: Date = new Date();

  fileName = 'CFC_Input_Physical';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      clubName: ['', Validators.required],
      email: ['', [Validators.required,Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]],
      mobileNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      dateOfMeet: ['', Validators.required],
      memberCount: ['', Validators.required],
      fourWCount: ['', Validators.required],
      twoWCount: ['', Validators.required],
      duration: ['', Validators.required],
      lightsCount: ['', Validators.required],
      fansCount: ['', Validators.required],
      audioCount: ['', Validators.required],
      micCount: ['', Validators.required],
      projectorCount: ['', Validators.required],
      acCount: ['', Validators.required],
      beverageCount: ['', Validators.required],
      vegBreakfastCount: [''],
      nonvegBreakfastCount: [''],
      vegSnacksCount: [''],
      nonvegSnacksCount: [''],
      vegLunchCount: [''],
      nonvegLunchCount: [''],
      vegDinnerCount: [''],
      nonvegDinnerCount: [''],
      giftCount: ['', Validators.required],
      guestCount: ['', Validators.required],
      guestTravelMode: [''],
      guestStayPeriod: [''],
      emailCount: ['', Validators.required],
      socialMediaMessageCount: ['', Validators.required]
    }
    );

    this.setGuestValidations();

    const phoneInputField = document.querySelector("#phone");
    const phoneInput = (<any>window).intlTelInput(phoneInputField, {
      preferredCountries: ["in"],
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
  }

  get f() { return this.form.controls; }

  setGuestValidations(){
    this.form.get('guestCount')?.valueChanges.subscribe(
      count=>{
        if(count > 0){
          console.log("setting validators");
          this.form.get('guestTravelMode')?.setValidators([Validators.required]);
          this.form.get('guestStayPeriod')?.setValidators([Validators.required]);
          this.form.get('guestTravelMode')?.reset();
          this.form.get('guestStayPeriod')?.reset();
        }else{
          console.log("resetting validators");
          this.form.get('guestTravelMode')?.setValidators(null);
          this.form.get('guestStayPeriod')?.setValidators(null);
          this.form.get('guestTravelMode')?.setValue("None");
          this.form.get('guestStayPeriod')?.setValue(0);
        }
      }
    );
  }


  submit() {
    this.submitted = true;
    if(!this.form.invalid){

      window.alert("Submitted Successfully");
      this.exportAsXLSX();
    }    
  }


  public exportAsXLSX(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([this.form.value]);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const excellFile = `${this.fileName}_${new Date().getTime()}.xlsx`;
    XLSX.writeFile(wb, excellFile);
  }

}
