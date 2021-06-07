import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-online-meet',
  templateUrl: './online-meet.component.html',
  styleUrls: ['./online-meet.component.scss']
})
export class OnlineMeetComponent implements OnInit {
  public form: FormGroup;
  public submitted:boolean = false;
  public todaysdate: Date = new Date();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      clubName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      dateOfMeet: ['', Validators.required],
      duration: ['', Validators.required],
      memberCount: ['', Validators.required],
      emailCount: ['', Validators.required],
      socialMediaMessageCount: ['', Validators.required]
    }
    );

    const phoneInputField = document.querySelector("#phone");
    const phoneInput = (<any>window).intlTelInput(phoneInputField, {
      preferredCountries: ["in"],
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });
  }

  get f() { return this.form.controls; }

  submit() {
    this.submitted = true;
    if(!this.form.invalid){
      window.alert("Submitted Successfully");
    }    
  }

}
