import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-physical-meet',
  templateUrl: './physical-meet.component.html',
  styleUrls: ['./physical-meet.component.scss']
})
export class PhysicalMeetComponent implements OnInit {

  public form: FormGroup;
  public submitted:boolean = false;
  public todaysdate: Date = new Date();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      clubName: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern('\\+[0-9]{12}')]],
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
      guestTravelMode: ['', Validators.required],
      guestStayPeriod: ['', Validators.required],
      emailCount: ['', Validators.required],
      socialMediaMessageCount: ['', Validators.required]
    }
    );
  }

  get f() { return this.form.controls; }

  submit() {
    this.submitted = true;
    console.log(this.form.value);
    window.alert("Submitted Successfully");
  }

}
